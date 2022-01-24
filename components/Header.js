import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import Constant from "../constants/colors"
import TitleText from './TitleText';
import colors from '../constants/colors';

const Header = ({ title }) => {
    return <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}     >

        <TitleText style={styles.headerTitle}>{title}</TitleText>
        {/* <Text style={styles.headerTitle}>{title}</Text> */}


    </View>
}

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center"
    },
    headerIOS: {
        backgroundColor: "#eee"

    },
    headerAndroid: {
        // backgroundColor: Platform.OS === "android" ? Constant.accent : "#eee",
        backgroundColor: colors.accent

    },
    headerTitle: {
        color: Platform.OS === "android" ? "white" : colors.accent,

    }
})
export default Header