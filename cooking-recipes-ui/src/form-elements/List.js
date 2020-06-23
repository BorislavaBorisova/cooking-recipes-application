import React from 'react';

function List(props) {
    return (
        <div>
            <label htmlFor={props.name} className="active">{props.title}</label>
            <input type={props.type}
                className={"validate"}
                placeholder={props.placeholder}
                value={props.name === "ingredients" ? props.newItem : props.newTag}
                onChange={props.onUpdate}
            />

            <button className="waves-effect waves-light btn-small" type={"button"} onClick={props.onAdd}>Add</button>

            <ul className="list-group">
                {
                    (props.list || []).map(item => {
                        return (
                            <li key={item}>
                                {item}
                                <a className="waves-effect waves-teal btn-flat" onClick={() => props.onDelete(item)}><i className="material-icons">clear</i></a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );

}

export default List;
