import { useState, useEffect } from 'react';
import FirebaseConfig from './FirebaseConfig';

export default (path) => {
    let [data, setData] = useState([])
    let [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        let tmpData = []

        //Init Firebase
        const firebase = FirebaseConfig();
        const productRef = firebase.database().ref(path)

        //Get data from Firebase
        productRef.once("value", function (snapshot) {    
            snapshot.forEach(function (childSnapshot) {
                tmpData.push( childSnapshot.val() )
            })

            //Update states
            setLoading(false)
            setData(tmpData)  
            
            console.log('*** DATA ***')
            console.log(tmpData)
        })
    },[])

    return { loading, data }
}
