import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../constants';

export const Container = styled.View`
  flex: 1;
`;

export const BackImage = styled.Image`
  flex: 1;
  width: 100%;
  position: absolute;
`;

export const Logo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(55)}px;
  align-self: center;
  margin-top: ${RFValue(121)}px;
`;

export const Text1 = styled.Text`
  color: #044e5d;
  font-weight: bold;
  margin-top: ${RFValue(40)}px;
  margin-left: ${RFValue(16)}px;
  font-size: ${RFValue(16)}px;
  font-family: ${Fonts.ROBOTO_BOLD};
`;

export const ContainerForm = styled.View`
  margin-left: ${RFValue(10)}px;
  margin-right: ${RFValue(10)}px;
`;

export const ContainerInput = styled.View`
  background-color: #fff;
  width: 100%;
  margin-top: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  align-self: center;
`;

export const Input = styled.TextInput`
  font-family: ${Fonts.ROBOTO_REGULAR};
  height: ${RFValue(40)}px;
  margin-left: ${RFValue(13)}px;
  width: 100%;
`;

export const Text2 = styled.Text`
  color: #6b6b6b;
  margin-top: ${RFValue(10)}px;
  margin-left: ${RFValue(16)}px;
  font-size: ${RFValue(12)}px;
  font-family: ${Fonts.ROBOTO_REGULAR};
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(135)}px;
  height: ${RFValue(35)}px;
  background-color: #3D4684;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: ${RFValue(43)}px;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #fff;
  font-family: ${Fonts.ROBOTO_REGULAR};
`;

export const Text3 = styled.Text`
  color: #6b6b6b;
  font-weight: bold;
  margin-top: ${RFValue(24)}px;
  font-size: ${RFValue(12)}px;
  text-align: center;
  font-family: ${Fonts.ROBOTO_BOLD};
`;

export const ScannerButton = styled.TouchableOpacity`
  margin-top: ${RFValue(20)}px;
  background-color: #fff;
  height: ${RFValue(80)}px;
  width: ${RFValue(80)}px;
  align-self: center;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
`;

export const ImageScannerButton = styled.Image`
    height: ${RFValue(20)}px;
    width: ${RFValue(20)}px;
`;

export const TextScannerButton = styled.Text`
  color: #3D4684;
  font-family: ${Fonts.ROBOTO_REGULAR};
  text-align: center;
`;

export const ContainerForgetModal = styled.View`
  position: absolute;
  height: ${RFValue(252)}px;
  border-radius: ${RFValue(8)}px;
  background-color: #ECECEC;
`;

export const ContainerForgetModalHeader = styled.View`
  align-items: flex-end;
  margin-top: ${RFValue(14)}px;
  margin-right: ${RFValue(14)}px;
`;

export const ContainerForgetModalTitle = styled.Text`
  color: #3D4684;
  font-family: ${Fonts.ROBOTO_BOLD};
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-top: ${RFValue(20)}px;
  margin-left: ${RFValue(65)}px;
  margin-right: ${RFValue(65)}px;
`;

export const ContainerForgetModalDescription = styled.Text`
  color: #6B6B6B;
  text-align: center;
  font-family: ${Fonts.ROBOTO_REGULAR};
  margin-top: ${RFValue(7)}px;
  font-size: ${RFValue(12)}px;
  margin-left: ${RFValue(8)}px;
  margin-right: ${RFValue(8)}px;
`;

export const InputForget = styled.TextInput`
  font-family: ${Fonts.ROBOTO_REGULAR};
  border-radius: ${RFValue(8)}px;
  height: ${RFValue(35)}px;
  margin-top: ${RFValue(15)}px;
  margin-left: ${RFValue(13)}px;
  margin-right: ${RFValue(13)}px;
  background-color: #fff;
  padding-top: ${RFValue(6)}px;
  padding-bottom: ${RFValue(6)}px;
  padding-left: ${RFValue(11)}px;
  padding-right: ${RFValue(11)}px;
`;

export const BtnForgetModal = styled.TouchableOpacity`
  background-color: #044E5D;
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(28)}px;
  width: ${RFValue(135)}px;
  height: ${RFValue(35)}px;
  border-radius: ${RFValue(8)}px;
  align-self: center;
`;

export const BtnForgetModalText = styled.Text`
  color: #fff;
  font-family: ${Fonts.ROBOTO_REGULAR};
  font-size: ${RFValue(16)}px;
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

export const TextScanner = styled.Text`
  color: #212847;
  font-family:${Fonts.ROBOTO_BOLD};
  font-weight: bold;
  margin-top: ${RFValue(47)}px;
  text-align: center;
  font-size: ${RFValue(16)}px;
`;

export const ContainerScanners = styled.View`
  flex-direction: row;
  justify-content: space-around;
`; 