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
  Pressable
} from "react-native";
import theme from "../screens/theme";

//Screen Style
const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingTop: 20,
    paddingVertical: 35,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  modalButton: {
    marginVertical:15,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-evenly",
  },
  top: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  button:{
    borderRadius:10,
    width:90, 
    paddingHorizontal:15,
    paddingVertical:10,
    marginHorizontal:30,
    backgroundColor:theme.COLORS.PRIMARY,
    color: theme.COLORS.WHITE,
    textAlign: 'center',
  },
  divider:{
    borderWidth:0.2,
    backgroundColor:'#eee',
    width: Dimensions.get('window').width - 15,
    marginBottom: 10,
  }
});

export default ({ visible, children, title, onCancel, onSave }) => {
  return (
    <>
      <Modal visible={visible} animationType={"slide"} transparent={true}>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={styles.divider} />
              {children}
            <View style={styles.modalButton}>
              <Pressable onPress={onCancel}>
                <Text style={[styles.button, { backgroundColor: theme.COLORS.WARNING }]}>CANCEL</Text>
              </Pressable>
              <Pressable onPress={onSave}>
                <Text style={styles.button}>SAVE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
