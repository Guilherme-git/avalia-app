import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../constants';

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