import NodePressure from './components/nodeone/NodeTemperature'
import NodeHumidity from './components/nodeone/NodeHumidity'
import NodeTemperature from './components/nodeone/NodePressure'
import NodeAltitude from './components/nodeone/NodeAltitude'
import NodePressureTwo from './components/nodetwo/NodeTemperature'
import NodeHumidityTwo from './components/nodetwo/NodeHumidity'
import NodeTemperatureTwo from './components/nodetwo/NodePressure'
import NodeAltitudeTwo from './components/nodetwo/NodeAltitude'
import SelectOption from './components/SelectOption';
import React, { useState } from 'react';

function Analytics() {
    const [selectedOption, setSelectedOption] = useState('data-1-day-ago');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <SelectOption onSelectChange={handleSelectChange} selectedOption={selectedOption} />

            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-3">
                <NodeTemperature selectedOption={selectedOption} />
                <NodeHumidity selectedOption={selectedOption} />
                <NodePressure selectedOption={selectedOption} />
                <NodeAltitude selectedOption={selectedOption} />
            </div>
            <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-3">
                <NodeTemperatureTwo selectedOption={selectedOption} />
                <NodeHumidityTwo selectedOption={selectedOption} />
                <NodePressureTwo selectedOption={selectedOption} />
                <NodeAltitudeTwo selectedOption={selectedOption} />
            </div>
        </>
    )
}

export default Analytics