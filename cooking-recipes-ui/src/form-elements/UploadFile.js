import React from "react";

export const UploadFile = (props) => {

    return (
        <div className="row">
            <div className="input-field col s12">
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Browse</span>
                        <input type="file" onChange={props.handleChange} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload picture" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;