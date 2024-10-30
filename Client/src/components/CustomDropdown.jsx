import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';

function CustomDropdown(props) {

    const [title, setTitle] = useState(props.title)

    function changeTitle(event) {
        value = event.key.value;

        setTitle(value);
    }

    return (
        <div className="dropdown">
            <button>{title}</button>

            <div className="content">
                {
                    props.hotel.map((current, key) => (
                        <p onClick={
                            () => {
                                props.changePrice(current.price_id)
                            }
                        }>
                            {current.mulai} &emsp; {current.akhir}
                        </p>
                    ))
                }
            </div>
        </div>
    );
}

export default CustomDropdown;
