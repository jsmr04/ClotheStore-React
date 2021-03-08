import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Screen Style
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

//Screen
export default () => {
    return (
        <View style = { styles.container }>
            <Text>I'm Home</Text>
        </View>
    )
}

