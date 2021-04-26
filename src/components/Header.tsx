import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    Image
} from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/profile.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '')
        }
        loadStorageUserName();
    }, [])
    return (
        <Container>
            <View>
                <Greeting>Olá,</Greeting>
                <UserName>{userName}</UserName>
            </View>
            <StyledImage source={userImg} />
        </Container>
    )
}
const marginTop = getStatusBarHeight;
const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: ${marginTop}px;
`;
const StyledImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
`;
const Greeting = styled.Text`
    font-size: 32px;
    color: ${colors.heading};
    font-family: ${fonts.text};
`;
const UserName = styled.Text`
    font-size: 32px;
    color: ${colors.heading};
    font-family: ${fonts.heading};
    line-height: 40px;
`;