import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constant from "../constants/colors"
import TitleText from './TitleText';

const Header = ({ title }) => {
    return <View style={styles.header}     >

        <TitleText style={styles.headerTitle}>{title}</TitleText>
        {/* <Text style={styles.headerTitle}>{title}</Text> */}


    </View>
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: Constant.accent,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        color: "white",

    }
})
export default Header