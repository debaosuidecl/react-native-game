import React from 'react';
import { Text, View, StyleSheet } from 'react-native'

import colors from "../constants/colors"

const NumberContainer = ({ number, children }) => {
    return <View style={styles.container}>

        <Text style={styles.number}  >{children}</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    number: {
        fontSize: 22,
        color: colors.accent
    }
})

export default NumberContainer;