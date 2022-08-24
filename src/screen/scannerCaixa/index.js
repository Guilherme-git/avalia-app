/* eslint-disable object-curly-newline */

import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View } from 'native-base';
import { Alert as AlertReact } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../service';
import { ScannerCaixa } from '../../components';
import axios from 'axios';

import { ContainerForgetModalStatus, ContainerForgetModalStatusText } from './style';

const Scanner = ({navigation}) => {
  const [token, setToken] = useState();
  const [status, setStatus] = useState({ enable: false, message: '' });
  const [loadingEducat, setLoadingEducat] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailEnable, setEmailEnable] = useState();

  useEffect(() => {
    if (status.enable) {
      setTimeout(() => {
        setStatus({ enable: false, message: '' });
        setLoadingEducat(false);
        setLoadingEmail(false);
      }, 2000);
    }
  }, [status.enable]);

  useEffect(() => {
    const result = async () => {
      if ((await AsyncStorage.getItem('@avalia_token')) !== null) {
        try {
          const responseEmail = await api.get('/preferences/global/Scan__EmailEnabled/', {
            headers: {
              Authorization: `JWT ${await AsyncStorage.getItem('@avalia_token')}`,
            },
          });
          setToken(await AsyncStorage.getItem('@avalia_token'));
          setEmailEnable(responseEmail.data.value);
        } catch (error) {
          if (error.message === 'Network Error') {
            AlertReact.alert(
              'Problemas de conexão',
              'Verifique sua conexão com a internet',
              [{ text: 'OK' }],
            );
            navigation.navigate('auth')
          }
        }
      } else {
        try {
          const response = await api.post('/users/login', {
            username: 'app',
            password: '56LZmcgKqGMKmv2H',
          });
          const responseEmail = await api.get('/preferences/global/Scan__EmailEnabled/', {
            headers: {
              Authorization: `JWT ${response.data.token}`,
            },
          });

          setToken(response.data.token);
          setEmailEnable(responseEmail.data.value);

        } catch (error) {
          if (error.message === 'Network Error') {
            AlertReact.alert(
              'Problemas de conexão',
              'Verifique sua conexão com a internet',
              [{ text: 'OK' }],
            );
            navigation.navigate('auth')
          }
        }
      }
    };
    result();
  }, []);

  const save = async (dados) => {
    setLoadingEducat(true);
    setStatus({
      enable: false,
      message: '',
    });

    const axiosCall = axios.CancelToken.source();
    setTimeout(() => {
      axiosCall.cancel('timeout');
    }, 30000);

    try {
      const response1 = await axios({
        method: 'post',
        cancelToken: axiosCall.token,
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
          cancelToken: axiosCall.token,
          url: `${response1.data.upload_url}`,
          headers: {
            Authorization: `JWT ${token}`,
          },
          data: {
            content: dados.image,
            content_type: 'image/jpg',
          },
        });

        if (response2.status === 200) {
          const response3 = await axios({
            method: 'post',
            cancelToken: axiosCall.token,
            url: `https://avalia-mt-dev-api.educat.net.br/scans`,
            headers: {
              Authorization: `JWT ${token}`,
            },
            data: {
              upload: response1.data.id,
              code: dados.QRcode,
            },
          });

          if (response3.status === 201) {
            setLoadingEducat(false);
            setStatus({
              enable: true,
              message: 'Enviado com sucesso!',
            });
          }
        }
      }
    } catch (error) {
      setLoadingEducat(false);
      if (error.message === 'Network Error') {
        AlertReact.alert(
          'Problemas de conexão',
          'Verifique sua conexão com a internet',
          [{ text: 'OK' }],
        );

      }
      if (error.message === 'timeout') {
        AlertReact.alert(
          'Problemas de conexão',
          'Essa imagem foi armazenada localmente, tente enviá-la mais tarde',
          [{ text: 'Ver imagens', onPress: () => navigation.navigate('store') }, { text: 'Tentar novamente' }],
        );
        let arraySup = [];

        try {
          const result = await AsyncStorage.getItem('@avalia_image_storage');
          const test1 = JSON.parse(result);
          const test2 = result !== null && Object.keys(test1).length;
        
          if (result !== null && test2 >= 2) {
            AlertReact.alert('Atenção', 'Limite atingido de imagens não enviadas. ', [
              { text: 'Enviar imagens', onPress: () => navigation.navigate('store') },
              {text:"Fechar"}
            ]);
            return null;
          }

          if (result !== null) {
            arraySup = [...JSON.parse(result)];
          }

          arraySup.push({ time: new Date().getTime(), image: dados.image, QRcode: dados.QRcode })
          await AsyncStorage.setItem('@avalia_image_storage', JSON.stringify(arraySup));

        } catch (error) {
         
        }
      } else {
        setStatus({
          enable: true,
          message: 'Erro: tente novamente!',
        });
      }
    }
  };

  const saveEmail = async (dados) => {
    setLoadingEmail(true);

    setStatus({
      enable: false,
      message: '',
    });

    const axiosCall = axios.CancelToken.source();
    setTimeout(() => {
      axiosCall.cancel('timeout');
    }, 30000);

    try {
      const response1 = await axios({
        method: 'post',
        cancelToken: axiosCall.token,
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
          cancelToken: axiosCall.token,
          url: `${response1.data.upload_url}`,
          headers: {
            Authorization: `JWT ${token}`,
          },
          data: {
            content: dados.image,
            content_type: 'image/jpg',
          },
        });

        if (response2.status === 200) {
          const response3 = await axios({
            method: 'post',
            cancelToken: axiosCall.token,
            url: `https://avalia-mt-dev-api.educat.net.br/scans`,
            headers: {
              Authorization: `JWT ${token}`,
            },
            data: {
              upload: response1.data.id,
              // code: JSON.stringify(dados.QRcode),
              code: dados.QRcode,
              destination_email: dados.email,
            },
          });

          if (response3.status === 201) {
            setLoadingEmail(false);
            setStatus({
              enable: true,
              message: 'Enviado com sucesso!',
            });
          }
        }
      }
    } catch (error) {
      setLoadingEmail(false);
      if (error.message === 'Network Error') {
        AlertReact.alert(
          'Problemas de conexão',
          'Verifique sua conexão com a internet',
          [{ text: 'OK' }],
        );

      }
      if (error.message === 'timeout') {
        AlertReact.alert(
          'Problemas de conexão',
          'Essa imagem foi armazenada localmente, tente enviá-la mais tarde',
          [{ text: 'Ver imagens', onPress: () => navigation.navigate('store') }, { text: 'Tentar novamente' }],
        );
        let arraySup = [];

        try {
          const result = await AsyncStorage.getItem('@avalia_image_storage');
          const test1 = JSON.parse(result);
          const test2 = result !== null && Object.keys(test1).length;

          if (result !== null && test2 >= 2) {
            AlertReact.alert('Atenção', 'Limite atingido de imagens não enviadas. ', [
              { text: 'Enviar imagens', onPress: () => navigation.navigate('store') },
              {text:"Fechar"}
            ]);
            return null;
          }

          if (result !== null) {
            arraySup = [...JSON.parse(result)];
          }

          arraySup.push({ time: new Date().getTime(), image: dados.image, QRcode: dados.QRcode })
          await AsyncStorage.setItem('@avalia_image_storage', JSON.stringify(arraySup));

          // await AsyncStorage.clear()
        } catch (error) {
  
        }
      } else {
        setStatus({
          enable: true,
          message: 'Erro: tente novamente!',
        });
      }
    }
  };



  return (
    <View flex={1} bg="#5A5A5A">
      <Modal isVisible={status.enable}>
        <ContainerForgetModalStatus>
          <ContainerForgetModalStatusText>{status.message}</ContainerForgetModalStatusText>
        </ContainerForgetModalStatus>
      </Modal>

      <ScannerCaixa
        save={save}
        saveEmail={saveEmail}
        loagingEducat={loadingEducat}
        loagingEmail={loadingEmail}
        setLoadingEducat={setLoadingEducat}
        setLoadingEmail={setLoadingEmail}
        status={status}
        emailEnable={emailEnable}
      />
    </View>
  );
};

export default Scanner;
