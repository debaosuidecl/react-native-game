import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Button, Keyboard,
    TouchableWithoutFeedback, Alert, Dimensions, ScrollView, KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Constant from "../constants/colors"
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
const StartGame = ({ startGame }) => {
    const [enteredvalue, setenteredvalue] = useState("")
    const [confirmed, setconfirmed] = useState(false);
    const [selectednumber, setselectednumber] = useState(0);
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width)
    const resetinputhandler = () => {
        setenteredvalue("")
    }

    const updateLayout = () => {
        setButtonWidth(Dimensions.get("window").width)
    }
    Dimensions.addEventListener("change", updateLayout);
    const confirminputhandler = () => {

        const chosenNumber = parseInt(enteredvalue)

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            return Alert.alert('Invalid number!', 'Number has to be a number between 0 and 99', [{ text: "okay", style: "destructive", onPress: resetinputhandler }])
        }
        setconfirmed(true);

        setenteredvalue("");

        setselectednumber(chosenNumber)

    }
    const numberinputhandler = (inputtext) => {
        setenteredvalue(inputtext.replace(/[^0-9]/g, ""))
    }

    let confirmOutput;

    if (confirmed) {
        confirmOutput = <Card style={styles.summaryCont}>
            <Text style={styles.summaryTitle}>You Selected</Text>
            <NumberContainer>
                {selectednumber}
            </NumberContainer>
            <MainButton onPress={() => startGame(selectednumber)}>START GAME</MainButton>
        </Card>

        // return confirmOutput
    }
    return <ScrollView>

        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.screen}>
                    <TitleText >Start a new game!</TitleText >
                    <Card style={styles.inputContainer}>
                        <BodyText>Select a number</BodyText>
                        <Input style={styles.input} blurOnSubmit
                            autoCapitalization="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2
                            }
                            onChangeText={numberinputhandler}
                            value={enteredvalue}
                        />
                        <View style={{
                            ...styles.buttonContainer,
                            width: buttonWidth / 1.5
                        }}>
                            <View style={{
                                width: buttonWidth > 500 ? 200 : 90
                            }}>
                                <Button onPress={resetinputhandler} title="reset" color={Constant.accent} />
                            </View>
                            <View
                                style={{
                                    width: buttonWidth > 500 ? 200 : 90

                                }}>

                                <Button onPress={confirminputhandler} title="confirm" color={Constant.primary} />
                            </View>


                        </View>
                    </Card>
                    {confirmOutput}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ScrollView>
}
console.log(Dimensions.get("window").width)
const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    inputContainer: {
        width: "80%",
        minWidth: 300,
        marginTop: 50,
        maxWidth: "95%",
        // maxWidth: "80%",
        alignItems: "center",

    },

    input: {
        minWidth: "100%",
        // width: Dimensions.get("window").width / 3,

        textAlign: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold"
    },
    buttonContainer: {
        flexDirection: 'row',
        // width: "100%",
        // backgroundColor: "gree n",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        // width: Dimensions.get("window").width / 1.5
    },
    button: {
        // width: "40%"
        width: Dimensions.get("window").width > 500 ? 300 : 100 //Dimensions.get("window").width / 4.5

    },

    summaryCont: {
        marginTop: 20,
        alignItems: "center"
    },
    summaryTitle: {
        textAlign: "center",
    }


})
export default StartGame