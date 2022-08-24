import styled from "styled-components/native";
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'
import { Fonts } from "../../constants";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Header = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: ${RFValue(20)}px;
`;

export const Logo = styled.Image`
`;

export const Body = styled.View`
    flex: 1;
    margin-left: ${RFValue(19)}px;
    margin-right: ${RFValue(19)}px;
    margin-bottom: ${RFValue(19)}px;
`;

export const BodyTitle = styled.Text`
    color: #3D4684;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(24)}px;
    margin-top: ${RFValue(10)}px;
`;

export const BodyDescription = styled.Text`
    color: #8B8B8B;
    margin-top: ${RFValue(3)}px;
    font-family: ${Fonts.ROBOTO_REGULAR};
    text-align: justify;
`;

export const BodyCard = styled.View` 
    background-color: #ECECEC;
    height: ${RFValue(91)}px;
    margin-top: ${RFValue(12)}px;
    border-radius: ${RFValue(8)}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const BodyCardDescription = styled.View`
`;

export const BodyCardDescriptionSchoolStatusActive = styled.View`
    border-radius: ${RFValue(50)}px;
    height: ${RFValue(11)}px;
    width: ${RFValue(11)}px;
    background-color: #37B652;
    margin-right: ${RFValue(10)}px;
    margin-left: ${RFValue(10)}px;
    margin-top: ${RFValue(10)}px;
`;

export const BodyCardDescriptionSchoolStatusDisable = styled.View`
    border-radius: ${RFValue(50)}px;
    height: ${RFValue(11)}px;
    width: ${RFValue(11)}px;
    background-color: #BD6F56;
    margin-right: ${RFValue(10)}px;
    margin-left: ${RFValue(10)}px;
    margin-top: ${RFValue(10)}px;
`;

export const BodyCardDescriptionSchool = styled.Text`
    font-family: ${Fonts.ROBOTO_REGULAR};
    font-size: ${RFValue(12)}px;
    width: ${RFValue(235)}px;
    text-align: justify;
    margin-top: ${RFValue(10)}px;
    text-transform: uppercase;
    color: #6B6B6B;
`;

export const BodyCardDescriptionCountry = styled.Text`
    font-family: ${Fonts.ROBOTO_REGULAR};
    font-size: ${RFValue(12)}px;
    width: ${RFValue(240)}px;
    text-align: justify;
    margin-top: ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
    margin-left: ${RFValue(32)}px;
    color: #6B6B6B;
`;

export const BodyCardDescriptionButton = styled.TouchableOpacity`
    background-color: #C4C4C4;
    justify-content: center;
    align-items: center;
    width: ${RFValue(29)}px;
    border-top-right-radius: ${RFValue(8)}px;
    border-bottom-right-radius: ${RFValue(8)}px;
`;

export const ContainerPagination = styled.View`
    flex-direction: row;
    align-self: center;
    justify-content: center;
    align-items: center;
  
    margin-top: ${RFValue(20)}px;
`

export const ContaierBTNpagination = styled.TouchableOpacity`
    margin-right: ${RFValue(10)}px;
    margin-left: ${RFValue(10)}px;
`

export const ContaierBTNpaginationText = styled.Text`
    color: #09A09F;
    font-family: ${Fonts.ROBOTO_BOLD};
    font-size: ${RFValue(18)}px;
`

export const ContainerForgetModalStatus = styled.View`
  height: ${RFValue(91)}px;
  background-color: rgba(0,0,0, 1);
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

export const BtnSend = styled.TouchableOpacity`
    background-color: #3D4684;
    width: 100%;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export const BtnSendText = styled.Text`
    color: #fff;
    font-family: ${Fonts.ROBOTO_BOLD};
`;

export const TextTime = styled.Text`
    background-color: #3D4684;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    font-family: ${Fonts.ROBOTO_BOLD};
`;