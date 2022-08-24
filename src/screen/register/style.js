import styled from "styled-components/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../../constants'
import TextInputMask from 'react-native-text-input-mask'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #000;
`;

export const Header = styled.View`
    background-color: #fff;
    justify-content: center;
    align-items: center;
    flex: 1;
   
`;

export const IconClose = styled(AntDesign)`
    align-self: flex-end;
    margin-right: ${RFValue(20)}px;
`;

export const HeaderImage = styled.Image`

`;

export const HeaderTitle = styled.Text`
    color: #3D4684;
    font-size: ${RFValue(24)}px;
    font-family: ${Fonts.ROBOTO_BOLD};
    margin-top: ${RFValue(15)}px;
`;

export const HeaderDescription = styled.Text`
    color: #6B6B6B;
    font-size: ${RFValue(12)}px;
    font-family: ${Fonts.ROBOTO_REGULAR};
    text-align: center;
    margin-top: ${RFValue(7)}px;
    margin-left: ${RFValue(16)}px;
    margin-right: ${RFValue(16)}px;
`;

export const Body = styled.View`
    flex: 1;
    background-color: #D7E4E6;
`
export const ContainerInput = styled.View`
    margin: ${RFValue(20)}px;
    margin-bottom: ${RFValue(0)}px;
`

export const Input = styled.TextInput`
    background-color: #fff;
    font-family: ${Fonts.ROBOTO_REGULAR};
    height: ${RFValue(40)}px;
    border-radius: ${RFValue(8)}px;
    margin-top: ${RFValue(8)}px;
    padding: ${RFValue(12)}px;
`;

export const InputPhone = styled(TextInputMask)`
    background-color: #fff;
    font-family: ${Fonts.ROBOTO_REGULAR};
    height: ${RFValue(40)}px;
    border-radius: ${RFValue(8)}px;
    margin-top: ${RFValue(8)}px;
    padding: ${RFValue(12)}px;
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(135)}px;
  height: ${RFValue(35)}px;
  background-color: #3D4684;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #fff;
  font-family: ${Fonts.ROBOTO_REGULAR};
`;

export const ContainerForgetModalStatus = styled.View`
  height: ${RFValue(91)}px;
  background-color: rgba(0,0,0, 0.7);
  margin-left: ${RFValue(18)}px;
  margin-right: ${RFValue(18)}px;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
`;

export const ContainerForgetModalStatusText = styled.Text` 
  color: #fff;
  font-family: ${Fonts.ROBOTO_REGULAR};
  font-size: ${RFValue(24)}px;
`;