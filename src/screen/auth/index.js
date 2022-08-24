/* eslint-disable react/forbid-prop-types */
/* eslint-disable object-curly-newline */
import React, { useCallback, useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../service";
import { Images } from '../../constants';
import { ModalScanner, ModalScannerCaixa, ModalScannerPacote } from '../../components';

import {
  Container,
  BackImage,
  Logo,
  Text1,
  ContainerForm,
  ContainerInput,
  Input,
  Text2,
  Button,
  TextButton,
  Text3,
  ScannerButton,
  ImageScannerButton,
  TextScannerButton,
  ContainerForgetModal,
  ContainerForgetModalHeader,
  ContainerForgetModalTitle,
  ContainerForgetModalDescription,
  InputForget,
  BtnForgetModal,
  BtnForgetModalText,
  ContainerForgetModalStatus,
  ContainerForgetModalStatusText,
  TextScanner,
  ContainerScanners
} from './style';

const Auth = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalCaixa, setOpenModalCaixa] = useState(false);
  const [openModalPacote, setOpenModalPacote] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [modalForgot, setModalForgot] = useState(false);
  const [modalForgotStatus, setModalForgotStatus] = useState(false);

  // SENHA = 56LZmcgKqGMKmv2H

  const handleOpenModal = useCallback((value) => {
    setOpenModal(value);
  }, []);

  const handleOpenModalCaixa = useCallback((value) => {
    setOpenModalCaixa(value);
  }, []);

  const handleOpenModalPacote = useCallback((value) => {
    setOpenModalPacote(value);
  }, []);

  const handleAuth = async () => {
    if (userName && password) {
      setLoading(true)
      try {
        const response = await api.post('/users/login', {
          username: userName,
          password
        })
        await AsyncStorage.setItem('@avalia_token', response.data.token)
        navigation.navigate('home')
      } catch (error) {
        if (error.message === 'Network Error') {
          Alert.alert(
            'Problemas de conexão',
            'Verifique sua conexão com a internet',
            [{ text: 'OK' }],
          );
        }
        if (error.response?.data?.non_field_errors[0])
          Alert.alert(
            "Atenção",
            `${error.response.data.non_field_errors[0]}`,
            [
              { text: "OK" }
            ]
          );
      }
      setLoading(false)
    } else {
      Alert.alert(
        "Atenção",
        "Informe seu usuário e senha",
        [
          { text: "OK" }
        ]
      );
    }
  }

  const navigateScanner = useCallback(async () => {
    const modal_scanner = await AsyncStorage.getItem("@avalia_modal_scanner")

    if (modal_scanner === "false" || modal_scanner === null) {
      setOpenModal(true);
    } else {
      navigation.navigate('scanner')
    }
  }, []);

  const navigateScannerCaixa = useCallback(async () => {
    const modal_scanner_caixa = await AsyncStorage.getItem("@avalia_modal_scanner_caixa")

    if (modal_scanner_caixa === "false" || modal_scanner_caixa === null) {
      setOpenModalCaixa(true);
    } else {
      navigation.navigate('scanner-caixa')
    }
  }, []);

  const navigateScannerPacote = useCallback(async () => {
    const modal_scanner_pacote = await AsyncStorage.getItem("@avalia_modal_scanner_pacote")

    if (modal_scanner_pacote === "false" || modal_scanner_pacote === null) {
      setOpenModalPacote(true);
    } else {
      navigation.navigate('scanner-pacote')
    }
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (await AsyncStorage.getItem("@avalia_token") !== null) {
        navigation.navigate('home')
      }
    }
    verifyToken()
  }, [])

  const forgotPassword = async () => {
    if (!email) {
      Alert.alert(
        "Atenção",
        "Informe seu email",
        [
          { text: "OK" }
        ]
      );
    } else {
      try {
        const response = await api.post('/users/reset_password', {
          email
        })
        if (response.data.status == "OK") {
          setModalForgotStatus(true)
        }
      } catch (error) {
        if (error.message === 'Network Error') {
          Alert.alert(
            'Problemas de conexão',
            'Verifique sua conexão com a internet',
            [{ text: 'OK' }],
          );

        }
        if (error.response.data.email) {
          if (error.response.data.email[0] == 'Enter a valid email address.') {
            Alert.alert(
              "Atenção",
              `Digite um endereço de e-mail válido`,
              [
                { text: "OK" }
              ]
            );
          }
        }
        if (error.response.data.email) {
          if (error.response.data.email[0] == 'We couldnt find an account associated with that email. Please try a different e-mail address.') {
            Alert.alert(
              "Atenção",
              `Não foi possível encontrar uma conta associada a esse e-mail. Tente um endereço de e-mail diferente`,
              [
                { text: "OK" }
              ]
            );
          }
        }
      }
    }
  }

  return (
    <>
      <BackImage source={Images.BACK_IMAGE} />
      <Logo source={Images.LOGO_IMAGE} resizeMode='contain' />

      <Text1>Faça o seu login</Text1>

      <Container>
        <ContainerForm>
          <ContainerInput>
            <Input value={userName}
              onChangeText={t => setUserName(t)}
              placeholder="Login" />
          </ContainerInput>

          <ContainerInput>
            <Input value={password}
              onChangeText={t => setPassword(t)}
              secureTextEntry={showPassword} placeholder="Senha" />
            {showPassword ? (
              <Ionicons
                onPress={() => setShowPassword(!showPassword)}
                name="eye"
                size={24}
                color="gray"
                style={{
                  position: 'absolute',
                  right: 2,
                  top: 5,
                }}
              />
            ) : (
              <Ionicons
                onPress={() => setShowPassword(!showPassword)}
                name="eye-off"
                size={24}
                color="gray"
                style={{
                  position: 'absolute',
                  right: 2,
                  top: 5,
                }}
              />
            )}
          </ContainerInput>

          <Text2 onPress={() => setModalForgot(true)}>Esqueci a minha senha</Text2>

          <Button onPress={handleAuth}>
            <TextButton>{loading ? <ActivityIndicator color="#fff" size={18} /> : "Entrar"} </TextButton>
          </Button>
        </ContainerForm>

        <Text3 onPress={() => navigation.navigate('register')}>Ainda não tenho login</Text3>

        <TextScanner>Escaneie sem login:</TextScanner>

        <ContainerScanners>
          <ScannerButton onPress={navigateScanner}>
            <ImageScannerButton source={Images.IMAGE_SCANNER} resizeMode='contain' />
            <TextScannerButton>Escanear provas</TextScannerButton>
          </ScannerButton>

          <ScannerButton onPress={navigateScannerCaixa}>
            <ImageScannerButton source={Images.IMAGE_SCANNER_CAIXA} resizeMode='contain' />
            <TextScannerButton>Caixa</TextScannerButton>
          </ScannerButton>

          <ScannerButton onPress={navigateScannerPacote}>
            <ImageScannerButton source={Images.IMAGE_SCANNER_PACOTE} resizeMode='contain' />
            <TextScannerButton>Pacote</TextScannerButton>
          </ScannerButton>
        </ContainerScanners>

      </Container>

      {modalForgot && (
        <Modal isVisible animationIn="fadeInDown">
          <ContainerForgetModal>
            <ContainerForgetModalHeader>
              <AntDesign
                name="close"
                size={20}
                color="#858585"
                onPress={() => (setModalForgot(false), setModalForgotStatus(false), setEmail(""))}
              />
            </ContainerForgetModalHeader>

            <ContainerForgetModalTitle>Esqueceu a senha ?</ContainerForgetModalTitle>
            <ContainerForgetModalDescription>
              Escreva seu e-mail e enviaremos instruções para o cadastro da sua nova senha
            </ContainerForgetModalDescription>

            <InputForget value={email} onChangeText={t => setEmail(t)} placeholder="E-mail" />

            <BtnForgetModal onPress={forgotPassword}>
              <BtnForgetModalText>Enviar</BtnForgetModalText>
            </BtnForgetModal>
          </ContainerForgetModal>

          {modalForgotStatus && (
            <ContainerForgetModalStatus>
              <ContainerForgetModalStatusText>Enviado com sucesso!</ContainerForgetModalStatusText>
            </ContainerForgetModalStatus>
          )}
        </Modal>
      )}

      <ModalScanner
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        navigation={navigation}
      />

      <ModalScannerCaixa
        openModal={openModalCaixa}
        handleOpenModal={handleOpenModalCaixa}
        navigation={navigation}
      />

      <ModalScannerPacote
        openModal={openModalPacote}
        handleOpenModal={handleOpenModalPacote}
        navigation={navigation}
      />
    </>

  );
};

export default Auth;
