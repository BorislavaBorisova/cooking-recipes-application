import React from "react";

export const RadioButtons = (props) => {
    return (
        <div>
            <label htmlFor={props.name} >
                {props.title}
            </label>

            {props.options.map(option => {
                return (
                    <p key={option}>
                        <label>
                            <input id={option}
                                name={props.name}
                                className="with-gap"
                                type="radio"
                                value={option}
                                checked={props.selectedOption === option}
                                onChange={props.handleChange}
                            />
                            <span>{option}</span>
                        </label>
                    </p>
                )
            })}
        </div>
    );
}

export default RadioButtons;