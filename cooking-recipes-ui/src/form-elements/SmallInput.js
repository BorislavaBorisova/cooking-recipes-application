import React from "react";

export const SmallInput = (props) => {

  return (
    <div className="input-field col s6">
      <input id={props.id}
        name={props.name}
        type={props.type}
        className={props.name}//"validate"
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
      <label htmlFor={props.name} className="active">{props.title}</label>
      {props.name === "password" ? <span className="helper-text" data-success="Good password." data-error="Password should be at least 8 symbols, contain at least one number and at least one character other than number or letter.">Password should be at least 8 symbols, contain at least one number and at least one character other than number or letter.</span> : <div></div>}
    </div>
  );
}

export default SmallInput;