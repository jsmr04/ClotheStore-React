import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable
} from "react-native";
import theme from "../screens/theme";

export default ({ visible, children, title, onCancel, onSave }) => {
  
  return (
    <>
      <Modal visible={visible} animationType={"fade"} transparent={true} statusBarTranslucent={true} onRequestClose={visible}>
        <TouchableOpacity style={styles.modalCenteredView} activeOpacity={1} onPressOut={onCancel}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{title}</Text>
                <View style={styles.divider} />
                  {children}
                <View style={styles.modalButton}>
                  <Pressable onPress={onSave} style={styles.button}>
                    <Text style={styles.buttonText}>SAVE</Text>
                  </Pressable>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

//Screen Style
const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  modalButton: {
    width: Dimensions.get('window').width - 15,
    marginVertical:20,
  },
  button:{
    width: "100%",
    paddingVertical:13,
    backgroundColor:theme.COLORS.PRIMARY,
    borderRadius: 10,
  },
  buttonText: {
    color: theme.COLORS.WHITE,
    fontSize: 16,
    textAlign: 'center',
  },
  divider:{
    borderWidth:0.3,
    backgroundColor:theme.COLORS.PRIMARY,
    width: Dimensions.get('window').width - 15,
    marginVertical: 10
  }
});