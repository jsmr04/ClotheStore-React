import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    }
})

export default () => {
    return (
        <View style = { styles.container }>
            <Text>I'm Checkout</Text>
        </View>
    )
}