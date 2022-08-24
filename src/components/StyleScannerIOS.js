import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from './../constants';

export const ContainerForgetModal = styled.View`
  position: absolute;
  height: ${RFValue(252)}px;
  border-radius: ${RFValue(8)}px;
  background-color: #ECECEC;
  align-self: center;
  width: 100%;
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