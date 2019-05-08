import React, { useState, useEffect } from 'react';

const VehicleSelector = ({ setVehicleId }) => {
    const [year, setYear] = useState(null);
    const [make, setMake] = useState(null);
    const [model, setModel] = useState(null);

    const resetFields = changedInput => {
        switch (changedInput) {
            case 'year': {
                setMake(null);
                setModel(null);
                setVehicleId(null);
                console.log('haayyooo');
                break;
            }
            case 'make': {
                setModel(null);
                setVehicleId(null);
                break;
            }
            case 'model': {
                setVehicleId(null);
                break;
            }
            default: {
                console.log('Nada');
            }
        }
    };

    return (
        <>
            <YearsSelector setYear={setYear} setVehicleId={setVehicleId} resetFields={resetFields} />
            {year && <MakeSelector year={year} setMake={setMake} setVehicleId={setVehicleId} resetFields={resetFields} />}
            {make && <ModelSelector year={year} make={make} setModel={setModel} setVehicleId={setVehicleId} resetFields={resetFields} />}
            {model && <OptionSelector year={year} make={make} model={model} setVehicleId={setVehicleId} resetFields={resetFields} />}
        </>
    );
};

const YearsSelector = ({ setYear, resetFields }) => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        makeMenuQuery('year').then(response => setYears(response));
    }, []);

    return (
        <select
            name="year"
            id="year"
            onChange={e => {
                resetFields('year');
                setYear(e.target.value);
            }}>
            <option value="">Select a year</option>
            {years.map(year => (
                <option value={year.value} key={year.value}>
                    {year.text}
                </option>
            ))}
        </select>
    );
};

const MakeSelector = ({ year, setMake, resetFields }) => {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        setMakes([])
        makeMenuQuery('make?year=' + year).then(response => setMakes(response));
    }, [year]);

    return (
        <select
            name="make"
            id="make"
            onChange={e => {
                resetFields('make');
                setMake(e.target.value);
            }}>
            <option value="">Select a make</option>
            {makes.map(make => (
                <option value={make.value} key={make.value}>
                    {make.text}
                </option>
            ))}
        </select>
    );
};

const ModelSelector = ({ year, make, setModel, resetFields }) => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        makeMenuQuery('model?year=' + year + '&make=' + make).then(response => setModels(response));
    }, [year, make]);

    return (
        <select
            name="model"
            id="model"
            onChange={e => {
                resetFields('model');
                setModel(e.target.value);
            }}>
            <option value="">Select a model</option>
            {models.map(model => (
                <option value={model.value} key={model.value}>
                    {model.text}
                </option>
            ))}
        </select>
    );
};

const OptionSelector = ({ year, make, model, setVehicleId }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        makeMenuQuery('options?year=' + year + '&make=' + make + '&model=' + model).then(response => {
            console.log(response);
            if (Array.isArray(response)) {
                setOptions(response);
            } else {
                setOptions([]);
                setVehicleId(response.value);
            }
        });
    }, [year, make, model]);

    return (
        <>
            {options.length ? (
                <select name="options" id="options" onChange={e => setVehicleId(e.target.value)}>
                    <option value="">Select an option</option>
                    {options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            ) : null}
        </>
    );
};

function makeMenuQuery(query) {
    return fetch('https://www.fueleconomy.gov/ws/rest/vehicle/menu/' + query, {
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result && result.menuItem) {
                return result.menuItem;
            } else {
                return [];
            }
        });
}

export default VehicleSelector;
