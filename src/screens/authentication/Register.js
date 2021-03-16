import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Animated, Text, Image, TouchableOpacity} from "react-native";
import { Input, Header, Button, Icon } from "./registerstyles";

const { height } = Dimensions.get("screen");

export default function App() {
  const [alignment, setAlignment] = useState(new Animated.Value(0));

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
          <Header title="Create Account"/>
        </View>
        <View>
          <Input icon="md-person" placeholder="First Name" />
          <Input icon="md-person" placeholder="Last Name" />
          <Input icon="md-mail" placeholder="Email" />
          <Input icon="key" placeholder="Password" />
          <Input icon="key" placeholder="Confirm Password" />
        </View>
        <Button onPress={() => toDocumentsPage()} title="Create Account" />
        
        <Text>© Team South - 2021</Text>
      </Animated.View>
      <Animated.View style={[styles.mainContainer, documentContainerStyle]}>
        <Icon
          name="chevron-left"
          onPress={() => backToMainComponent()}
          size={30}
        />
        <View style={{ width: "100%" }}>
          <Header
            title="Personal Information"
          />
        </View>
        <View>
          <Input icon="md-person" placeholder="First Name" />
          <Input icon="md-person" placeholder="Last Name" />
          <Input icon="mail" placeholder="Email address" />
          <Input icon="ios-home" placeholder="Address" />
        </View>
        <Button title="NEXT" />
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
