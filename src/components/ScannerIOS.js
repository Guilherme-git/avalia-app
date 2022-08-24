/* eslint-disable react/forbid-prop-types */
/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Stack, Image, Icon, Text, Button } from 'native-base';
import { StyleSheet, ActivityIndicator, Platform, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PDFScanner from '@woonivers/react-native-document-scanner';
import { PERMISSIONS, openSettings, requestMultiple } from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../constants';

import {
  ContainerForgetModal,
  ContainerForgetModalHeader,
  ContainerForgetModalTitle,
  ContainerForgetModalDescription,
  InputForget,
  BtnForgetModal,
  BtnForgetModalText,
  ContainerForgetModalStatus,
  ContainerForgetModalStatusText,
} from './StyleScannerIOS';

const Scanner = ({ save, saveEmail, status, loagingEducat, loagingEmail, emailEnable, setLoadingEducat, setLoadingEmail }) => {
  const [allowed, setAllowed] = useState(false);
  const [takePicture, setTakePicture] = useState(true);
  const [takenPicture, setTakenPicture] = useState('');
  const [enableFlash, setEnableFlash] = useState(false);
  const [showQrCode, setShowQrCode] = useState(true);
  const [dataQRcode, setDataQRcode] = useState({});
  const [aluno, setAluno] = useState();
  const [escola, setEscola] = useState();
  const [serie, setSerie] = useState();
  const [retangleStatus, setRetangleStatus] = useState({});
  const [process, setProcess] = useState({});
  const [modalForgot, setModalForgot] = useState(false);
  const [modalForgotStatus, setModalForgotStatus] = useState(false);
  const [email, setEmail] = useState("");

  const pdfScannerElement = useRef(null);

  const requestCameraPermission = useCallback(async () => {
    const result = await requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA]);

    if (
      result['android.permission.CAMERA'] === 'granted' ||
      result['ios.permission.CAMERA'] === 'granted'
    ) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, []);

  useEffect(() => {
    setModalForgot(false)
    requestCameraPermission();
  }, [requestCameraPermission]);

  useEffect(() => {
    setTakePicture(true);
    setShowQrCode(true);
    // setModalForgot(false);
  },[status.enable])

  const handlePicture = useCallback(async ({ croppedImage }) => {
    if (croppedImage !== null || croppedImage !== undefined) {
      setTakePicture(false);
      setTakenPicture(croppedImage);
    }
  }, []);

  const handleQRCode = (dados) => {
    setDataQRcode(dados.data);
    // setAluno(dados.aluno);
    // setEscola(dados.escola);
    // setSerie(dados.serie);
    setShowQrCode(false);
  };

  const urlToBase64 = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  };

  const handleSave = () => {
    if (Platform.OS === 'android') {
      urlToBase64(takenPicture, (base64) => {
        save({
          image: base64,
          QRcode: dataQRcode,
        });
        
      });
    }
    if (Platform.OS === 'ios') {
      save({
        image: takenPicture,
        QRcode: dataQRcode,
      });
    }
  };

  const handleSaveEmail = () => {
    if(email === "") {
      Alert.alert(
        "Atenção",
        "Informe seu email",
        [
          { text: "OK" }
        ]
      );
    } else {
      if (Platform.OS === 'android') {
        urlToBase64(takenPicture, (base64) => {
          setModalForgot(false);
          saveEmail({
            image: base64,
            QRcode: dataQRcode,
            email
          });
          
        });
      }
      if (Platform.OS === 'ios') {
        setModalForgot(false);
        saveEmail({
          image: takenPicture,
          QRcode: dataQRcode,
          email
        });
      }
    }
    
  };

  const ReturnUri = () => {
    if (Platform.OS === 'android') {
      return takenPicture;
    }
    return `data:image/jpeg;base64,${takenPicture}`;
  };

  const ReturnOverlay = () => {
    if (Platform.OS === 'android') {
      return process?.processing;
    }
    return retangleStatus?.stableCounter > 4;
  };

  if (!allowed) {
    return (
      <Stack flex={1} alignItems="center" justifyContent="center" space={2}>
        <Text fontFamily={Fonts.ROBOTO_BOLD} color="#fff">
          Você deve aceitar a permissão da câmera
        </Text>
        <Button onPress={() => openSettings()}>Abrir configurações</Button>
      </Stack>
    );
  }

  return (
    <>
      {!takePicture && (
        <Stack flex={1} alignItems="center" justifyContent="center">
          {takenPicture !== '' && (
            <Stack bg="black" w="80%" alignSelf="center" borderRadius={20} space={5}>
              <Icon
                as={MaterialCommunityIcons}
                name="checkbox-marked-circle"
                position="absolute"
                color="#37B652"
                size="sm"
                top={2}
                right={2}
              />
              <Image
                source={{ uri: ReturnUri() }}
                alt="teste"
                resizeMode="contain"
                w="90%"
                h={250}
                alignSelf="center"
              />
              <Stack bg="white" w="100%" alignSelf="center" p={5} borderBottomRadius={20}>

                <Text fontFamily={Fonts.ROBOTO_BOLD} fontSize={12} color="#6B6B6B">
                  {/* {escola} */}
                </Text>

                <Text fontFamily={Fonts.ROBOTO_BOLD} fontSize={12} color="#6B6B6B">
                  {/* {aluno} */}
                </Text>

                <Text fontFamily={Fonts.ROBOTO_BOLD} fontSize={12} color="#6B6B6B">
                  {/* {serie} */}
                </Text>
                <Stack space={2} w="70%" alignSelf="center" mt={2}>
                  <Button onPress={handleSave} bg="#3D4684" _text={{ color: 'white' }}>
                    {loagingEducat ? <ActivityIndicator color="#fff" /> : <> Ok, enviar para EduCAT</>}
                  </Button>
                  {emailEnable &&
                    <Button onPress={() => setModalForgot(true)} bg="#3D4684" _text={{ color: 'white' }}>
                      {loagingEmail ? <ActivityIndicator color="#fff" /> : <> Ok, enviar para seu email</>}
                    </Button>
                  }

                  <Button
                    bg="#C4C4C4"
                    _text={{ color: 'white' }}
                    onPress={() => {
                      setTakePicture(true);
                      setShowQrCode(true);
                    }}
                  >
                    Escanear Novamente
                  </Button>
                </Stack>
              </Stack>

              {modalForgot && (
                <Modal isVisible animationIn="fadeInDown">
                  <ContainerForgetModal>
                    <ContainerForgetModalHeader>
                      <AntDesign
                        name="close"
                        size={20}
                        color="#858585"
                        onPress={() => (setModalForgot(false), setEmail(""))}
                      />
                    </ContainerForgetModalHeader>

                    <ContainerForgetModalTitle>Seu email</ContainerForgetModalTitle>
                    <ContainerForgetModalDescription>
                      Informe seu email
                    </ContainerForgetModalDescription>

                    <InputForget value={email} onChangeText={t => setEmail(t)} placeholder="E-mail"
                    keyboardType='email-address'
                    />

                    <BtnForgetModal onPress={handleSaveEmail}>
                      <BtnForgetModalText>{loagingEmail ? <ActivityIndicator color="#fff" /> : <>Enviar </>} </BtnForgetModalText>
                    </BtnForgetModal>
                  </ContainerForgetModal>
                </Modal>
              )}

            </Stack>
          )}
        </Stack>
      )}

      {takePicture && (
        <View flex={1}>
          {showQrCode ? (

            <QRCodeScanner
              cameraStyle={{ width: '100%', height: '100%', alignSelf: 'center' }}
              markerStyle={{
                borderColor: '#fff',
              }}
              onRead={(t) => handleQRCode(t)}
              // onRead={(t) => handleQRCode(JSON.parse(t.data.replace(/'/g, '"')))}
              showMarker
            />
          ) : (
            <>
              <PDFScanner
                saveInAppDocument={false}
                ref={pdfScannerElement}
                style={styles.scanner}
                onDocumentScanned={(document) => handlePicture(document.nativeEvent)}
                onPictureTaken={(picture) => handlePicture(picture)}
                onProcessing={(value) => setProcess(value)}
                overlayColor={ReturnOverlay() ? 'rgba(0,255,0, 0.8)' : 'rgba(255,255,0, 0.8)'}
                onRectangleDetect={(value) => setRetangleStatus(value)}
                enableTorch={enableFlash}
                quality={0.7}
                detectionCountBeforeCapture={7}
                detectionRefreshRateInMS={50}
                useBase64
              />

              <Icon
                as={Ionicons}
                name="flash"
                borderWidth={2}
                borderRadius={50}
                borderColor="white"
                position="absolute"
                color="white"
                size="sm"
                top={2}
                alignSelf="center"
                onPress={() => setEnableFlash(!enableFlash)}
              />

              <Icon
                as={Ionicons}
                name="close"
                position="absolute"
                color="white"
                size="sm"
                top={2}
                right={2}
                onPress={() => {
                  setTakePicture(true);
                  setShowQrCode(true);
                }}
              />

              <View
                borderColor="yellow.500"
                borderWidth={2}
                position="absolute"
                top={50}
                height="90%"
                width="90%"
                alignSelf="center"
              />
            </>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
});

Scanner.defaultProps = {
  status: {},
};

Scanner.propTypes = {
  save: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.any),
  loagingEducat: PropTypes.bool.isRequired,
};

export default Scanner;
