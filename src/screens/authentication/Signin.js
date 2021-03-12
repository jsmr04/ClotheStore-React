import React from "react";
import { ActivityIndicator, Text, View, StyleSheet, FlatList, Dimensions, StatusBar } from "react-native";
import theme from "../theme";

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
    backgroundColor: theme.COLORS.WHITE,
  },
});

//Screen
export default ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.PRIMARY}></StatusBar>
      <View>
          <Text>Sign In Test </Text>
      </View>
    </View>
  );
};
