import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {API_KEY} from "@env"
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/core'

const NavigationCard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation()

  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-lg`}>Good Morning, Nikola</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete 
            placeholder="Where to?"
            styles={styles}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: API_KEY,
              language: "en"
            }}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description
              }))

              navigation.navigate("RideOptionsCard")
            }}

          />
        </View>
      </View>
    </View>
  )
}

export default NavigationCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  }
})
