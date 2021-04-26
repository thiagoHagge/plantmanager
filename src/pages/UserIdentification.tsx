import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Touchable,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


const Container = styled.SafeAreaView`
flex: 1;
width: 100%;
align-items: center;
justify-content: space-around;
`;

const Content = styled.View`
flex: 1;
width: 100%;
`;

const Form = styled.View`
flex: 1;
justify-content: center;
padding-left: 54px;
padding-right: 54px;
align-items: center;
`;

const Emoji = styled.Text`
font-size: 44px;
`;

const StyledTextInput = styled.TextInput`
border-bottom-width: 1px;
border-color: ${colors.gray};
color: ${colors.heading};
width: 100%;
font-size: 18px;
margin-top: 50px;
padding: 10px;
text-align: center;
`;

const Title = styled.Text`
font-size: 24px;
line-height: 32px;
text-align: center;
color: ${colors.heading};
font-family: ${fonts.heading};
margin-top: 20px;
`;

const Footer = styled.View`
margin-top: 40px;
width: 100%;
padding-left: 20px;
padding-right: 20px;
`;

const Wrapper = styled.KeyboardAvoidingView`
flex: 1;
width: 100%;
align-items: center;
justify-content: space-around;
`;

const Header = styled.View`
align-items: center;
`;

export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value)
    }

    async function handleSubmit() {
        if(!name) {
            return Alert.alert('Me diz como chamar você 😢');
        }
        console.warn(String(name))
        await AsyncStorage.setItem('@plantmanager:user', name);    
        navigation.navigate("Confirmation");
    }

    return (
        <Container>
            <Wrapper
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Content>
                        <Form>
                            <Header>
                                <Emoji>
                                    {isFilled ? '😄' : '😀'}
                                </Emoji>
                                <Title>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Title>
                            </Header>
                            <StyledTextInput
                                style={(isFocused || isFilled) && { borderColor: colors.green }}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChange={handleInputChange}
                            />
                            <Footer>
                                <Button title="Confirmar" onPress={handleSubmit} />
                            </Footer>
                        </Form>
                    </Content>
                </TouchableWithoutFeedback>
            </Wrapper>
        </Container>
    )
}