import React from "react";
import { ActivityIndicator, View, StyleSheet, FlatList, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import fetchData from "../../backend/FetchData";
import Card from "../../components/Card";
import Block from "../../components/Block";
import theme from "../theme";
import Util from "../../helpers/Util"

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
  },
  list: {
    marginTop: 5,
    alignSelf: "stretch",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor:'white'
  },
  cardImage: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    
  },
  activity: {
    position:'absolute', 
    top: Dimensions.get('window').height / 2 , 
    right: Dimensions.get('window').width / 2 - 20
  }
});

//Screen
export default ({navigation}) => {
  let { loading, data: products } = fetchData("product/");

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.PRIMARY}></StatusBar>
      { loading ? 
        <ActivityIndicator style={styles.activity}  size='large' color = { theme.COLORS.PRIMARY } />  
      : 
      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => {
          return (
            <Block space='between' >
              <Card
                style={styles.card}
                flex
                borderLess
                shadowColor={theme.COLORS.BLACK}
                title={item.name}
                favoriteIcon="heart-outline"
                location={'C' + Util.formatter.format(item.price)}
                imageStyle={styles.cardImage}
                image={item.pictures[0].url}
                onPress={() => {
                  navigation.navigate('item', {
                    item: item,
                  });
                }}
              />
            </Block>
          );
        }}
      />
    }
    </View>
  );
};
