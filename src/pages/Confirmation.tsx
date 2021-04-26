import React from 'react';
import { 
    SafeAreaView,
    Text,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Container = styled.SafeAreaView`
flex: 1;
align-items: center;
justify-content: center;
`;

const Content = styled.View`
flex: 1;
justify-content: center;
align-items: center;
width: 100%;
padding: 30px;
`;

const Emoji = styled.Text`
font-size: 78px;
`;

const Title = styled.Text`
font-size: 22px;
font-family: ${fonts.heading};
text-align: center;
color: ${colors.heading};
line-height: 38px;
margin-top: 10px;
`;

const Subtitle = styled.Text`
font-size: 17px;
font-family: ${fonts.text};
text-align: center;
color: ${colors.heading};
padding-top: 10px;
padding-bottom: 10px;
`;

const Footer = styled.View`
width: 100%;
padding-left: 75px;
padding-right: 75px;
margin-top: 20px;
`;

export function Confirmation() {
    const navigation = useNavigation();
    
    function handleMoveOn() {
        navigation.navigate('PlantSelect')
    }
    return (
        <Container>
            <Content>
                <Emoji>
                    😄
                </Emoji>
                <Title>
                    Prontinho
                </Title>
                <Subtitle>
                    Agora vamos começar a cuidar das suas 
                    plantinhas com muito cuidado 
                </Subtitle>
                <Footer>
                    <Button title="Começar" onPress={handleMoveOn} />
                </Footer>
            </Content>
        </Container>
    )
}