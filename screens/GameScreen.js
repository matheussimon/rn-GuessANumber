import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Color from '../constants/colors';
import MButton from '../components/MButton';

const generateRandomBetween = (min,max,exclude) =>
{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if (rndNum === exclude)
    {
        return generateRandomBetween(min,max,exclude);
    }
    else{
        return rndNum;
    }
};

const listItems = (value, numOfRounds) =>
(
    <View key={value} style={styles.listItem}>
        <Text>#{numOfRounds}</Text>
        <Text>{value}</Text>
    </View>
)

const GameScreen = props => {
        const initialGuess = generateRandomBetween(1,100,props.userChoice);

        const [currentGuess,setCurrentGuess] = useState(initialGuess);
        const [pastGuesses, setPastGuesses] = useState([initialGuess]);
        const currentLow = useRef(1);
        const currentHigh = useRef(100);

        //pulling userChoice and gameOver out of props using Object Destructuring 
        const {userChoice, onGameOver} = props;

        useEffect(()=>{
            if (currentGuess === userChoice)
            {
                onGameOver(pastGuesses.length);
            }

        },[currentGuess,userChoice,onGameOver]);

        const nextGuessHandler = direction => {
            if((direction==='lower' && currentGuess < props.userChoice) || (direction==='greater' && currentGuess > props.userChoice))
            {
                Alert.alert('Don\'t lie', 'You know that this is wrong...', [{text:'Sorry!',style:'cancel'}]);
                return;
            }
            if(direction ==='lower')
            {
                currentHigh.current = currentGuess;
            }else{
                currentLow.current = currentGuess + 1;
            }
            const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
            setCurrentGuess(nextNumber);
            //setRounds(curRounds => curRounds+1);
            setPastGuesses(curPastGuesses => [nextNumber,...curPastGuesses])

        };


        return(
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MButton onPress={nextGuessHandler.bind(this,'lower')}> <Ionicons name='md-remove' size={24} color="white"/> </MButton>
                    <MButton onPress={nextGuessHandler.bind(this,'greater')}><Ionicons name='md-add' size={24} color="white"/> </MButton>
                </Card>
                <View style={styles.list}>
                    <ScrollView>{pastGuesses.map((guess,index) => listItems(guess, pastGuesses.length - index))}</ScrollView>
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems: 'center'

    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    list:{
        //flex 1 allows the ScrollView to be Scrollable in Android
        flex:1,
        width:'80%',

    },
    listItem:{
        borderColor: 'gray',
        borderWidth: 1,
        padding: 15,
        marginVertical:10,
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent:'space-around'
    }
});

export default GameScreen;