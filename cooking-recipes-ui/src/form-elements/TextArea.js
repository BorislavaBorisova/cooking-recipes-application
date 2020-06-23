import React from "react";

const TextArea = (props) => (
    <div className="row">
        <div className="input-field col s12">
            <label htmlFor={props.id} className="active">{props.title}</label>
            <textarea className="materialize-textarea"
                id={props.id}
                name={props.name}
                data-length={props.length}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    </div>
);

export default TextArea;