import React, { Fragment } from 'react';

export default function Select(props) {
  const {
    label,
    onChange,
    options,
    selected,
  } = props;

  return (
    <label>
      {label}
      <select value={selected || ''} onChange={onChange}>
        <Fragment>
          <option key="" value="" />
          {options.map(({ label: optionLabel, value: optionValue }) => (
            <option key={optionValue} value={optionValue}>{optionLabel}</option>
          ))}
        </Fragment>
      </select>
    </label>
  );
}
