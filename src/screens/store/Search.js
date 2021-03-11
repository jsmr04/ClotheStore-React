import theme from '../theme';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'
import TopBar from "../../components/TopBar"
import TabOptions from "../../components/TabOptions"

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    searchContainer:{
        backgroundColor: 'transparent', 
        borderTopColor: 'transparent', 
        borderBottomColor: 'transparent',
    },
    tabContainer:{
        flexDirection: 'row',
        justifyContent:'center'
    },
    tabText:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Helvetica',
    },
    tabHighlight:{
        marginTop:5,
        height:5,
        width:'100%',
    },
    tabTouchable:{
        flex:1,
        marginHorizontal:3,
    }
})

export default () => {
    const [searchText, setSearchText] = useState('')
    //Options configuration
    const [ tabOptions, setTabOptions ] = useState([ 
        {key: 0, name:'Women', checked:true, onPress: () => {}}, 
        {key: 1, name:'Men', checked:false, onPress: () => {}}, 
        {key: 2, name:'Kids', checked:false, onPress: () => {}}, 
    ])
    
    //Check option onPreess event
    const checkOption = (key) => {
        let newTabOptions = []

        tabOptions.forEach(x => {
            if (x.key == key){
                x.checked = true
            }else{
                x.checked = false
            }
            newTabOptions.push(x)
        })

        setTabOptions(newTabOptions)
    }

    //Assign function
    useEffect(()=>{
        let newTabOptions = []
        tabOptions.forEach(x => {
            //onPress function
            x.onPress = checkOption
            newTabOptions.push(x)
        })

        setTabOptions(newTabOptions)
    }, [])
    
    return (
        <View style = { styles.container }>
            <TopBar />
            <SearchBar 
                containerStyle = { styles.searchContainer }
                inputContainerStyle = {{ backgroundColor: 'transparent' }}
                placeholder = { 'Find products...' }
                value = { searchText }
                onChangeText = { (text)=> setSearchText(text) }
                showCancel = { true }
                searchIcon = {{ size:24 }}
                cancelIcon = {{ size:24 }}
            />
            <TabOptions
                options = { tabOptions }
                highlightColor = { theme.COLORS.PRIMARY  }
                titleColor = { theme.COLORS.TITLE }
            />        
        </View>
    )
}