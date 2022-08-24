import React, { useState, useEffect, useCallback } from "react";
import {useFocusEffect} from '@react-navigation/native'
import { useNavigation } from "@react-navigation/native";
import IconEnviado from 'react-native-vector-icons/AntDesign'
import IconPedente from 'react-native-vector-icons/FontAwesome'
import IconProgresso from 'react-native-vector-icons/Ionicons'
import IconDown from "react-native-vector-icons/AntDesign";
import Menu from "../../components/Menu";
import api from "../../service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/Loading';

import {
    Container,
    Header,
    HeaderDescription,
    HeaderMatter,
    HeanderDetailsContainer,
    HeaderDetails1,
    HeaderDetails2,
    HeaderBody,
    HeaderBodyContainer,
    HeaderBodyText,
    Body,
    BtnScanner,
    BtnScannerText,
    Card,
    CardText,
    CardDetails,
    CardDetailsText,
    CardDivisor,
    CardButton,
    CardButtonText,
    HeaderDetailsEtapaEscolar,
    ContainerPagination,
    ContaierBTNpagination,
    ContaierBTNpaginationText
} from './style'
import { Text, View } from "react-native";
import { FlatList } from "native-base";

const TestStudants = ({ route }) => {
    const [atual, setAtual] = useState(1);
    const [fim, setFim] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    const [loading, setLoading] = useState(true)
    const [down, setDown] = useState()
    const [select, setSelect] = useState()
    const [data, setData] = useState([])
    const navigation = useNavigation();

    useEffect(() => { 
        
        const results = async () => {
            const result = await api.get(`/applications?clss=${route.params.classe}&exam=${route.params.teste}`, {
                headers: {
                    'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
                }
            })
        
            setData(result.data.results)
            setLoading(false)

            if (result.data.next == null) {
                setFim(true)
            }
        };
        results();
    }, [])


    const nextPagination = async () => {
        setLoading(true)
      
        const result = await api.get(`/applications?clss=${route.params.classe}&exam=${route.params.teste}&page=${atual + 1}`, {
            headers: {
                'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
            }
        })

        if (result.data.next == null) {
            setFim(false)
        } else {
            setAtual(atual + 1)
        }
       
        setData(result.data.results)
        setLoading(false)
    }

    const backPagination = async () => {
        setLoading(true)
        const result = await api.get(`/applications?clss=${route.params.classe}&exam=${route.params.teste}&page=${atual - 1}`, {
            headers: {
                'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
            }
        })

        if(fim) {
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
                    <HeaderDescription>
                        Escola {">"} Turmas {">"} Provas
                    </HeaderDescription>

                    <HeaderMatter>
                        {route.params.testeName}
                    </HeaderMatter>

                    <HeaderDetailsEtapaEscolar>
                        Etapa Escolar: <HeaderDetails2>{route.params.etapaEscolar}</HeaderDetails2>
                    </HeaderDetailsEtapaEscolar>

                    <HeanderDetailsContainer>
                        <HeaderDetails1>
                            Turma: <HeaderDetails2>{route.params.turma}</HeaderDetails2>

                            {"  "}{"  "}{"  "}
                            Turno: <HeaderDetails2>{route.params.turno}</HeaderDetails2>

                            {"  "}{"  "}{"  "}
                            Estudantes: <HeaderDetails2>{route.params.estudantes}</HeaderDetails2>
                        </HeaderDetails1>
                    </HeanderDetailsContainer>

                    {/* <HeanderDetailsContainer>
                        <HeaderDetails1>
                            Turno: <HeaderDetails2>{route.params.turno}</HeaderDetails2>
                        </HeaderDetails1>

                        <HeaderDetails1>
                            Estudantes: <HeaderDetails2>042</HeaderDetails2>
                        </HeaderDetails1>
                    </HeanderDetailsContainer> */}
                </Header>
            }
            <HeaderBody>
                <HeaderBodyContainer>
                    <IconEnviado color="#37B652" name="circledown" size={15} />
                    <HeaderBodyText>Enviado</HeaderBodyText>
                </HeaderBodyContainer>

                <HeaderBodyContainer>
                    <IconPedente color="#BD6156" name="exclamation-circle" size={15} />
                    <HeaderBodyText>Pedente</HeaderBodyText>
                </HeaderBodyContainer>

                <HeaderBodyContainer>
                    <IconProgresso color="#7E7E7E" name="time" size={15} />
                    <HeaderBodyText>Em progresso</HeaderBodyText>
                </HeaderBodyContainer>
            </HeaderBody>

            <Body>
                {loading ? <Loading /> :
                    <>
                        <BtnScanner onPress={() => navigation.navigate('scanner')}>
                            <BtnScannerText>ESCANER PROVAS</BtnScannerText>
                        </BtnScanner>


                        <FlatList
                            data={data}
                            renderItem={({ item, index }) =>
                                <View>
                                    <Card onPress={() => { setDown(!down); setSelect(item.id) }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {item.process_status == 'PROCESSED' &&
                                                <IconEnviado color="#37B652" name="circledown" size={25} />
                                            }

                                            {item.process_status == 'PENDING' &&
                                                <IconPedente color="#BD6156" name="exclamation-circle" size={25} />
                                            }

                                            {item.process_status == 'IN_PROGRESS' &&
                                                <IconProgresso color="#7E7E7E" name="time" size={25} />
                                            }

                                            <CardText>{item.student.name} </CardText>
                                        </View>

                                        {down && item.id === select ?
                                            <IconDown name="down" color='#09A09F' size={15} />
                                            :
                                            <IconDown name="up" color='#09A09F' size={15} />
                                        }
                                    </Card>

                                    {down && item.id === select &&
                                        <CardDetails>
                                            {item.process_status == 'PROCESSED' &&
                                                <>
                                                    <CardDetailsText>Enviado {item.processed_at}</CardDetailsText>
                                                    <CardDivisor></CardDivisor>
                                                </>
                                            }

                                            {item.process_status == 'PENDING' &&
                                                <>
                                                    <CardButton onPress={() => navigation.navigate('add-manually', {
                                                        testeEstudante: item.id,
                                                        total_questoes: route.params.total_questoes,
                                                        estudante: item.student.name,
                                                        testeName: route.params.testeName,
                                                        schoolName: route.params.schoolName,
                                                        etapaEscolar: route.params.etapaEscolar,
                                                        turma: route.params.turma,
                                                        turno: route.params.turno,
                                                        cidade: route.params.cidade
                                                    })}>
                                                        <CardButtonText>Adicionar Manualmente</CardButtonText>
                                                    </CardButton>
                                                    <CardDivisor></CardDivisor>
                                                </>
                                            }

                                            {item.process_status == 'IN_PROGRESS' &&
                                                <>
                                                    <CardDetailsText>Em progresso...</CardDetailsText>
                                                    <CardDivisor></CardDivisor>
                                                </>
                                            }
                                        </CardDetails>
                                    }

                                </View>
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
        </Container >
    );
}

export default TestStudants