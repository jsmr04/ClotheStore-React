import React, { useState } from "react";
import { CheckBox, StyleSheet, View, Dimensions, Animated, Text} from "react-native";
import { Input, Header, Button, Icon } from "./registerstyles";

const { height } = Dimensions.get("screen");

export default function App() {
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [isSelected, setSelection] = useState(false);
  const toDocumentsPage = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const backToMainComponent = () => {
    Animated.timing(alignment, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const heightIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const opacityIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const documentPageOpacityIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const documentPageHeightIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const mainContainerStyle = {
    height: heightIntropolate,
    opacity: opacityIntropolate,
  };

  const documentContainerStyle = {
    height: documentPageHeightIntropolate,
    opacity: documentPageOpacityIntropolate,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mainContainer, mainContainerStyle]}>

        <View style={{ width: "100%" }}>
          <Header title="Please sign in"/>
        </View>
        <View>
          <Input icon="md-mail" placeholder="Email" />
          <Input icon="key" placeholder="Password" />
          <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Remember me</Text>
        </View>
        <Button title="Sign in" />
        <Text>Don't have an account?</Text>
        <Button title="Register" />
        
        <Text>© Team South - 2021</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },



});
