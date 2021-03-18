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
import CustomModal from "../../components/CustomModal";
import TabOptions from "../../components/TabOptions";
import firebase from "firebase";

const SHIPPING_FEE = 9.99;
const TAX_RATE = 0.13;

export default ({ navigation }) => {
  let { loading, data: products } = fetchData("product/");
  let [cartData, setCartData] = useState([]);
  let [taxAmount, setTaxAmount] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);
  let [qtyVisibility, setQtyVisibility] = useState(false);
  let [sizelVisibility, setSizeVisibility] = useState(false);
  let [selectedItem, setSelectedItem] = useState({});
  let userRoute;

  //Options - size
  const [tabSizeOptions, setTabSizeOptions] = useState([
    { key: 0, name: "XS", checked: false, onPress: () => {}, disable: true },
    { key: 1, name: "S", checked: false, onPress: () => {}, disable: true },
    { key: 2, name: "M", checked: false, onPress: () => {}, disable: true },
    { key: 3, name: "L", checked: false, onPress: () => {}, disable: true },
    { key: 4, name: "XL", checked: false, onPress: () => {}, disable: true },
    { key: 5, name: "2XL", checked: false, onPress: () => {}, disable: true },
  ]);

  //Options - quantity
  const [tabQtyOptions, setTabQtyOptions] = useState([
    { key: 0, name: "1", checked: false, onPress: () => {}, disable: false },
    { key: 1, name: "2", checked: false, onPress: () => {}, disable: false },
    { key: 2, name: "3", checked: false, onPress: () => {}, disable: false },
    { key: 3, name: "4", checked: false, onPress: () => {}, disable: false },
    { key: 4, name: "5", checked: false, onPress: () => {}, disable: false },
    { key: 5, name: "6", checked: false, onPress: () => {}, disable: false },
    { key: 6, name: "7", checked: false, onPress: () => {}, disable: false },
    { key: 7, name: "8", checked: false, onPress: () => {}, disable: false },
    { key: 8, name: "9", checked: false, onPress: () => {}, disable: false },
    { key: 9, name: "10", checked: false, onPress: () => {}, disable: false },
  ]);


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

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          userRoute = 'account'
        }else {
          userRoute = 'signin'
        }
    })
  }

  const checkItemExists = (data, id) => {
    return data.find((x) => x.item === id);
  };

  //Load Cart
  const loadCart = (payload) => {
    if (payload && payload.action.routeName === "Cart") {
      showCart();
    }
  };

  const showCart = (type) => {
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
            sizes: product.size,
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
    } else {
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
    //Storage.clearMapForKey('cart')
  }, [products]);

  

  /** MODAL */
  const showSizeModal = (item) => {
    let newSizes = [];

    tabSizeOptions.forEach((x) => {
      let size = x;
      //Disable size
      if (item.sizes.filter((s) => s == size.name).length > 0) {
        size.disable = false;
      } else {
        size.disable = true;
      }

      //Check size
      if (size.name === item.size) {
        size.checked = true;
      } else {
        size.checked = false;
      }

      newSizes.push(size);
    });

    console.log("- newSizes -");
    console.log(newSizes);

    setTabSizeOptions(newSizes);
    setSizeVisibility(true);

    //Selected item
    setSelectedItem(item);
  };

  const showQtyModal = (item) => {
    let newQuantities = [];
    console.log(item)

    tabQtyOptions.forEach((x) => {
      let qty = x;
      //Check qty
      if (qty.name === item.quantity) {
        qty.checked = true;
      } else {
        qty.checked = false;
      }

      newQuantities.push(qty);
    });

    setQtyVisibility(true);

    //Selected item
    setSelectedItem(item);
  };

  //Check option onPreess event
  const checkSizeOption = (key) => {
    let newTabOptions = [];

    tabSizeOptions.forEach((x) => {
      if (x.key == key) {
        x.checked = true;
      } else {
        x.checked = false;
      }
      newTabOptions.push(x);
    });
    setTabSizeOptions(newTabOptions);
  };

  const checkQtyOption = (key) => {
    let newTabOptions = [];

    console.log("checkQtyOption " + key);

    tabQtyOptions.forEach((x) => {
      if (x.key == key) {
        x.checked = true;
      } else {
        x.checked = false;
      }
      newTabOptions.push(x);
    });
    setTabQtyOptions(newTabOptions);
  };

  //Assign function
  useEffect(() => {
    //Sizes
    let newTabOptions = [];
    tabSizeOptions.forEach((x) => {
      //onPress function
      x.onPress = checkSizeOption;
      newTabOptions.push(x);
    });

    setTabSizeOptions(newTabOptions);

    //Quantities
    let newTabOptions2 = [];
    tabQtyOptions.forEach((x) => {
      console.log("tabQtyOptions ");
      console.log(x);
      //onPress function
      x.onPress = checkQtyOption;
      newTabOptions2.push(x);
    });

    setTabQtyOptions(newTabOptions2);
  }, []);

  const updateCart = async (type) => {
    if (type === "size") {
      let selectedSize = tabSizeOptions.filter((x) => x.checked)[0].name;
      console.log("- NEW CART ITEM -");
      console.log(selectedItem.id + "-" + selectedSize);
      console.log(selectedItem);

      let newQty = 0;
      let currentCartData = await Storage.getAllDataForKey("cart")
      let currentCartItem = currentCartData.filter(x => x.item == selectedItem.id && x.size == selectedSize)[0]
      
      if(currentCartItem != undefined){
        newQty = Number(currentCartItem.quantity) + Number(selectedItem.quantity);
      }else{
        newQty = selectedItem.quantity 
      }

      //First, remove the current item from cart
      Storage.remove({ key: "cart", id: selectedItem.key }).then(() => {
        Storage.save({
          key: "cart",
          id: selectedItem.id + "-" + selectedSize,
          data: {
            item: selectedItem.id,
            size: selectedSize,
            quantity: newQty, //Default quantity
          },
        }).then(() => {
          console.log("Item updated");
          setSizeVisibility(false);
          showCart();
        });
      });
    } else {
      let selectedQty = tabQtyOptions.filter((x) => x.checked)[0].name;
      Storage.save({
        key: "cart",
        id: selectedItem.key,
        data: {
          item: selectedItem.id,
          size: selectedItem.size,
          quantity: selectedQty, //New quantity
        },
      }).then(() => {
        console.log("Item updated");
        setQtyVisibility(false);
        showCart();
      });
    }
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity onPress={() => showQtyModal(item)}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textCard}>Qty:</Text>
                <Text style={styles.textCard}>{item.quantity}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showSizeModal(item)}>
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
        style = {styles.list}
        data={cartData}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(x) => `${x.key}`}
      />

      <View style={{ marginTop: 10, height:60 }}>
        <TouchableOpacity onPress={()=> navigation.navigate('checkout', {cartData: cartData})} style={[styles.button, styles.checkoutBuy]}>
          <Text style={[styles.buttonText, { color: theme.COLORS.WHITE }]}>
            <Ionicons
              name={"arrow-forward"}
              color={theme.COLORS.WHITE}
              style={styles.buttonIcon}
            />
            Go to Checkout
          </Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        title={"SIZE"}
        visible={sizelVisibility}
        onCancel={() => setSizeVisibility(false)}
        onSave={() => updateCart("size")}
      >
        <TabOptions
          options={tabSizeOptions}
          highlightColor={theme.COLORS.PRIMARY}
          titleColor={theme.COLORS.TITLE}
          activeColor={theme.COLORS.BLACK}
        />
      </CustomModal>

      <CustomModal
        title={"QUANTITY"}
        visible={qtyVisibility}
        onCancel={() => setQtyVisibility(false)}
        onSave={() => updateCart("quantity")}
      >
        {/* TODO: Implement pagination for quantities */}
        <TabOptions
          options={tabQtyOptions}
          highlightColor={theme.COLORS.PRIMARY}
          titleColor={theme.COLORS.TITLE}
          activeColor={theme.COLORS.BLACK}
        />
      </CustomModal>
    </View>
  );
};

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
  list:{

  },
  button: {
    height: 47,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems:'center',
    marginHorizontal:10,
  },
  buttonCart: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY
  },
  checkoutBuy: {
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  buttonText:{
    paddingLeft:10,
    flex:1,
    fontSize: 20,
    textAlignVertical: 'center',
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
  },
});