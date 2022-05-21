import React from 'react'
import { Button } from 'reactstrap';


const CustomButton = ({ type, label, method }) => {

    return (
        <>
            <Button id="submitButton" data-value={method} color="primary mt-3">{label}</Button>
        </>
    )
}

export default CustomButton