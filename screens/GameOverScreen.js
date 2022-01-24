import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";


const GameOverScreen = ({ usernumber, rounds, restartGame }) => {
    return <ScrollView>


        <View style={styles.screen}>

            <TitleText >GAME OVER</TitleText>
            <View style={styles.ImageContainer}>
                <Image

                    fadeDuration={300}
                    source={{ uri: "https://media.istockphoto.com/photos/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-is-picture-id1281804798?b=1&k=20&m=1281804798&s=170667a&w=0&h=HIWbeaP_cQSngCz7l9t3xwyE2eyzVgIy3K6xIqPhJQA=" }} style={styles.image} resizeMode="cover" />
                {/* <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" /> */}

            </View>
            <BodyText style={styles.SuccessText}> Correctly Guessed <Text style={styles.highlight}>{usernumber}</Text>. finished in <Text style={styles.highlight}>{rounds}</Text> rounds</BodyText>

            <View style={styles.buttonView}>

            </View>
            <MainButton onPress={restartGame}> START A NEW GAME</MainButton>

        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center'
    },
    buttonView: {
        marginVertical: 10,

    },

    ImageContainer: {
        width: Dimensions.get("window").width * .70,
        height: Dimensions.get("window").width * .70,
        borderRadius: Dimensions.get("window").width * .70 * .5,
        borderColor: "black",
        borderWidth: 1,
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 30,
    },
    highlight: {
        color: colors.accent,
        fontFamily: "open-sans-bold"
    },
    SuccessText: {
        marginVertical: Dimensions.get("window").height / 60,
        fontSize: Dimensions.get("window").height < 400 ? 16 : 20

    },
    image: {

        width: "100%",
        height: "100%"

    }
})

export default GameOverScreen;