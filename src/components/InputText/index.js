import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default ({
  label, 
  type, 
  placeholder, 
  onChange=() => {}, 
  onClick=() => {}, 
  value="", 
  required=false, 
  inputGroup=false,
  textUnder="",
  maxLength = 0,
}) => {
  const handleChange = (v) => {
    let regex = /[^0-9]/g;
    let newValues = v.replace(regex, "");

    onChange(newValues)
  }
  return (
    inputGroup ? (
      <>
        <div className="input-group mb-2">
          <div className="input-group-prepend search" onClick={onClick}>
            <div className="input-group-text">
              <FiSearch />
            </div>
          </div>
          <input onChange={(e) => handleChange(e.target.value)} type={type} className="form-control" placeholder={placeholder} value={value} required={required} maxLength={maxLength > 0 ? maxLength : ""}/>
        </div>
        <small class="form-text text-muted mb-2">{textUnder}</small>
      </>
    ) : 
    (
      <div className="form-group">
        <label htmlFor="nome">{label}</label>
        <input onChange={onChange} type={type} className="form-control" placeholder={placeholder} value={value} required={required}/>
      </div>
    )
  );
}