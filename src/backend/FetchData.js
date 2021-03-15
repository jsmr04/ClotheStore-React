import { useState, useEffect } from "react";
import FirebaseConfig from "./FirebaseConfig";

export default (path) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  const getDataFromFirebase = () => {
    let tmpData = [];
    //Init Firebase
    const firebase = FirebaseConfig();
    //Database
    const productRef = firebase.database().ref(path).limitToFirst(5);
    //Storage
    const storageRef = firebase.storage().ref('pictures'); 

    //Get data from Firebase
    productRef.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        tmpData.push(childSnapshot.val());
      });

      //Update states
      setLoading(false);
      setData(tmpData);
    });
  };

//   console.log('DATA')
//   console.log(data)
  return { loading, data };
};
