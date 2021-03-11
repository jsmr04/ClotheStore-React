import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop:45,
    },
    searchContainer:{
        backgroundColor: 'transparent', 
        borderWidth: 0.2,
    }

})

export default () => {
    const [searchText, setSearchText] = useState('')
    return (
        <View style = { styles.container }>
            <SearchBar style = {{ borderWidth: 0.1 }}
                containerStyle = { styles.searchContainer }
                inputContainerStyle = {{ backgroundColor: 'transparent' }}
                placeholder = { 'Find products...' }
                value = { searchText }
                onChangeText = { (text)=> setSearchText(text) }
                showCancel = { true }
                searchIcon = {{ size:24 }}
                cancelIcon = {{ size:24 }}
            />
        </View>
    )
}