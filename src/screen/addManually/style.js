import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'
import Fonts from "../../constants/fonts";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Header = styled.View`
    margin-top: ${RFValue(20)}px;
    padding-left: ${RFValue(16)}px;
    margin-bottom: ${RFValue(10)}px;
`;

export const HeaderDescription = styled.Text`
    color: #8B8B8B;
    font-family: ${Fonts.ROBOTO_REGULAR};
    text-align: justify;
`;

export const HeaderMatter = styled.Text`
    color: #6B6B6B;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(16)}px;
    margin-top: ${RFValue(10)}px;
    margin-right: ${RFValue(16)}px;
    text-align: justify;
`

export const HeanderDetailsContainer = styled.View`
    flex-direction: row;
    margin-right: ${RFValue(16)}px;
    width: 100%;
`;

export const HeaderDetails1 = styled.Text`
    justify-content: space-between;
    padding: ${RFValue(5)}px;
    border-color: #6B6B6B;
    border-width: 1px;
    border-radius: ${RFValue(8)}px;
    font-size: ${RFValue(12)}px;
    text-align: justify;
    margin-top: ${RFValue(15)}px;
    margin-right: ${RFValue(10)}px;
    color: #6B6B6B;
    font-family: ${Fonts.ROBOTO_BOLD};
`;

export const HeaderDetailsMunicipio = styled.Text`
    flex: 1;
    justify-content: space-between;
    padding: ${RFValue(5)}px;
    border-color: #6B6B6B;
    border-width: 1px;
    border-radius: ${RFValue(8)}px;
    font-size: ${RFValue(12)}px;
    text-align: justify;
    margin-top: ${RFValue(15)}px;
    margin-right: ${RFValue(10)}px;
    color: #6B6B6B;
    font-family: ${Fonts.ROBOTO_BOLD};
`;

export const HeaderDetails11 = styled.Text`
    padding: ${RFValue(5)}px;
    border-color: #6B6B6B;
    border-width: 1px;
    border-radius: ${RFValue(8)}px;
    font-size: ${RFValue(12)}px;
    width: ${RFValue(320)}px;
    text-align: justify;
    margin-top: ${RFValue(15)}px;
    margin-right: ${RFValue(10)}px;
    color: #6B6B6B;
    font-family: ${Fonts.ROBOTO_BOLD};
`;

export const HeaderDetails2 = styled.Text`
    font-family: ${Fonts.ROBOTO_REGULAR};
    font-size: ${RFValue(12)}px;
    text-align: justify;
    margin-top: ${RFValue(15)}px;
    margin-right: ${RFValue(10)}px;
    color: #6B6B6B;
`;

export const Body = styled.View`
    margin-left: ${RFValue(19)}px;
    margin-right: ${RFValue(19)}px;
`;

export const BodyContainer = styled.View`
margin-top: ${RFValue(10)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BodyContainerQuestion = styled.Text`
font-size: ${RFValue(19)}px;
   color: #8B8B8B;
   font-family: ${Fonts.ROBOTO_REGULAR};
`;

export const BodyContainerQuestionOption = styled.TouchableOpacity`
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
    background-color: ${(props) => (props.status ? '#3D4684' :'#ECECEC')};
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(50)}px;
`;

export const BodyContainerQuestionOptionText = styled.Text`
    font-size: ${RFValue(19)}px;
    color: ${(props) => (props.status ? '#ECECEC' :'#3D4684')};
`;

export const CardDivisor = styled.Text`
    background-color: #ECECEC;
    height: 1px;
    margin-top: ${RFValue(10)}px;
`;

export const CardSend = styled.TouchableOpacity`
    background-color: #3D4684;
    width: ${RFValue(171)}px;
    height: ${RFValue(27)}px;
    margin-top: ${RFValue(20)}px;
    align-self: center;
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(2)}px;
`;

export const CardSendText = styled.Text`
   color: #fff;
   font-family: ${Fonts.ROBOTO_REGULAR};
   font-size: ${RFValue(15)}px;
`;

export const CardBack = styled.TouchableOpacity`
    background-color: #C4C4C4;
    width: ${RFValue(171)}px;
    height: ${RFValue(27)}px;
    margin-top: ${RFValue(5)}px;
    margin-bottom: ${RFValue(10)}px;;
    align-self: center;
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(2)}px;
`;

export const CardBackText = styled.Text`
   color: #fff;
   font-family: ${Fonts.ROBOTO_REGULAR};
   font-size: ${RFValue(15)}px;
`;

export const ContainerModalSend = styled.View`
  height: ${RFValue(127)}px;
  border-radius: ${RFValue(8)}px;
  background-color: #ECECEC;
  justify-content: center;
  align-items: center;
`;

export const ContainerModalSendTitle = styled.Text`
  color: #8B8B8B;
  font-family: ${Fonts.ROBOTO_BOLD};
  font-size: ${RFValue(15)}px;
  text-align: center;
`;