import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors';
import BodyText from '../components/BodyText';
const generateRandomBetween = (min, max, exclude) => {

    min = Math.ceil(min)
    max = Math.floor(max);
    const randNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    return randNumber;

}

const renderListItem = (value, index, numround) => {
    return <View key={index} style={styles.listItem} >
        <BodyText>#{numround}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
}
const GameScreen = ({ userchoice, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userchoice)
    const [currentguess, setcurrentguess] = useState(initialGuess);
    const [pastguesses, setpastguesses] = useState([initialGuess.toString()])

    useEffect(() => {
        if (currentguess == userchoice) {
            onGameOver(pastguesses.length)
        }
    }, [currentguess, userchoice, onGameOver])
    const currentLow = useRef(1);
    const currentHigh = useRef(100)
    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentguess < userchoice) || (direction === "greater" && currentguess > userchoice)) {
            Alert.alert("Don't lie", "You know that this is wrong", [{ text: "Sorry!", style: "Cancel" }])

            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentguess
            // generateRandomBetween()
        } else {

            currentLow.current = currentguess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentguess)

        setcurrentguess(nextNumber)
        setpastguesses((curpastguessues) => [nextNumber, ...curpastguessues])
    }
    return <View style={styles.screen}>
        <Text>
            Opponent's Guess
            </Text>

        <NumberContainer>{currentguess}</NumberContainer>

        <Card style={styles.buttonContainer}>
            <MainButton onPress={() => nextGuessHandler('lower')} > <Ionicons size={26} color="white" name="md-remove" /> </MainButton>
            <MainButton style={styles.buttonExtraStyle} onPress={() => nextGuessHandler('greater')} ><Ionicons size={26} color="white" name="md-add" /> </MainButton>
        </Card>

        <View style={styles.list}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {pastguesses.map((guess, i) => {
                    return renderListItem(guess, i, pastguesses.length - i)
                })}
            </ScrollView>
        </View>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 500,
        maxWidth: "90%"
    },
    buttonExtraStyle: {
        backgroundColor: colors.primary
    },
    scroll: {
        justifyContent: "flex-end",
        // paddingVertical: 20,
        flexGrow: 1,
    },
    list: {

        height: Dimensions.get("window").height / 1.7,
        minWidth: "80%",
        // backgroundColor: "green",
        // flexGrow: 1,
        // marginTop: 100


        // flex: 1,
        // flexDirection: 'column',
        // alignItems: "stretch",

        // backgroundColor: 'purple',
        // flex: 1,
        // justifyContent: "stretch"

    },
    listItem: {
        borderColor: "#eee",
        padding: 15,
        // backgroundColor: 'green',
        marginVertical: 10,
        // backgroundColor: "white",
        borderWidth: 1,
        // width: "100%",

        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default GameScreen