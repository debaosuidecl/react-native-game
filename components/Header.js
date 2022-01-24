import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
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
        backgroundColor: Platform.OS === "android" ? Constant.accent : "#eee",
        borderBottomColor: Platform.OS === "ios" ? "#ccc" : 'transparent',
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        color: Platform.OS === "android" ? "white" : "black",

    }
})
export default Header