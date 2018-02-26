import React from 'react';
// import './index.css';

export default function Button(props) {
  const {
    label,
    onClick,
    ...extraProps
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      {...extraProps}
    >
      {label}
    </button>
  );
}
