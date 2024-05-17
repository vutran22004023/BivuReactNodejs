import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function MyComponent({stateUserDetail}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.REACT_APP_API_URL_KEY_GOOGLE_MAP
  })
  const [coords, setCoords] = useState(null)
  useEffect (() => {
    // navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}}) => {
    //     setCoords({lat: latitude, lng: longitude})
    // })

    const getCoords = async() => {
        const results =  await geocodeByAddress(stateUserDetail?.specific_address)
        const latLng = await getLatLng(results[0])
        setCoords(latLng)
    }
    getCoords()
},[stateUserDetail])
  const containerStyle = {
    width: '100%',
    height: '300px'
  };
  
  const center = {
    lat: coords?.lat || 0,
    lng: coords?.lng || 0
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9.9}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            streetViewControl: false,
            mapTypeControl: false,
        }}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <MarkerF position={center}></MarkerF>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)