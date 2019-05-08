import React, { useState } from 'react';
import VehicleSelector from './vehicleSelector';

const CommuteCalc = () => {
    const [vehicleId, setVehicleId] = useState(null);
    return (
        <>
            <VehicleSelector setVehicleId={setVehicleId} />
            <p>{vehicleId && 'vehicle id# ' + vehicleId}</p>
        </>
    );
};

export default CommuteCalc;
