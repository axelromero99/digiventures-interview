import React, { useContext, useEffect } from 'react'
import { FormFeedback } from 'reactstrap';
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import { Col } from 'reactstrap';
import { useFormContext, useFormUpdateContext } from '../context/FormContext'
import { changeRenderOnContext } from "../../helpers/changeRenderOnContext"


/**
 * It renders a component based on the type of the inputData object.
 * @returns A component that renders a custom input, a custom button or a custom link.
 */
const ComponentsHandler = ({ inputData, validationError }) => {

    // Contexts 
    const formContext = useFormContext()
    const formUpdateContext = useFormUpdateContext()

    // For rendering purposes
    const [isRendered, setIsRendered] = React.useState(inputData.isRendered)

    // Handling the values of the inputs
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        // Specific type checkbox
        if (e.target.type === "checkbox") {
            formUpdateContext.setFormDataContext(prevState => ({
                ...prevState,           // copy all other key-value pairs
                [name]: {                     // specific object of object
                    ...prevState[name],   // copy all key-value pairs
                    value: e.target.checked          // update if checked of specific key
                }
            }))
        }
        // Other types ( normal inputs )
        else {
            formUpdateContext.setFormDataContext(prevState => ({
                ...prevState,           // copy all other key-value pairs
                [name]: {                     // specific object of object
                    ...prevState[name],   // copy all key-value pairs
                    value: value          // update value of specific key
                }
            }))
        }
        changeRenderOnContext(inputData, formContext, value)
    }

    // Normal input types
    if ((inputData?.type === "text" || inputData?.type === "password" || inputData?.type === "select" || inputData?.type === "email" || inputData?.type === "checkbox") && formContext.formData[inputData.name]?.isRendered) {
        return (
            <>
                <CustomInput
                    handleOnChange={inputData?.hasRenderCondition && handleOnChange}
                    inputData={inputData} 
                    isInvalid={validationError && true}
                />

                {validationError &&
                    (<FormFeedback>
                        {validationError}
                    </FormFeedback>
                    )
                }
            </>
        )
    }
    // Button type
    else if (inputData?.type === "button" && isRendered) {
        return (
            <div className="d-flex flex-row-reverse">
                <CustomButton type={inputData?.type} label={inputData?.label} method={inputData?.method} />
            </div>
        )
    }
    // Link type
    else if (inputData?.type === "link" && isRendered) {
        return (
            <div >
                <a target={inputData?.target} href={inputData?.to}>{inputData?.label}</a>
            </div>
        )
    }
    // Empty
    else {
        return (
            <>

            </>
        )
    }
}

export default ComponentsHandler