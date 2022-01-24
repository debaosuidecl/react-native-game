import React from 'react';

import { Button, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import colors from '../constants/colors';


const MainButton = props => {
    return <TouchableOpacity onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
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