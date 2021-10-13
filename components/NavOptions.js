import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import tw from "tailwind-react-native-classnames"
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen"
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen"
  }
]

const NavOptions = () => {

  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);


  return (
    <FlatList 
      data={data}
      horizontal
      renderItem={({item}) => (
      <TouchableOpacity 
        onPress={() => navigation.navigate(item.screen)} 
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        disabled={!origin}
      >
        <View style={tw`${!origin && "opacity-20"}`}>
          <Image style={{width: 120, height: 120, resizeMode: 'contain'}} source={{uri: item.image}} />
          <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
          <AntDesign style={tw`p-2 mt-4 w-10 bg-black rounded-full`} name="arrowright" type="antdesign" color="white" size={24} />
        </View>
      </TouchableOpacity>)}
    />
  )
}

export default NavOptions

const styles = StyleSheet.create({})
