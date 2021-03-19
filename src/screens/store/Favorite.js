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
  Modal,
  Button,
} from "react-native";
import fetchData from "../../backend/FetchData";
import { Ionicons } from "@expo/vector-icons";
import Util from "../../helpers/Util";
import theme from "../theme";
import Storage from "../../backend/LocalStorage";
import { NavigationEvents } from "react-navigation";
import TabOptions from "../../components/TabOptions";
import Toast from "react-native-toast-message";
import firebase from "firebase";
import CustomModal from "../../components/CustomModal";

const checkItemExists = (data, id) => {
  return data.find((x) => x === id);
};

export default ({ navigation }) => {
  let { loading, data: products } = fetchData("product/");
  let [favoritesData, setFavoritesData] = useState([]);
  let [modalVisibility, setModalVisibility] = useState(false);
  let [selectedItem, setSelectedItem] = useState({});

  /* SIZE CONFIGURATION */
  //Options
  const [tabOptions, setTabOptions] = useState([
    { key: 0, name: "XS", checked: false, onPress: () => {}, disable: true },
    { key: 1, name: "S", checked: false, onPress: () => {}, disable: true },
    { key: 2, name: "M", checked: false, onPress: () => {}, disable: true },
    { key: 3, name: "L", checked: false, onPress: () => {}, disable: true },
    { key: 4, name: "XL", checked: false, onPress: () => {}, disable: true },
    { key: 5, name: "2XL", checked: false, onPress: () => {}, disable: true },
  ]);

  //Check option onPreess event
  const checkOption = (key) => {
    let newTabOptions = [];

    tabOptions.forEach((x) => {
      if (x.key == key) {
        x.checked = true;
      } else {
        x.checked = false;
      }
      newTabOptions.push(x);
    });
    setTabOptions(newTabOptions);
  };
  let userRoute;

  //Assign function
  useEffect(() => {
    let newTabOptions = [];
    tabOptions.forEach((x) => {
      //onPress function
      x.onPress = checkOption;
      newTabOptions.push(x);
    });

    setTabOptions(newTabOptions);
  }, []);
  /* END SIZE CONFIGURATION */

  /* FAVORITES */
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

        setFavoritesData(
          products.filter((x) => checkItemExists(arrayFavorites, x.id))
        );
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

  /* END FAVORITES */

  /* CART */
  const addToCart = async () => {
    let newQty = 0;
    let selectedSize = tabOptions.filter((x) => x.checked)[0].name;
    
    console.log("- NEW CART ITEM -");
    console.log(selectedItem.id + "-" + selectedSize);

    let currentCartData = await Storage.getAllDataForKey("cart");
    let currentCartItem = currentCartData.filter(
      (x) => x.item == selectedItem.id && x.size == selectedSize
    )[0];

    console.log("- CURRENT CART ITEM -");
    console.log(currentCartItem);

    if (currentCartItem == undefined) {
      newQty = 1;
    } else {
      newQty = currentCartItem.quantity + 1;
    }

    console.log("- NEW CART ITEM -");
    console.log(selectedItem.id + "-" + selectedSize + "-" + newQty);

    if (selectedSize) {
      Storage.save({
        key: "cart",
        id: selectedItem.id + "-" + selectedSize,
        data: {
          item: selectedItem.id,
          size: selectedSize,
          quantity: newQty, //Default quantity
        },
      }).then(() => {
        Toast.show({
          text1: "Hello there! 👋",
          text2: "This item was added into the Cart!",
        });
      });
    }

    setModalVisibility(false);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  /** END CART*/

  /* MODAL */
  const showModal = (item) => {
    let newSizes = [];

    tabOptions.forEach((x) => {
      let size = x;
      if (item.size.filter((s) => s == size.name).length > 0) {
        size.disable = false;
      } else {
        size.disable = true;
      }
      newSizes.push(size);
    });

    console.log("- newSizes -");
    console.log(newSizes);

    setTabOptions(newSizes);
    setModalVisibility(true);

    //Selected item
    setSelectedItem(item);
  };
  /** END MODAL */

  /** HEADER */
  React.useLayoutEffect(() => {
    checkAuth();
    navigation.setOptions({
      title: "ClotheStore",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(userRoute)}>
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
  /** END HEADER */

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userRoute = "account";
      } else {
        userRoute = "signin";
      }
    });
  };

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
          <TouchableOpacity
            style={styles.addTouch}
            //onPress={() => addToCart(item)}
            onPress={() => showModal(item)}
          >
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1.5,
                borderRadius: 5,
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
          <CustomModal
            title={"SIZE"}
            visible={modalVisibility}
            onCancel={() => hideModal()}
            onSave={() => addToCart()}
          >
            <TabOptions
              options={tabOptions}
              highlightColor={theme.COLORS.PRIMARY}
              titleColor={theme.COLORS.TITLE}
              activeColor={theme.COLORS.BLACK}
            />
          </CustomModal>

          <View>
            <Text
              style={styles.textResults}
            >{`${favoritesData.length} FAVORITES`}</Text>
          </View>
          <View style={styles.separator}/>
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

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: theme.COLORS.WHITE,
  },
  separator:{
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 6,
    borderWidth: 0.5,
    borderColor: theme.COLORS.TITLE,
    borderRadius: 5,
    backgroundColor: theme.COLORS.WHITE,

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
    paddingHorizontal: 10,
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
    color: theme.COLORS.PRIMARY,
    fontSize: 16,
    paddingHorizontal: 10,
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

  modalButton: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
});
