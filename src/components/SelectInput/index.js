import React from 'react';

export default ({
  label,
  onChange = () => {},
  required=false,
  options = [],
  value = ""
}) => {
  return (
    <div className="form-group">
        <label>{label}</label>
        <select className="form-control" value={value} onChange={onChange}>
          <option value="" disabled hidden>Selecione uma opção</option>
          {options.map(v => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
    </div>
  )
}