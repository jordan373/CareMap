import React, { useState } from 'react';
import { Text,  StyleSheet, View, ImageBackground} from 'react-native';
import SearchBar from '../components/SearchBar'
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import {YellowBox} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, SafeAreaView } from 'react-native-gesture-handler';
import {color} from "react-native-reanimated";

const SearchScreen = ({ }) => {
    // 'term' is the what we will search the Yelp API with
    const [term, setTerm] = useState(''); 
    const  [searchAPI, results, errorMessage] = useResults();

    const filterResultsByterm = (term) => {
        return results.filter(result => {
            return result.categories.alias === term;
        });
    };
    YellowBox.ignoreWarnings(['Warning: ...']);
    console.disableYellowBox = true;
    return ( 
        <View style = {styles.container}>
            <View style={styles.container}>
            <SearchBar
            term ={term}
            onTermChange={(newTerm) => setTerm(newTerm)}
            onTermSubmit={() => searchAPI(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            </View>
            <ScrollView>
            <ResultsList
                results ={filterResultsByterm()}
            /> 
            </ScrollView>
        </View>
    );
};

SearchScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Components')}>
            <FontAwesome name = "child" size={37} style={{color: '#ffdd59', right: 1}}/>
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffdd59',

    }, 
    bgImag: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
        color: 'white'
      },
}); 

// Jozzell Geo Location Function :: =>
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    };
    
    function success(pos){
      let crd = pos.coords;
    
      console.log('Your current positon is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err)
    {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  
export default SearchScreen;