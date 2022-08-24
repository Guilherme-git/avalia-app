import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, View, ScrollView } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import Menu from "../../components/Menu";
import { Images } from "../../constants";
import api from '../../service'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/Loading';

import {
    Container,
    Header,
    Logo,
    Body,
    BodyDescription,
    BodyTitle,
    BodyCard,
    BodyCardDescription,
    BodyCardDescriptionButton,
    BodyCardDescriptionSchoolStatusActive,
    BodyCardDescriptionSchoolStatusDisable,
    BodyCardDescriptionSchool,
    BodyCardDescriptionStage,
    BodyCardDescriptionTeam,
    BodyCardDescriptionDate,
    BodyCardDescriptionShift,
    BodyCardDescriptionStudent,
    ContainerPagination,
    ContaierBTNpagination,
    ContaierBTNpaginationText
} from './style'

const Test = ({ route }) => {
    const [atual, setAtual] = useState(1);
    const [fim, setFim] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const results = async () => {
            const result = await api.get(`/exams?clss=${route.params.classe}&school=${route.params.school}&grade=${route.params.grade}`, {
                headers: {
                    'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
                }
            })
            if (result.data.next == null) {
                setFim(true)
            }
            setData(result.data.results)
            setLoading(false)
        }

        results();
    }, [])

    const nextPagination = async () => {
        setLoading(true)

        const result = await api.get(`/exams?clss=${route.params.classe}&school=${route.params.school}&grade=${route.params.grade}&page=${atual + 1}`, {
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
        const result = await api.get(`/exams?clss=${route.params.classe}&school=${route.params.school}&grade=${route.params.grade}&page=${atual - 1}`, {
            headers: {
                'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
            }
        })
        if (fim) {
            setFim(false)
        }
        setAtual(atual - 1)
        setData(result.data.results)
        setLoading(false)
    }

    return (
        <Container>
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />

            {!showMenu &&
                <Header>
                    <Logo source={Images.LOGO_TEST} />
                </Header>
            }

            <Body>
                {loading ? <Loading /> :
                    <>
                        <BodyDescription>
                            Escola {">"} Turmas
                        </BodyDescription>

                        <BodyTitle>Provas:</BodyTitle>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={({ item }) =>
                                <>
                                    <BodyCard>
                                        <BodyCardDescription>
                                            <ScrollView showsVerticalScrollIndicator={false}
                                                style={{ width: '100%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <BodyCardDescriptionSchoolStatusActive />
                                                    <BodyCardDescriptionSchool>{item.name} </BodyCardDescriptionSchool>
                                                </View>

                                                <BodyCardDescriptionStage>
                                                    Etapa escolar: {route.params.etapaEscolar}
                                                </BodyCardDescriptionStage>

                                                <BodyCardDescriptionTeam>
                                                    Turma: {route.params.turma}
                                                </BodyCardDescriptionTeam>

                                                <BodyCardDescriptionShift>
                                                    Turno: {route.params.turno}

                                                    {"  "}{"  "}{"  "}
                                                    <BodyCardDescriptionStudent>
                                                        Estudantes: {route.params.estudantes}
                                                    </BodyCardDescriptionStudent>
                                                </BodyCardDescriptionShift>
                                            </ScrollView>
                                        </BodyCardDescription>

                                        <BodyCardDescriptionButton onPress={() => navigation.navigate('test-studants', {
                                            classe: route.params.classe,
                                            teste: item.id,
                                            testeName: item.name,
                                            turma: route.params.turma,
                                            etapaEscolar: route.params.etapaEscolar,
                                            turno: route.params.turno,
                                            turma: route.params.turma,
                                            estudantes: route.params.estudantes,
                                            schoolName: route.params.schoolName,
                                            cidade: route.params.cidade,
                                            total_questoes: item.total_questions
                                        })}>
                                            <AntDesign name='right' color='#fff' />
                                        </BodyCardDescriptionButton>
                                    </BodyCard>
                                </>
                            }
                        />

                        <ContainerPagination>
                            {atual > 1 &&
                                <ContaierBTNpagination onPress={backPagination}>
                                    <ContaierBTNpaginationText>Voltar</ContaierBTNpaginationText>
                                </ContaierBTNpagination>
                            }

                            {!fim &&
                                <ContaierBTNpagination onPress={nextPagination}>
                                    <ContaierBTNpaginationText>Próximo</ContaierBTNpaginationText>
                                </ContaierBTNpagination>
                            }
                        </ContainerPagination>

                    </>
                }
            </Body>
        </Container>
    );
}

export default Test