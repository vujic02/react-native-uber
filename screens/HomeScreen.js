import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import tw from "tailwind-react-native-classnames"
import NavOptions from '../components/NavOptions'
import {API_KEY} from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux'
import {setOrigin, setDestination} from "../slices/navSlice"
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {

  const dispatch = useDispatch();
  

  return (
    <View style={tw`bg-white h-full mt-8`}>
      <View style={tw`p-5`}>
        <Image style={{width: 100, height: 100, resizeMode: "contain"}} source={{uri: "https://links.papareact.com/gzs"}} />
        <GooglePlacesAutocomplete 
        styles={{container: {
          flex: 0,
        },
        textInput: {
          fontSize: 18,
        }}} 
        nearbyPlacesAPI="GooglePlacesSearch" 
        debounce={400} 
        placeholder="Where from?"
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        query={{key: API_KEY, language: "en"}}
        onPress={(data, details = null) => {
          dispatch(setOrigin({
            location: details.geometry.location,
            description: data.description
          }));

          setDestination(null)
        }}
        returnKeyType={"search"}
         />
        <NavOptions />
        <NavFavourites />
      </View>
    </View>
  )
}

export default HomeScreen

