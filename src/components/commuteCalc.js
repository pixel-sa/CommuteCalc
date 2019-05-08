import React, { useState, useEffect } from 'react';
import Vehicle from './vehicle';

const CommuteCalc = () => {
    const [vehicleMpg, setVehicleMpg] = useState(0);
    const [gasPrices, setGasPrices] = useState(null);
    const [costPerMile, setCostPerMile] = useState(0);

    useEffect(() => {
        getGasPrices().then(resp => console.log(resp) || setGasPrices(resp));
    }, []);

    useEffect(() => {
        if (gasPrices && vehicleMpg) {
            console.log('doin it BIIIGG!!!');
            const data = gasPrices.regular / vehicleMpg;
            console.log(data);
            setCostPerMile(data);
        }
    }, [vehicleMpg, gasPrices]);

    return (
        <>
            <Vehicle setVehicleMpg={setVehicleMpg} />
            <p>
               Gas Price {gasPrices && gasPrices.regular} divided by {vehicleMpg} MPG equals ${costPerMile} cost per mile
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
