import React from 'react';
import { 
  TouchableOpacity, 
  Image, 
  Text, 
  SafeAreaView,
  Dimensions,
  StyleSheet
} from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const Container = styled.SafeAreaView`
flex: 1;
`;

const Title = styled.Text`
font-size: 28px;
font-weight: bold;
text-align: center;
color: ${colors.heading};
margin-top: 38px;
font-family: ${fonts.heading};
line-height: 34px;
`;

const Subtitle = styled.Text`
font-size: 18px;
padding-left: 20px;
padding-right: 20px;
text-align: center;
color: ${colors.heading};
font-family: ${fonts.text};
`;

const imageHeight = Dimensions.get('window').width * 0.7;

const StyledImage = styled.Image`
height: ${imageHeight}px;
`;

const Button = styled.TouchableOpacity`
background-color: ${colors.green};
align-items: center;
justify-content: center;
border-radius: 16px;
margin-bottom: 10px;
height: 56px;
width: 56px;
`;

const Wrapper = styled.View`
flex: 1;
align-items: center;
justify-content: space-around;
padding-left: 20px;
padding-right: 20px;
`;

export function Welcome() {
  return (
    <Container>
      <Wrapper>

        <Title>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil         
        </Title>
        
        <StyledImage source={wateringImg} resizeMode="contain" />
        
        <Subtitle>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Subtitle>
        
        <Button activeOpacity={0.7}>
          <Feather 
            name="chevron-right" 
            style={styles.icon}
          />
        </Button>
      </Wrapper>
    </Container>
  )
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 32,
    color: colors.white
  }
});