import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import fetchData from "../../backend/FetchData";
import { Ionicons } from "@expo/vector-icons";
import Util from "../../helpers/Util";
import theme from "../theme";
import Storage from "../../backend/LocalStorage";
import { NavigationEvents } from "react-navigation";

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: theme.COLORS.WHITE,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 6,
    marginVertical: 6,
    borderWidth: 0.5,
    borderColor: theme.COLORS.TITLE,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  textContainer: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    paddingVertical: 6,
    paddingHorizontal: 3,
    justifyContent: "flex-start",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  activity: {
    position: "absolute",
    top: Dimensions.get("window").height / 2,
    right: Dimensions.get("window").width / 2 - 20,
  },
  textResults: {
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  addText: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "600",
    color: theme.COLORS.TITLE,
  },
  addTouch: {
    flex: 1,
    alignSelf: "flex-end",
    marginHorizontal: 3,
  },
  priceText: {
    textAlign: "left",
    fontWeight: "500",
    fontStyle: "italic",
    fontSize: 17,
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    flex: 10,
  },
  priceView: {
    flex: 1,
    flexDirection: "row",
  },
  nameText: {
    flexWrap: "wrap",
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 15,
    flex: 10,
  },
});

const checkItemExists = (data, id) => {
  return data.find((x) => x === id);
};

export default ({ navigation }) => {
  let { loading, data: products } = fetchData("product/");
  let [favoritesData, setFavoritesData] = useState([]);

  //Load favorites
  const loadFavorites = (payload) => {
    if (payload && payload.action.routeName === "Favorites") {
      showFavorites();
    }
  };

  const showFavorites = () => {
    let arrayFavorites = [];
    if (products.length > 0) {
      Storage.getIdsForKey("favorite").then((favorites) => {
        arrayFavorites = favorites;
        console.log("loadFavorites");
        console.log(arrayFavorites);

        setFavoritesData(
          products.filter((x) => checkItemExists(arrayFavorites, x.id))
        );

        console.log("Favorites Products");
        console.log(favoritesData);
      });
    }
  };

  const removeItem = (item) => {
    Storage.remove({
      key: "favorite",
      id: item.id,
    }).then(() => {
      console.log(`Item ${item.id} removed from favorites`);
      showFavorites();
    });
  };

  useEffect(() => {
    showFavorites();
  }, [products]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "ClotheStore",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("signin")}>
          <Ionicons
            name={"person"}
            size={25}
            color={theme.COLORS.WHITE}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderCard = (item) => {
    return (
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={{ uri: item.pictures[0].url }} />
        <View style={styles.textContainer}>
          {/* First line  */}
          <View style={styles.priceView}>
            <Text style={styles.priceText}>
              {`C${Util.formatter.format(item.price)}`}
            </Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Ionicons
                name={"trash"}
                size={20}
                color={theme.COLORS.TITLE}
                style={{ marginStart: 3, alignSelf: "center", flex: 1 }}
              />
            </TouchableOpacity>
          </View>

          {/* Second line */}
          <Text style={styles.nameText}>{item.name}</Text>

          {/* Third line */}
          <TouchableOpacity style={styles.addTouch}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1.5,
                borderColor: theme.COLORS.TITLE,
                padding: 3,
              }}
            >
              <Text style={styles.addText}>ADD TO CART</Text>
              <Ionicons
                name={"add-sharp"}
                size={20}
                color={theme.COLORS.TITLE}
                style={{ marginStart: 3, alignSelf: "center" }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={(payload) => loadFavorites(payload)} />
      {loading ? (
        <ActivityIndicator
          style={styles.activity}
          size="large"
          color={theme.COLORS.PRIMARY}
        />
      ) : (
        <>
          <View>
            <Text
              style={styles.textResults}
            >{`${favoritesData.length} FAVORITES`}</Text>
          </View>

          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={favoritesData}
            renderItem={({ item }) => renderCard(item)}
            keyExtractor={(x) => `${x.id}`}
          />
        </>
      )}
    </View>
  );
};
