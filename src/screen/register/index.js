import React, { useEffect, useState } from 'react';
import { Keyboard, ActivityIndicator, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../constants';
import Modal from "react-native-modal";
import api from './../../service'
import { getToken } from "../../utils";

import {
    Container,
    Header,
    IconClose,
    HeaderImage,
    HeaderTitle,
    HeaderDescription,
    Body,
    ContainerInput,
    Input,
    Button,
    TextButton,
    ContainerForgetModalStatus,
    ContainerForgetModalStatusText,
    InputPhone
} from './style'

const Register = () => {
    const [status, setStauts] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [cpf, setCpf] = useState();
    const [phone, setPhone] = useState();
    const [school, setSchool] = useState();
    const navigation = useNavigation()
    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        if (showStatus) {
            setTimeout(() => {
                setShowStatus(false)
            }, 3000);
        }
    }, [showStatus])

    const cpfMask = value => {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }

    const handleSubmit = async () => {
        if (!name || !email || !cpf || !phone || !school) {
            Alert.alert(
                "Atenção",
                `Preencha todos os campos`,
                [
                    { text: "OK" }
                ]
            );
        } else {
            setStauts(true)
            try {
                const response = await api.post('/request-users-creation', {
                    name,
                    email,
                    cpf,
                    phone_number: phone,
                    school
                })
                if (Object.keys(response.data).length > 0) {
                    setName("")
                    setEmail("")
                    setCpf("")
                    setPhone("")
                    setSchool("")
                    setShowStatus(true)
                }
            } catch (error) {
                if (error.response.data.school) {
                    Alert.alert(
                        "Atenção",
                        `Essa instituição não existe`,
                        [
                            { text: "OK" }
                        ]
                    );
                }
                if (error.response.data.cpf) {
                    if (error.response.data.cpf[0] == 'CPF is invalid.') {
                        Alert.alert(
                            "Atenção",
                            `Esse CPF é inválido`,
                            [
                                { text: "OK" }
                            ]
                        );
                    }

                }
                if (error.response.data.email) {
                    if (error.response.data.email[0] == 'request user creation with this email address already exists.') {
                        Alert.alert(
                            "Atenção",
                            `Este endereço de e-mail já existe.`,
                            [
                                { text: "OK" }
                            ]
                        );
                    }

                }
                if (error.response.data.phone_number) {
                    if (error.response.data.phone_number[0] == 'This field must be unique.') {
                        Alert.alert(
                            "Atenção",
                            `Este campo deve ser único.`,
                            [
                                { text: "OK" }
                            ]
                        );
                    }

                }
            }
            setStauts(false)
        }
    }

    return (
        <Container onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header>
                <IconClose onPress={() => navigation.navigate('auth')}
                    name='close' size={20} color="#858585" />

                <HeaderImage source={Images.LOGO_REGISTER} />

                <HeaderTitle>Ainda não tem login ?</HeaderTitle>
                <HeaderDescription>
                    Preencha o formulário abaixo. Em breve te retornaremos com informações sobre seu cadastro
                </HeaderDescription>
            </Header>


            <Body>
                <ScrollView>
                    <ContainerInput>
                        <Input value={name} onChangeText={t => setName(t)} placeholder='Nome completo' />

                        <Input value={cpf} onChangeText={t => setCpf(cpfMask(t))} placeholder='CPF' />

                        <InputPhone mask={"[00] [99999] - [9999]"}
                            value={phone} onChangeText={t => setPhone(t)} placeholder='Telefone' />

                        <Input value={email} onChangeText={t => setEmail(t)} placeholder='E-mail' />

                        <Input value={school} onChangeText={t => setSchool(t)} keyboardType='numeric' placeholder='Instituição de ensino' />
                    </ContainerInput>

                    <Button onPress={handleSubmit}>
                        {status ? <ActivityIndicator color="#fff" size={18} /> : <TextButton>Entrar</TextButton>}
                    </Button>
                </ScrollView>
            </Body>


            {showStatus &&
                <Modal isVisible={true} animationIn={'fadeInDown'}>
                    <ContainerForgetModalStatus>
                        <ContainerForgetModalStatusText>Enviado com sucesso!</ContainerForgetModalStatusText>
                    </ContainerForgetModalStatus>
                </Modal>
            }

        </Container>
    );
}

export default Register;