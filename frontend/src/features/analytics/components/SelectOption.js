import React from 'react';

const SelectOption = ({ onSelectChange, selectedOption }) => {
    return (
        <select
            className="select select-primary w-full max-w-xs"
            onChange={onSelectChange}
            value={selectedOption}
        >
            <option disabled value="">
                Pilih Data
            </option>
            <option value="data-1-hour-ago">1 Jam yang Lalu</option>
            <option value="data-12-hours-ago">12 Jam yang Lalu</option>
            <option value="data-1-day-ago">1 Hari yang Lalu</option>
            <option value="data-1-week-ago">1 Minggu yang Lalu</option>
        </select>
    );
};

export default SelectOption;
