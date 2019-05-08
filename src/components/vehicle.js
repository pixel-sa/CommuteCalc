import React, { useState, useEffect } from 'react';
import VehicleSelector from './vehicleSelector';

const Vehicle = ({ setVehicleMpg }) => {
    const [vehicleId, setVehicleId] = useState(null);
    const [vehicleData, setVehicleData] = useState();

    useEffect(() => {
        if (vehicleId) {
            getVehicleData(vehicleId).then(resp => {
                setVehicleData(resp);
                setVehicleMpg(resp.comb08);
            });
        }
    }, [vehicleId]);

    return <>{!vehicleData ? <VehicleSelector setVehicleId={setVehicleId} /> : <VehicleInfo vehicleData={vehicleData} />}</>;
};

const getVehicleData = vehicleId => {
    return fetch('https://www.fueleconomy.gov/ws/rest/vehicle/' + vehicleId, {
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

const VehicleInfo = ({ vehicleData }) => {
    const { make, model, comb08 } = vehicleData;
    return (
        <div>
            <h4>
                {make} {model}
            </h4>
            <p>
                Average a combined <strong>{comb08} MPG</strong>
            </p>
        </div>
    );
};

export default Vehicle;
