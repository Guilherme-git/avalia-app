import React, { useState, useEffect } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import Modal from 'react-native-modal';
import AntDesign from "react-native-vector-icons/AntDesign"
import Menu from "../../components/Menu";
import api from "../../service";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Container,
    Header,
    HeaderDescription,
    HeaderMatter,
    HeanderDetailsContainer,
    HeaderDetails1,
    HeaderDetails11,
    HeaderDetails2,
    HeaderDetailsMunicipio,
    Body,
    BodyContainer,
    BodyContainerQuestion,
    BodyContainerQuestionOption,
    BodyContainerQuestionOptionText,
    CardDivisor,
    CardSend,
    CardSendText,
    CardBack,
    CardBackText,
    ContainerModalSend,
    ContainerModalSendTitle
} from './style'

const TestStudants = ({ route }) => {
    const [loading, setLoading] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [modalSend, setModalSend] = useState()
    const navigation = useNavigation();

    const [total_questoes, setTotal_Questoes] = useState(() => [...Array(route.params.total_questoes).keys()])
    const [markers, setMakers] = useState([]);

    const CONFIG = [
        {
            id: 1,
            name: "A",
        },
        {
            id: 2,
            name: "B",
        },
        {
            id: 3,
            name: "C",
        },
        {
            id: 4,
            name: "D",
        },
        {
            id: 5,
            name: "E",
        }
    ]

    const send = async () => {
        setLoading(true)
        const arraySup = [...total_questoes];

        const result = arraySup.map((question, index) => {

            if (typeof question !== "object" || question.valor.length === 0) {
                return question[index] = "N/A";
            } else {
                return question.name;
            }

        })

        const teste = { ...result }
        let answer = {};

        for (const [key, value] of Object.entries(teste)) {
            answer[Number(key) + 1] = value
        }

        const obj = {
            application: route.params.testeEstudante,
            answer: answer
        }

        try {
            const response = await api.post('/application-answers', obj, {
                headers: {
                    'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
                }
            })

            if (Object.keys(response.data).length > 0) {
                Alert.alert(
                    "Sucesso",
                    "Gabarito enviado",
                    [
                        { text: "OK" }
                    ]
                );

            }
        } catch (error) {
            if (error.response.data.non_field_errors) {
                if (error.response.data.non_field_errors[0] == 'Number of question invalid, expected 1.') {
                    Alert.alert(
                        "Atenção",
                        `Número de pergunta inválido, esperado 1.`,
                        [
                            { text: "OK" }
                        ]
                    );
                }
            }
            if (error.response.data.application) {
                if (error.response.data.application[0] == 'This field is required') {
                    Alert.alert(
                        "Atenção",
                        `É obrigatório escolher uma instituição`,
                        [
                            { text: "OK" }
                        ]
                    );
                }
            }
        }

        setLoading(false)
        setModalSend(false)
    }

    const verifyQuestions = (index, name) => {
        const arraySup1 = [...total_questoes];

        if (arraySup1[index].valor?.length) {
            arraySup1[index].name = 'DOUBLE_ANSWER'
            setTotal_Questoes(arraySup1)
        } else {
            arraySup1[index] = index;
            setTotal_Questoes(arraySup1)
        }

        if (arraySup1[index].valor?.length >= 1) {
            const searchIndex = arraySup1[index].valor.findIndex(value => value.selecao === name);

            if (searchIndex !== -1 && arraySup1[index].valor[searchIndex].selecao === name) {

                arraySup1[index].valor.splice(searchIndex, 1);

                if (arraySup1[index].valor.length === 1) {
                    arraySup1[index].name = arraySup1[index].valor[0].selecao;
                }

                setTotal_Questoes(arraySup1)
            } else {

                arraySup1[index].valor.push({
                    selecao: name
                })
                setTotal_Questoes(arraySup1)
            }
        } else {
            arraySup1[index] = {
                name: name,
                valor: [{
                    selecao: name
                }]
            }
            setTotal_Questoes(arraySup1)
        }
    }

    const remove = (index) => {
        const arraySup = [...total_questoes]
        arraySup[index] = index;
        setTotal_Questoes(arraySup)
    }

    const verificaStatus = (dados, name, index2) => {
        if (Object.keys(dados).length > 0) {
            const index = dados.valor.findIndex(value => value.selecao === name)
            if (index !== -1) {
                return true
            }
        } else {
            return false
        }
    }

    return (
        <Container>
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            {!showMenu &&
                <Header>
                    <HeaderDescription>
                        Escola {">"} Turmas {">"} Provas
                    </HeaderDescription>

                    <HeaderMatter>
                        {route.params.testeName}
                    </HeaderMatter>

                    <HeaderDetails11>
                        Instituição: <HeaderDetails2>{route.params.schoolName}</HeaderDetails2>
                    </HeaderDetails11>

                    <HeaderDetails11>
                        Estudante: <HeaderDetails2>{route.params.estudante}</HeaderDetails2>
                    </HeaderDetails11>

                    <HeaderDetails11>
                        Etapa: <HeaderDetails2>{route.params.etapaEscolar}</HeaderDetails2>
                    </HeaderDetails11>

                    <HeanderDetailsContainer>
                        <HeaderDetails1>
                            Turma: <HeaderDetails2>{route.params.turma}</HeaderDetails2>
                        </HeaderDetails1>

                        <HeaderDetails1>
                            Período: <HeaderDetails2>{route.params.turno}</HeaderDetails2>
                        </HeaderDetails1>

                    </HeanderDetailsContainer>

                    <HeanderDetailsContainer>
                        <HeaderDetailsMunicipio>
                            Município: <HeaderDetails2>{route.params.cidade}</HeaderDetails2>
                        </HeaderDetailsMunicipio>
                    </HeanderDetailsContainer>
                </Header>
            }
            <ScrollView showsVerticalScrollIndicator={false}>
                <Body>
                    {total_questoes.map((dados, index) =>
                        <React.Fragment key={index}>
                            <BodyContainer>
                                <BodyContainerQuestion>
                                    {index + 1}
                                </BodyContainerQuestion>
                                {CONFIG.map((value, index2) =>
                                    <BodyContainerQuestionOption onPress={() => verifyQuestions(index, value.name)} status={verificaStatus(dados, value.name, index2)}>
                                        <BodyContainerQuestionOptionText status={verificaStatus(dados, value.name, index2)}>{value.name}</BodyContainerQuestionOptionText>
                                    </BodyContainerQuestionOption>
                                )}

                                <AntDesign onPress={() => remove(index)} name="closecircle" color='#8B8B8B' size={30} />
                            </BodyContainer>

                            <CardDivisor></CardDivisor>
                        </React.Fragment>
                    )}

                    <CardSend onPress={() => setModalSend(true)}>
                        <CardSendText>Ok, enviar</CardSendText>
                    </CardSend>

                    <CardBack onPress={() => navigation.goBack()}>
                        <CardBackText>Voltar</CardBackText>
                    </CardBack>

                    {modalSend && (
                        <Modal isVisible animationIn="fadeInDown">
                            <ContainerModalSend>
                                <ContainerModalSendTitle>Tem certeza de que deseja enviar?</ContainerModalSendTitle>

                                {loading ? <ActivityIndicator color="#09A09F" size={18} style={{ marginTop: 10, marginBottom: 10 }} /> :
                                    <CardSend onPress={send}>
                                        <CardSendText>Sim, tenho certeza</CardSendText>
                                    </CardSend>
                                }


                                <CardBack onPress={() => { setModalSend(false), setLoading(false) }}>
                                    <CardBackText>Voltar</CardBackText>
                                </CardBack>
                            </ContainerModalSend>

                        </Modal>
                    )}
                </Body>
            </ScrollView>


        </Container>
    );
}

export default TestStudants