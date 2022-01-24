import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font'
import Header from "./components/Header"
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOverScreen from "./screens/GameOverScreen"
import AppLoading from "expo-app-loading"
import { useState } from 'react';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {
  const [usernumber, setusernumber] = useState(0)
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts}

      onError={(err) => console.log(err)}

      onFinish={() => setDataLoaded(true)} />
  }
  const startgamehandler = (selectedNumber) => {
    setusernumber(selectedNumber)
    setGuessRounds(0)
  }
  const gameoverhandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  const restartGameHandler = () => {
    setGuessRounds(0);
    setusernumber(0)
  }


  let content = <StartGame startGame={startgamehandler} />
  if (usernumber && guessRounds <= 0) {
    content = <GameScreen onGameOver={gameoverhandler} userchoice={usernumber} />
  }
  else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} usernumber={usernumber} restartGame={restartGameHandler} />
  }
  return (<SafeAreaView style={styles.screen}>

    <Header title="Guessing Game" />
    {content}


  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
