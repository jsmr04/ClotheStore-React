import React from "react";
import { View, StyleSheet, Text, StatusBar, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import theme from "../screens/theme";

const styles = StyleSheet.create({
    topView: {
      height: 50,
      padding: 10,
      borderBottomWidth: 1,
      backgroundColor: theme.COLORS.PRIMARY,
      width:'100%'
    }
});

export default () => {
    return (
    <View>
        <SafeAreaView style={{backgroundColor: theme.COLORS.PRIMARY}}></SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.PRIMARY}></StatusBar>
        <View style={styles.topView}>
            <View style={{alignItems:"flex-start"}}>
                <Text style={{fontSize: 21, color: "#fff",}}>Clothe<Text style={{fontWeight: "700"}}>Store</Text></Text>
            </View>
            <View style={{alignItems:"flex-end", marginTop:-27}} onTouchStart={{}}>
                <Ionicons name = { 'person' } size = { 25 } color={theme.COLORS.WHITE}/>  
            </View>   
        </View>
    </View>
    )
}