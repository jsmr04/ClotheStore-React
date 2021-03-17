import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import theme from "../theme";
import fetchData from "../../backend/FetchData";
import { NavigationEvents } from "react-navigation";
import Storage from "../../backend/LocalStorage";
import Util from "../../helpers/Util";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  headerContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: theme.COLORS.TITLE,
  },
  totalItemsText: {
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 16,
  },
  totalAmountText: {
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 24,
    fontStyle: "italic",
    paddingVertical: 4,
  },
  taxText: {
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 16,
    fontStyle: "italic",
  },
  shippingText: {
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 16,
    fontStyle: "italic",
  },
  rowView: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  labelView: {
    fontWeight: "500",
    fontStyle: "normal",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 6,
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
  textCard: {
    color: theme.COLORS.TITLE,
    fontSize: 20,
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
  },
  labelCard: {
    fontWeight: "900",
    fontSize: 20,
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
  },
});

const SHIPPING_FEE = 9.99;
const TAX_RATE = 0.13;

export default ({ navigation }) => {
  let { loading, data: products } = fetchData("product/");
  let [cartData, setCartData] = useState([]);
  let [taxAmount, setTaxAmount] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);

  const checkItemExists = (data, id) => {
    return data.find((x) => x.item === id);
  };

  //Load Cart
  const loadCart = (payload) => {
    if (payload && payload.action.routeName === "Cart") {
      showCart();
    }
  };

  const showCart = () => {
    let cartProducts = [];

    if (products.length > 0) {
      Storage.getAllDataForKey("cart").then((cartList) => {
        console.log("- products -");
        console.log(products);

        cartList.forEach((x) => {
          let product = products.filter((p) => p.id == x.item)[0];
          cartProducts.push({
            key: x.item + "-" + x.size,
            quantity: x.quantity,
            size: x.size,
            id: product.id,
            name: product.name,
            price: product.price,
            pictures: product.pictures,
            name: product.name,
          });
        });
        console.log("- cartProducts -");
        console.log(cartProducts);

        setCartData(cartProducts);

        console.log("-Cart-");
        console.log(cartData);
      });
    }
  };

  const removeItem = (item) => {
    Storage.remove({
      key: "cart",
      id: item.key,
    }).then(() => {
      console.log(`Item ${item.id} removed from cart`);
      showCart();
    });
  };

  const calculateTotals = () => {
    if (cartData.length > 0) {
      //Calculate tax
      setTaxAmount(
        cartData.reduce((sum, x) => {
          sum += x.quantity * x.price * TAX_RATE;
          return sum;
        }, 0)
      );

      //Calculate total amount
      setTotalAmount(
        cartData.reduce((sum, x) => {
          sum += x.quantity * x.price * (1 + TAX_RATE);
          return sum;
        }, 0) + SHIPPING_FEE
      );
    }else{
      setTaxAmount(0);
      setTotalAmount(0);
    }
  };

  useEffect(() => {
    console.log("calculateTotals()");
    calculateTotals();
  }, [cartData]);

  useEffect(() => {
    showCart();
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textCard}>Qty:</Text>
                <Text style={styles.textCard}>{item.quantity}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textCard}>Size:</Text>
                <Text style={styles.textCard}>{item.size}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onDidFocus={(payload) => loadCart(payload)} />
      <View style={styles.headerContainer}>
        <Text style={styles.totalItemsText}>{`${cartData.length} ITEMS`}</Text>
        <Text style={styles.totalAmountText}>
          C${Util.formatter.format(totalAmount)}
        </Text>

        <View style={styles.rowView}>
          <Text style={[styles.taxText, styles.labelView]}>Tax: </Text>
          <Text style={styles.taxText}>
            C${Util.formatter.format(taxAmount)}
          </Text>
        </View>

        <View style={styles.rowView}>
          <Text style={[styles.shippingText, styles.labelView]}>
            Shipping Fee:
          </Text>
          <Text style={styles.shippingText}>
            {cartData.length > 0
              ? `C${Util.formatter.format(SHIPPING_FEE)}`
              : `C$0.00`}
          </Text>
          <FontAwesome
            style={{ marginHorizontal: 6 }}
            name={"truck"}
            size={20}
            color={theme.COLORS.WARNING}
          />
        </View>
      </View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={cartData}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(x) => `${x.key}`}
      />
    </View>
  );
};
