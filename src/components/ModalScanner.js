/* eslint-disable react/forbid-prop-types */
import React, { memo, useCallback, useState } from 'react';
import { Button, Center, Checkbox, Image, Modal, Stack, Text } from 'native-base';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Fonts, Images } from '../constants';

const CONFIG_TEXT = [
  {
    id: 1,
    text: '1. Certifique-se de estar em um ambiente iluminado e com a câmera do aparelho limpa.',
  },
  {
    id: 2,
    text: '2. Escolha um fundo escuro, que contraste com a folha de prova.',
  },
  {
    id: 3,
    text: '3. Posicione os quadrados pretos nas marcações amarelas da câmera e mantenha o celular estático.',
  },
];

const ModalScanner = ({ openModal, handleOpenModal, navigation }) => {
  const [togleCheckBox, setTogleCheckBox] = useState(false);

  const showModal = async (value) => {
    await AsyncStorage.setItem("@avalia_modal_scanner", JSON.stringify(value) )
  }

 

  const Check = useCallback(
    () => (
      <Checkbox
        colorScheme="gray"
        _text={{ color: '#6B6B6B', fontSize: 13 }}
        value={togleCheckBox}
        onChange={(value) => showModal(value)}
      >
        Não mostrar essa mensagem novamente.
      </Checkbox>
    ),
    [togleCheckBox],
  );

  return (
    <Center>
      <Modal isOpen={openModal} onClose={() => handleOpenModal(false)}>
        <Modal.Content bg="#ECECEC">
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontFamily={Fonts.ROBOTO_BOLD} color="#3D4684" fontSize={20}>
              Escaneando a Prova
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Stack space={3}>
              {CONFIG_TEXT.map(({ id, text }) => (
                <Text color="#6B6B6B" fontFamily={Fonts.ROBOTO_REGULAR} fontSize={12} key={id}>
                  {text}
                </Text>
              ))}
              <Image source={Images.LOGO_SCANNER} alt="LOGO_SCANNER" h={200} />
              <Check />
            </Stack>
          </Modal.Body>
          <Modal.Footer alignSelf="center" bg="#ECECEC">
            <Button
              bg="#37B652"
              _text={{ color: 'white', fontSize: 14 }}
              onPress={() => {
                navigation.navigate('scanner');
                handleOpenModal(false);
              }}
            >
              Ok, entendi!
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

ModalScanner.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.openModal !== prevProps.openModal) {
    return false;
  }

  return true;
};

export default memo(ModalScanner, equal);
