import styled from "styled-components/native";
import { Fonts } from "../../constants";
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'
import Feather from 'react-native-vector-icons/Feather'

export const ContainerMenuActive = styled.TouchableOpacity`
    background-color: #3D4684;
    height: ${RFValue(39)}px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const ContainerMenuDisable = styled.TouchableOpacity`
    background-color: #3D4684;
    height: ${RFValue(39)}px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const IconMenu = styled(Feather)`
    margin-left: ${RFValue(10)}px;
`;

export const TextContainerMenuDisable = styled.Text`
    flex-direction: row;
    color: #fff;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(10)}px;
`;

export const TextUserContainerMenuDisable = styled.Text`
    flex-direction: row;
    color: #3D4684;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
`;

export const TextUserContainerMenuActive= styled.Text`
    flex-direction: row;
    color: #fff;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
`;

export const TextContainerMenuActive = styled.Text`
    color: #fff;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(10)}px;
`;

export const ContainerMenuDescription = styled.View`
    background-color: #fff;
`;

export const ContainerMenuDescriptionScreen = styled.TouchableOpacity`
    background-color: #D7E4E6;
    height: ${RFValue(30)}px;
    justify-content: center;
    padding-top: ${RFValue(2)}px;
    padding-bottom: ${RFValue(2)}px;
    padding-left: ${RFValue(30)}px;
    margin-bottom: 1px;
`;

export const ContainerMenuDescriptionScreenText = styled.Text`
    color: #3D4684;
    font-family: ${Fonts.ROBOTO_REGULAR};
    font-size: ${RFValue(16)}px;
`;