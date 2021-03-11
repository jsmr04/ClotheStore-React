import React from "react";
import { ActivityIndicator, View, StyleSheet, FlatList, Image } from "react-native";
import fetchData from "../../backend/FetchData";
import { Card, Block } from "galio-framework";
import theme from "../theme";
import Util from "../../helpers/Util"
import TopBar from "../../components/TopBar"

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
});

//Screen
export default () => {
  let { loading, data: products } = fetchData("product/");

  return (
    <View style={styles.container}>
      <TopBar/>
      { loading ? 
        <ActivityIndicator size='large' color = { theme.COLORS.PRIMARY } /> 
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
                caption={ 'C' + Util.formatter.format(item.price) }
                imageStyle={styles.cardImage}
                image={item.pictures[0].url}
              />
            </Block>
          );
        }}
      />
    }
    </View>
  );
};
