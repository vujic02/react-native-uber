import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import tw from "tailwind-react-native-classnames"
import NavOptions from '../components/NavOptions'
import {API_KEY} from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const HomeScreen = () => {
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
        query={{key: "AIzaSyBrIdQ0nyaL7WTVWZbwCT4wEoUEMQoZqbA", language: "en"}}
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details)
        }}

         />
        <NavOptions />
      </View>
    </View>
  )
}

export default HomeScreen

