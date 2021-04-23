import React from 'react';
import { 
    SafeAreaView,
    Text,
    View
} from 'react-native';
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
margin-top: 15px;
`;

const Subtitle = styled.Text`
font-size: 17px;
font-family: ${fonts.text};
text-align: center;
color: ${colors.heading};
padding-top: 10;
padding-bottom: 10;
`;

const Footer = styled.View`
width: 100%;
padding-left: 50px;
padding-right: 50px;
margin-top: 20px;
`;

export function Confirmation() {
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
            </Content>
            <Footer>
                <Button title="" />
            </Footer>
        </Container>
    )
}