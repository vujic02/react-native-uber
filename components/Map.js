import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from "tailwind-react-native-classnames"
import MapView, {Marker} from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import {selectDestination, selectOrigin, setTravelTimeInformation} from "../slices/navSlice"
import MapViewDirections from "react-native-maps-directions"
import {API_KEY} from "@env"

const Map = () => {

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!origin || !destination) return
    
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50,
      }
    })
  }, [origin, destination])

  useEffect(() => {
    if(!origin || !destination) return

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    }
    
    getTravelTime()

  }, [origin, destination, API_KEY])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin.description}
          destination={destination.description}
          apikey={API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Starting point"
          description={origin.description}
          identifier="origin"
          />
      )}
      {destination?.location && (
        <Marker 
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="End point"
          description={destination.description}
          identifier="destination"
          />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})
