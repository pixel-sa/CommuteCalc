import React, { useState, useEffect } from 'react';
import { googleApiKey } from '../config';
import Script from 'react-load-script';

const Trip = ({ setDistance }) => {
    const [startingAddress, setStartingAddress] = useState();
    const [destinationAddress, setDestinationAddress] = useState();

    const startAutoCompleteEvent = startingLoc => {
        let addressObject = startingLoc.getPlace();
        console.log(addressObject);
        setStartingAddress(addressObject.formatted_address);
    };

    const destAutoCompleteEvent = destinationLoc => {
        let addressObject = destinationLoc.getPlace();
        console.log(addressObject);
        setDestinationAddress(addressObject.formatted_address);
    };

    const bindPlacesListenersToInputs = () => {
        /*global google*/ // To disable any eslint 'google not defined' errors
        const startingLoc = new google.maps.places.Autocomplete(document.getElementById('startingLoc'));
        const destinationLoc = new google.maps.places.Autocomplete(document.getElementById('destinationLoc'));
        startingLoc.addListener('place_changed', () => startAutoCompleteEvent(startingLoc));
        destinationLoc.addListener('place_changed', () => destAutoCompleteEvent(destinationLoc));
    };

    useEffect(() => {
        if (startingAddress && destinationAddress) {
            const directionsService = new google.maps.DirectionsService();
            const request = {
                origin: startingAddress,
                destination: destinationAddress,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, (result, status) => {
                console.log(status);
                console.log(result);
                if (status === 'OK') {
                    setDistance(result.routes[0].legs[0].distance);
                }
            });
        }
    }, [startingAddress, destinationAddress]);

    return (
        <>
            <Script
                url={'https://maps.googleapis.com/maps/api/js?key=' + googleApiKey + '&libraries=places'}
                onLoad={bindPlacesListenersToInputs}
            />
            <input type="text" name="startingLoc" id="startingLoc" placeholder="Enter your start location" />
            <input type="text" name="destinationLoc" id="destinationLoc" placeholder="Enter your destination location" />
        </>
    );
};

export default Trip;
