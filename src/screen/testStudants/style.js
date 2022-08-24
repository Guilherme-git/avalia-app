import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import Fonts from "../../constants/fonts";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Header = styled.View`
    margin-top: ${RFValue(20)}px;
    padding-left: ${RFValue(16)}px;
    margin-bottom: ${RFValue(10)}px;
    margin-right: ${RFValue(16)}px;
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
    justify-content: space-between;
    margin-right: ${RFValue(16)}px;
`;

export const HeaderDetails1 = styled.Text`
    font-size: ${RFValue(12)}px;
    width: ${RFPercentage(100)}px;
    text-align: justify;
    margin-top: ${RFValue(15)}px;
    margin-right: ${RFValue(10)}px;
    color: #6B6B6B;
    font-family: ${Fonts.ROBOTO_BOLD};
`;

export const HeaderDetailsEtapaEscolar = styled.Text`
    font-size: ${RFValue(12)}px;
    width: 100%;
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

export const HeaderBody = styled.View`
    background-color: #ECECEC;
    flex-direction: row;
    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
    height: ${RFValue(27)}px;
    align-items: center;
`;

export const HeaderBodyContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

export const HeaderBodyText = styled.Text`
    color: #6B6B6B;
    font-family: ${Fonts.ROBOTO_REGULAR};
    margin-left: ${RFValue(8)}px;
    margin-right: ${RFValue(15)}px;
`

export const Body = styled.View`
    margin-left: ${RFValue(19)}px;
    margin-right: ${RFValue(19)}px;
    height: ${RFPercentage(60)}px;
`;

export const BtnScanner = styled.TouchableOpacity`
    background-color: #3D4684;
    justify-content: center;
    align-items: center;
    margin-top: ${RFValue(10)}px;
    height: ${RFValue(36)}px;
    border-radius: ${RFValue(8)}px;
    margin-bottom: ${RFValue(20)}px;
`

export const BtnScannerText = styled.Text`
   color: #fff;
   font-size: ${RFValue(12)}px;
   font-family: ${Fonts.ROBOTO_REGULAR};
`

export const Card = styled.TouchableOpacity`
    padding-left: ${RFValue(19)}px;
    padding-right: ${RFValue(19)}px;
    background-color: #ECECEC;
    border-radius: ${RFValue(8)}px;
    height: ${RFValue(53)}px;
  
    flex-direction: row;
    align-items: center;
    margin-bottom: ${RFValue(10)}px;
    justify-content: space-between;
`

export const CardText = styled.Text`
    color: #595959;
    font-family: ${Fonts.ROBOTO_REGULAR};
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(15)}px;
`

export const CardDetails = styled.View`
    background-color: #fff;
    margin-bottom: ${RFValue(10)}px;
`

export const CardDivisor = styled.Text`
    background-color: #ECECEC;
    height: 1px;
`;

export const CardDetailsText = styled.Text`
   color: #6B6B6B;
   font-family: ${Fonts.ROBOTO_REGULAR};
   font-size: ${RFValue(12)}px;
   margin-bottom: ${RFValue(5)}px;
`

export const CardButton = styled.TouchableOpacity`
    background-color: #D7E4E6;
    justify-content: center;
    align-items: center;
    height: ${RFValue(36)}px;
    border-radius: ${RFValue(8)}px;
    margin-bottom: ${RFValue(10)}px;
`;

export const CardButtonText = styled.Text`
    color: #6B6B6B;
    font-size: ${RFValue(12)}px;
    font-family: ${Fonts.ROBOTO_REGULAR};
`
export const ContainerPagination = styled.View`
    flex-direction: row;
    align-self: center;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(10)}px;
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