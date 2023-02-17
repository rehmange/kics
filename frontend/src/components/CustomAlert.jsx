import React,{useState} from 'react';

const CustomAlert = (props) => {
    const [show, setShow] = useState(true);
    return (
        <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
            {props.text}
        </Alert>
    )
}

export default CustomAlert