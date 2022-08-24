import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, FlatList } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Images } from '../../constants'
import Menu from '../../components/Menu'
import api from '../../service'

import Loading from '../../components/Loading';

import {Container,
    Logo,
    Header,
    Body,
    BodyTitle,
    BodyDescription,
    BodyCard,
    BodyCardDescription,
    BodyCardDescriptionSchoolStatusActive,
    BodyCardDescriptionSchoolStatusDisable,
    BodyCardDescriptionSchool,
    BodyCardDescriptionCountry,
    BodyCardDescriptionButton,
    ContainerPagination,
    ContaierBTNpagination,
    ContaierBTNpaginationText,
    ContainerForgetModalStatus,
    ContainerForgetModalStatusText} from './style'


const Home = () => {
    const [atual, setAtual] = useState(1);
    const [fim, setFim] = useState(false);
    const [loading, setLoading] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    const [data, setData] = useState([])
    const [status, setStatus] = useState({ enable: false, message: '' });


    const navigation = useNavigation();

    const logout = useCallback(async () => {
      await AsyncStorage.removeItem('@avalia_token');
      navigation.navigate('auth');
    }, [navigation]);


    useEffect(() => {
        if (status.enable) {
          setTimeout(() => {
            setStatus({ enable: false, message: '' });
            logout()
          }, 2000);
        }
      }, [status.enable, logout]);
    


    useEffect(() => {
      const results = async () => {
        try {
          const result = await api.get('/schools', {
            headers: {
              Authorization: `JWT ${await AsyncStorage.getItem('@avalia_token')}`,
            },
          });
          if (result.data.next == null) {
            setFim(true);
          }
          setData(result.data.results);
          setLoading(false);
        } catch (error) {
          if (error.response?.data?.detail === 'Signature has expired.') {
            setStatus({
              enable: true,
              message: 'Sessão expirada.',
            });
          }
        }
      };

      results();
    }, []);

    const nextPagination = async () => {
        setLoading(true)

        const result = await api.get(`/schools?page=${atual + 1}`, {
            headers: {
                'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
            }
        })
        if (result.data.next == null) {
            setFim(true)
        } else {
            setAtual(atual + 1)
        }

        setData(result.data.results)
        setLoading(false)
    }

    const backPagination = async () => {
        setLoading(true)
        const result = await api.get(`/schools?page=${atual - 1}`, {
            headers: {
                'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
            }
        })
        if (fim) {
            setFim(true)
        }
        setAtual(atual - 1)
        setData(result.data.results)
        setLoading(false)
    }

    return (
      <Container>
        <Menu showMenu={showMenu} setShowMenu={setShowMenu} />

        {!showMenu && (
          <Header>
            <Logo source={Images.LOGO_HOME} />
          </Header>
        )}
        <Body>
          {loading ? (
            <Loading />
          ) : (
            <>
              <BodyTitle>Escolas:</BodyTitle>
              <BodyDescription>
                Estas são as escolas em que você trabalha; selecione a escola desejada:
              </BodyDescription>

              <FlatList
                style={{ height: 5 }}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                  <BodyCard>
                    <BodyCardDescription>
                      <View style={{ flexDirection: 'row' }}>
                        <BodyCardDescriptionSchoolStatusActive />
                        <BodyCardDescriptionSchool>{item.name}</BodyCardDescriptionSchool>
                      </View>

                      <BodyCardDescriptionCountry>
                        Município: {item.city.name}
                      </BodyCardDescriptionCountry>
                    </BodyCardDescription>

                    <BodyCardDescriptionButton
                      onPress={() =>
                        navigation.navigate('classes', {
                          school: item.id,
                          schoolName: item.name,
                        })
                      }
                    >
                      <AntDesign name="right" color="#fff" />
                    </BodyCardDescriptionButton>
                  </BodyCard>
                )}
              />

              <ContainerPagination>
                {atual > 1 && (
                  <ContaierBTNpagination onPress={backPagination}>
                    <ContaierBTNpaginationText>Voltar</ContaierBTNpaginationText>
                  </ContaierBTNpagination>
                )}

                {!fim && (
                  <ContaierBTNpagination onPress={nextPagination}>
                    <ContaierBTNpaginationText>Próximo</ContaierBTNpaginationText>
                  </ContaierBTNpagination>
                )}
              </ContainerPagination>
            </>
          )}
        </Body>

        <Modal isVisible={status.enable}>
          <ContainerForgetModalStatus>
            <ContainerForgetModalStatusText>{status.message}</ContainerForgetModalStatusText>
          </ContainerForgetModalStatus>
        </Modal>
      </Container>
    );
}

export default Home;