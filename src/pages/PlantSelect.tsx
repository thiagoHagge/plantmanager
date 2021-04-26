import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import styled from 'styled-components/native';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
    key: string;
    title: string;
}

interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    }
}

export function PlantSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

    function  handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        if (environment == 'all') 
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        )

        setFilteredPlants(filtered)
        
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }
        setLoadingMore(true);
        setPage(oldValue =>oldValue + 1)
        fetchPlants()
    }

    async function fetchPlants(){
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true)
        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data)
            setFilteredPlants(data)
        }
        setLoading(false);
        setLoadingMore(false);
    }

    useEffect(() => {
        async function fetchEnvironment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }
        fetchEnvironment();
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])
    if(loading)
        return <Load />
    return (
        <Container>
            <View style={{ paddingHorizontal: 30 }}>
                <Header />
                <Title>
                    Em qual ambiente
                </Title>
                <Subtitle>
                    você que colocar sua planta?
                </Subtitle>
            </View>
            <View>
                <FlatList 
                    data ={environments}
                    renderItem={({ item }) => (
                        <EnvironmentButton 
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}  
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <Plants>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({item}) => (
                        <PlantCardPrimary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} /> 
                        : <></>
                    }
                />
            </Plants>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: ${colors.background};
`;
const Title = styled.Text`
    font-size: 17px;
    color: ${colors.heading};
    font-family: ${fonts.heading};
    line-height: 20px;
    margin-top: 15px;
`;
const Subtitle = styled.Text`
    font-size: 17px;
    color: ${colors.heading};
    font-family: ${fonts.text};
    line-height: 20px;
`;
const Plants = styled.View`
    flex: 1;
    padding-left: 32px;
    padding-right: 32px;
    justify-content: center;
`;
const styles = StyleSheet.create({
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    }
})
