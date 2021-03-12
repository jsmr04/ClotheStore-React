import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
    }
})

export default ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: 'ClotheStore',
          headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('signin')}>
                  <Ionicons name = { 'person' } size = { 25 } color={theme.COLORS.WHITE} style={{marginRight: 10}}/>  
              </TouchableOpacity>
          ),
        })
      }, [navigation]);

    return (
        <View style = { styles.container }>
            <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.PRIMARY}></StatusBar>
            <Text>I'm Favorite</Text>
        </View>
        
    )
}