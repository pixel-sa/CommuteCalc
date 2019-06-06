import React, { useState, useEffect } from 'react';
import Vehicle from './vehicle';
import Trip from './trip';

const CommuteCalc = () => {
    const [vehicleMpg, setVehicleMpg] = useState(0);
    const [gasPrices, setGasPrices] = useState(null);
    const [costPerMile, setCostPerMile] = useState(0);
    const [tripDistance, setTripDistance] = useState(0);

    useEffect(() => {
        getGasPrices().then(resp => setGasPrices(resp));
    }, []);

    useEffect(() => {
        if (gasPrices && vehicleMpg) {
            const cost = gasPrices.regular / vehicleMpg;
            setCostPerMile(cost);
        }
    }, [vehicleMpg, gasPrices]);

    return (
        <>
            <Vehicle setVehicleMpg={setVehicleMpg} />
            <p>
                Gas Price {gasPrices && gasPrices.regular} divided by {vehicleMpg} MPG equals ${costPerMile} cost per mile
            </p>
            <Trip setDistance={setTripDistance} />
            <p>trip distance: {tripDistance && tripDistance.text}</p>
            <p>actual distance: {tripDistance && tripDistance.value / 1609.344}</p>
            <p>
                Gas cost for single trip:{' '}
                {tripDistance && costPerMile ? '$' + ((tripDistance.value / 1609.344) * costPerMile).toFixed(2) : '$0'}
            </p>
        </>
    );
};

const getGasPrices = () => {
    return fetch('https://www.fueleconomy.gov/ws/rest/fuelprices', {
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result) {
                return result;
            } else {
                return null;
            }
        });
};

export default CommuteCalc;
