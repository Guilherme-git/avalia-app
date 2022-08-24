import React, {useState} from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
    ContainerMenuDisable,
    ContainerMenuActive,
    IconMenu,
    TextContainerMenuDisable,
    TextUserContainerMenuDisable,
    TextUserContainerMenuActive,
    TextContainerMenuActive,
    ContainerMenuDescription,
    ContainerMenuDescriptionScreen,
    ContainerMenuDescriptionScreenText,
} from './style'

const Menu = (props) => {
    const navigation = useNavigation();

    const logout = async () => {
       await AsyncStorage.removeItem("@avalia_token");
       navigation.navigate("auth");
    }

    return (
        <>
            {props.showMenu ?
                <ContainerMenuActive onPress={() => props.setShowMenu(!props.showMenu)}>
                    <View style={{ flexDirection: 'row' }}>
                        <IconMenu name='menu' size={18} color='#fff' />
                        <TextContainerMenuActive>Configuração</TextContainerMenuActive>
                    </View>

                    <TextUserContainerMenuActive>---</TextUserContainerMenuActive>

                </ContainerMenuActive>
                :
                <ContainerMenuDisable onPress={() => props.setShowMenu(!props.showMenu)}>
                    <View style={{ flexDirection: 'row' }}>
                        <IconMenu name='menu' size={18} color='#fff' />
                        <TextContainerMenuDisable>Configuração</TextContainerMenuDisable>
                    </View>

                    <TextUserContainerMenuDisable>---</TextUserContainerMenuDisable>

                </ContainerMenuDisable>
            }

            {props.showMenu &&
                <ContainerMenuDescription>
                    <ContainerMenuDescriptionScreen>
                        <ContainerMenuDescriptionScreenText>Meus dados</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>

                    <ContainerMenuDescriptionScreen>
                        <ContainerMenuDescriptionScreenText>Sobre o projeto / AvaliaMT</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>

                    <ContainerMenuDescriptionScreen>
                        <ContainerMenuDescriptionScreenText>Política de privacidade</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>

                    <ContainerMenuDescriptionScreen>
                        <ContainerMenuDescriptionScreenText>Central de mensagens</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>

                    <ContainerMenuDescriptionScreen>
                        <ContainerMenuDescriptionScreenText>Ajuda</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>

                    <ContainerMenuDescriptionScreen onPress={() => navigation.navigate('store')}>
                        <ContainerMenuDescriptionScreenText>Imagens armazenadas</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>

                    <ContainerMenuDescriptionScreen onPress={logout}>
                        <ContainerMenuDescriptionScreenText>Sair</ContainerMenuDescriptionScreenText>
                    </ContainerMenuDescriptionScreen>
                </ContainerMenuDescription>
            }
        </>
    )
}

export default Menu