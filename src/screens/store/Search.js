import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from "../../components/TopBar"

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    }
})

export default () => {
    return (
        <View style = { styles.container }>
            <TopBar></TopBar>
            <Text>I'm Search</Text>
        </View>
    )
}