import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Menu from "../../components/Menu";
import { Images } from "../../constants";
import api from './../../service'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/Loading';

import {
    Container,
    Header,
    Logo,
    Body,
    BodyTitle,
    BodyDescription,
    CardClasses,
    CardClassesText,
    CardClassesIcon,
    BodyCard,
    BodyCardDescription,
    BodyCardDescriptionSchoolStatusActive,
    BodyCardDescriptionSchoolStatusDisable,
    BodyCardDescriptionSchool,
    BodyCardDescriptionTeam,
    BodyCardDescriptionShift,
    BodyCardDescriptionButton,
    BodyCardDescriptionStudent,
    ContainerPagination,
    ContaierBTNpagination,
    ContaierBTNpaginationText
} from './style'

const Classes = ({ route }) => {
    const [atual, setAtual] = useState(1);
    const [fim, setFim] = useState(false);
    const [gradeSelected, setGradeSelected] = useState()
    const [show, setShow] = useState()
    const [loading, setLoading] = useState(true)
    const [dataGrade, setDataGrade] = useState([])
    const [dataClasses, setDataClasses] = useState([])
    const [showMenu, setShowMenu] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        const results = async () => {

            const resultGrade = await api.get('/grades', {
                headers: {
                    'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
                }
            })
            if (resultGrade.data.next == null) {
                setFim(true)
            }
            setDataGrade(resultGrade.data.results)
            setLoading(false)
        }

        results()
    }, [])

    const searchClasses = async (id) => {
        const resultClasses = await api.get(`/classes?school=${route.params.school}&grade=${id}`, {
            headers: {
                'Authorization': `JWT ${await AsyncStorage.getItem("@avalia_token")}`
            }
        })
        setDataClasses(resultClasses.data.results)
        setShow(!show);
        setGradeSelected(id)
    }

    const nextPagination = async () => {
        setLoading(true)

        const result = await api.get(`/grades?page=${atual + 1}`, {
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
        const result = await api.get(`/grades?page=${atual - 1}`, {
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
                    <Logo source={Images.LOGO_CLASSES} />
                </Header>
            }

            <Body>
                {loading ? <Loading /> :
                    <>
                        <BodyDescription>
                            Escolas
                        </BodyDescription>
                        <BodyTitle>Turmas:</BodyTitle>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={dataGrade}
                            renderItem={({ item: grade }) =>
                                <>
                                    <CardClasses key={grade.id}
                                        onPress={() => { searchClasses(grade.id) }} >
                                        <CardClassesText>{grade.name}</CardClassesText>
                                        <CardClassesIcon name="down" color='#fff' />
                                    </CardClasses>


                                    {show && grade.id == gradeSelected &&
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={dataClasses}
                                            renderItem={({ item: classe }) =>
                                                <BodyCard key={classe.id}>
                                                    <BodyCardDescription>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <BodyCardDescriptionSchoolStatusActive />
                                                            <BodyCardDescriptionSchool>{classe.code} </BodyCardDescriptionSchool>
                                                        </View>

                                                        <BodyCardDescriptionTeam>
                                                            Turma: {classe.name}
                                                            {"   "}{"   "}{"   "}
                                                            <BodyCardDescriptionShift>
                                                                Turno: {classe.shift}
                                                            </BodyCardDescriptionShift>
                                                        </BodyCardDescriptionTeam>

                                                        <BodyCardDescriptionStudent>
                                                            Estudantes: {classe.total_students}
                                                        </BodyCardDescriptionStudent>

                                                    </BodyCardDescription>

                                                    <BodyCardDescriptionButton onPress={() => navigation.navigate('test', {
                                                        school: route.params.school,
                                                        grade: gradeSelected,
                                                        classe: classe.id,
                                                        turma: classe.name,
                                                        estudantes: classe.total_students,
                                                        etapaEscolar: grade.name,
                                                        turno: classe.shift,
                                                        schoolName: route.params.schoolName,
                                                        cidade: classe.school.city.name
                                                    })}>
                                                        <AntDesign name='right' color='#fff' />
                                                    </BodyCardDescriptionButton>
                                                </BodyCard>


                                            }
                                        />

                                    }
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
    )
}

export default Classes