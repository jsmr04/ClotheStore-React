import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import fetchData from '../../backend/FetchData';

//Screen Style
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list:{
        marginTop: 50,
        alignSelf:'stretch'
    }
})

//Screen
export default () => {
    const { loading, data: products } = fetchData('product/')

    return (
        <View style = { styles.container }>
            <FlatList style = { styles.list }
                data = { products }
                keyExtractor={(x) => x.id}
                renderItem = {({ item }) => ( <Text>{ item.name }</Text> ) }
            />
        </View>
    )
}

