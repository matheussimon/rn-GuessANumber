import React from 'react';
import {View,Text,StyleSheet, Button, Image} from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <View style={styles.imageContainer}>
            <Image 
            source={require('../assets/Winner.png')} 
            style={styles.image}
            resizeMode="contain"/>
            </View>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="New Game" onPress={props.onRestart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height: '100%',
    },
    imageContainer:{
        width:'80%',
        height:200,
        borderRadius:200,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical: 30,
    }
});

export default GameOverScreen;