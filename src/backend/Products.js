import { useState, useEffect } from "react";
import FirebaseConfig from "./FirebaseConfig";
import fetchData from "./FetchData";

const getProducts = async () => {
  const { loading, data } = fetchData('product/')
  const [ products, setProducts ] = useState([])
  const firebase = FirebaseConfig()
  const storageRef = firebase.storage().ref('pictures');
  let productList = []
  
  data.forEach(product => {
    product.pictures.forEach(async pic => {
        let url = await storageRef.child(pic).getDownloadURL();
        product.pictures.url = url
    });
    console.log(data);
    productList.push(product)
  }) 
    
  setProducts(productList)

  return { loading, productList }
  
};

export default getProducts