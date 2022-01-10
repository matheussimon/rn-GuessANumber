import React from 'react';
import {View,Text,StyleSheet, Button, Image} from 'react-native';
import Colors from '../constants/colors';
import MButton from '../components/MButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.resultText}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
            <Image 
            source={require('../assets/Winner.png')} 
            style={styles.image}
            resizeMode="contain"/>
            </View>
            <View style={styles.textContainer}>
            <Text style={styles.resultText}>Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></Text>
            <Text style={styles.resultText}>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></Text>
            </View>
            <MButton onPress={props.onRestart}>NEW GAME</MButton>
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
    resultText:{
        fontSize:20,
        textAlign:'center'
    },
    imageContainer:{
        width:'80%',
        height:200,
        borderRadius:200,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical: 30,
    },
    highlight:{
        color:Colors.primary
    },
    textContainer:{
        marginBottom:20,
    }
    
});

export default GameOverScreen;