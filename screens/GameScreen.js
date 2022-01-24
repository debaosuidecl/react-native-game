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
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height)
    useEffect(() => {
        if (currentguess == userchoice) {
            onGameOver(pastguesses.length)
        }
    }, [currentguess, userchoice, onGameOver])

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get("window").height)
            setAvailableDeviceWidth(Dimensions.get("window").width)
        }
        Dimensions.addEventListener("change", updateLayout)

        return () => Dimensions.removeEventListener('change', updateLayout)
    })

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

    if (availableDeviceHeight < 500) {
        return <View style={styles.screen}>
            <Text>
                Opponent's Guess
            </Text>

            <View style={styles.controls}>
                <MainButton onPress={() => nextGuessHandler('lower')} > <Ionicons size={26} color="white" name="md-remove" /> </MainButton>
                <NumberContainer>{currentguess}</NumberContainer>
                <MainButton style={styles.buttonExtraStyle} onPress={() => nextGuessHandler('greater')} ><Ionicons size={26} color="white" name="md-add" /> </MainButton>
            </View>
            <View style={{
                ...styles.list,
                // height: ava
                height: availableDeviceHeight / 2.2,
            }}>
                <ScrollView contentContainerStyle={styles.scroll}>

                    {pastguesses.map((guess, i) => {
                        return renderListItem(guess, i, pastguesses.length - i)
                    })}
                </ScrollView>
            </View>
        </View>
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

        <View style={{
            ...styles.list,
            // height: ava
            height: availableDeviceHeight / 1.7,
            // backgroundColor: "green"


        }}>
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
    controls: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',

        width: '50%',
        // backgroundColor: "green",
        // padding: 0,
    },
    list: {

        // height: Dimensions.get("window").height / 1.7,
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