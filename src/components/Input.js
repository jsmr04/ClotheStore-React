import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../screens/theme";
const { width, height } = Dimensions.get("screen");
TextInput.defaultProps.selectionColor = theme.COLORS.PRIMARY;

const Input = ({ icon, size, placeholder, onChangeText, keyboardType, secureEntry, textContentType, value }) => {
  const [inFocus, setInFocus] = useState(false);

  return (
    <View style={styles.container} onPress={() => setInFocus(true)}>
      <View style={styles.icon}>
        <Ionicons
          name={icon}
          style={{ color: "#555" }}
          size={size ? size : 22}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          textContentType={textContentType}
          keyboardType={keyboardType}
          secureTextEntry={secureEntry}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          style={{ fontSize: 18 }}
          placeholder={placeholder}
          placeholderTextColor="#555"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    width: width / 1.2,
    borderRadius: 15,
    marginVertical: 6,
  },
  icon: {
    flex: 0.1,
    padding: 15,
  },
  input: {
    flex: 0.8,
    padding: 14,
  },
});

export default Input;