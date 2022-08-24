import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Image, Stack } from 'native-base';
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Images } from '../../constants'
import Menu from '../../components/Menu'
import api from '../../service'
import axios from 'axios';

import Loading from '../../components/Loading';

import {
  Container,
  Body,
  BodyTitle,
  BodyDescription,
  ContainerForgetModalStatus,
  ContainerForgetModalStatusText,
  BtnSend,
  BtnSendText,
  TextTime
} from './style'


const Store = ({ navigation }) => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const results = async () => {
      try {
        const response = await api.post('/users/login', {
          username: 'app',
          password: '56LZmcgKqGMKmv2H',
        });
        setToken(response.data.token);

        const result = await AsyncStorage.getItem('@avalia_image_storage');
        setData(JSON.parse(result));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.message === 'Network Error') {
          Alert.alert(
            'Problemas de conexão',
            'Verifique sua conexão com a internet',
            [{ text: 'OK' }],
          );
          navigation.navigate('auth')
        }
      }
    }
    results()
  }, []);

  const Send = async (index) => {
    const result = data;

    setLoadingButton(true)
    try {
      const response1 = await axios({
        method: 'post',
        url: 'https://avalia-mt-dev-api.educat.net.br/uploads/request',
        headers: {
          Authorization: `JWT ${token}`,
        },
        data: {
          prefix: 'AVALIA/MT',
          type: 'BASE64',
        },
      });

      if (response1.status === 200) {
        const response2 = await axios({
          method: 'post',
          url: `${response1.data.upload_url}`,
          headers: {
            Authorization: `JWT ${token}`,
          },
          data: {
            content: result[index].image,
            content_type: 'image/jpg',
          },
        });

        if (response2.status === 200) {
          const response3 = await axios({
            method: 'post',
            url: `https://avalia-mt-dev-api.educat.net.br/scans`,
            headers: {
              Authorization: `JWT ${token}`,
            },
            data: {
              upload: response1.data.id,
              code: result[index].QRcode,
            },
          });

          if (response3.status === 201) {
            setLoadingButton(false);

            Alert.alert('Sucesso', 'Imagem enviada', [
              { text: 'Ok' },

            ]);

            result.splice(index, 1)
            await AsyncStorage.setItem('@avalia_image_storage', JSON.stringify(result));

            const result1 = await AsyncStorage.getItem('@avalia_image_storage');
            setData(JSON.parse(result1));
          }
        }
      }
    } catch (error) {
      setLoadingButton(false);
      Alert.alert('Erro', 'Ocorreu um problema, tente novamente', [
        { text: 'Ok' },
      ]);
    }
  }


  return (
    <Container>
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} />

      <Body>
        {loading ? (
          <Loading />
        ) : (
          <>
            <BodyTitle>Imagens armazenadas:</BodyTitle>
            <BodyDescription>
              Imagens salvas localmente para serem enviadas
            </BodyDescription>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <>
                  {item.image.indexOf("data:image/jpeg;base64,") != -1 ?

                    <Stack bg="black" w="100%" mt={2} alignSelf="center" borderRadius={20} space={5}>
                      <View style={{ flexDirection: 'column' }}>
                        <TextTime>Tentativa de envio: {new Date(item.time).toLocaleDateString("pt-BR")}</TextTime>
                        <Image
                          source={{ uri: item.image }}
                          alt="teste"
                          resizeMode="contain"
                          w="90%"
                          h={250}
                          alignSelf="center"
                        />

                        {loadingButton ?
                          <BtnSend disabled>
                            <ActivityIndicator color={"#fff"} />
                          </BtnSend>
                          :
                          <BtnSend onPress={() => Send(index)}>
                            <BtnSendText>Enviar</BtnSendText>
                          </BtnSend>
                        }

                      </View>
                    </Stack>
                    :
                    <Stack bg="black" w="100%" mt={2} alignSelf="center" borderRadius={20} space={5}>
                      <View style={{ flexDirection: 'column' }}>
                        <TextTime>Tentativa de envio: {new Date(item.time).toLocaleDateString("pt-BR")}</TextTime>
                        <Image
                          source={{ uri: "data:image/jpeg;base64," + item.image }}
                          alt="não tem"
                          resizeMode="contain"
                          w="90%"
                          h={250}
                          alignSelf="center"
                        />

                        {loadingButton ?
                          <BtnSend disabled>
                            <ActivityIndicator color={"#fff"} />
                          </BtnSend>
                          :
                          <BtnSend onPress={() => Send(index)}>
                            <BtnSendText>Enviar</BtnSendText>
                          </BtnSend>
                        }
                      </View>


                    </Stack>
                  }
                </>
              )}

            />


          </>
        )}
      </Body>
    </Container>
  );
}

export default Store;