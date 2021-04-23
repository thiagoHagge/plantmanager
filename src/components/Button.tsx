import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const ButtonBody = styled.TouchableOpacity`
background-color: ${colors.green};
height: 56px;
border-radius: 16px;
justify-content: center;
align-items: center;
`;

const ButtonText = styled.Text`
font-size: 16px;
color: ${colors.white};
font-family: ${fonts.heading};
`;

export function Button({ title, ...rest } : ButtonProps ) {
  return (
    <ButtonBody activeOpacity={0.7} {...rest}>
      <ButtonText>
        {title}
      </ButtonText>
    </ButtonBody>
  )
}