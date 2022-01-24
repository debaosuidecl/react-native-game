import React from 'react';

import { Button, StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import colors from '../constants/colors';




const MainButton = props => {
    let ButtonComponent = TouchableOpacity;

    if (Platform.OS == 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback
    }

    return <View style={styles.ButtonContainer}>

        <ButtonComponent onPress={props.onPress}>
            <View style={{ ...styles.button, ...props.style }}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </ButtonComponent>
    </View>
}

const styles = StyleSheet.create({
    ButtonContainer: {
        borderRadius: 15,
        overflow: 'hidden'
    }
    ,
    button: {
        backgroundColor: colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
        fontSize: 18
    }
})

export default MainButton