import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import fetchData from "../../backend/FetchData";
import { Card, Block } from "galio-framework";
import theme from "../theme";

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginTop: 50,
    alignSelf: "stretch",
  },
  cardConatiner: {
    
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

  console.log(products);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => {
          return (
            <Block space='between' >
              {/* <Image style={{ width:'100%', height:200 }} source={{uri: item.pictures[0].url}}/>
                                                    <Text>{ item.name }</Text>  */}
              <Card
                style={styles.card}
                flex
                borderLess
                shadowColor={theme.COLORS.BLACK}
                title={item.name}
                avatar="http://i.pravatar.cc/100?id=skater"
                caption={String(item.price)}
                location={"Toronto, ON"}
                imageStyle={styles.cardImage}
                image={item.pictures[0].url}
              />
            </Block>
          );
        }}
      />
    </View>
  );
};
