import React from 'react'
import { Form, FormGroup, Alert } from "reactstrap";
import ComponentsHandler from "./ComponentsHandler"
import { useFormContext, useFormUpdateContext } from '../context/FormContext'
import { validationProcess } from "../../helpers/validationProcess"
import axios from "axios";


/**
 * It's a function that receives a JSON as a prop, and then it renders a form with the inputs that are
 * in the JSON.
 * Have the logic for submitting the form to the server and validation process.
 * @returns A form with the inputs and the submit button.
 */
const CustomForm = ({ configurationJSON }) => {

    // Contexts 
    const [loadingContext, setLoadingContext] = React.useState(true)
    const [validationErrors, setValidationErrors] = React.useState({})
    const [actualAlert, setActualAlert] = React.useState()
    const formContext = useFormContext()
    const formUpdateContext = useFormUpdateContext()

    React.useEffect(() => {
        if (loadingContext) {

            // First: filtering the non-inputs
            // Second: convert the array to an object, with the keys as name property
            const configurationObject = configurationJSON.inputs.filter(
                (input) => "name" in input
            ).reduce((a, v) => ({ ...a, [v.name]: v }), {})

            // Setting in the context the processed data
            formUpdateContext.setFormDataContext(configurationObject)

            // Setting the loading to false so the form will render with the context loaded
            setLoadingContext(false)
        }

    }, [configurationJSON, loadingContext])


    const submitForm = (e) => {
        e.preventDefault()

        const data = new FormData(event.target);
        const validation = validationProcess(data, formContext);

        if (validation.isValid) {
            setValidationErrors({})

            // Get the method from the button
            const method = document.querySelector("#submitButton").dataset.value

            // Make a fetch with axios
            axios.post(`/api/${method}`, validation.data)
                .then(function (response) {
                    const alert = {
                        type: response?.data?.error ? "danger" : "success",
                        message: response.data.message
                    }

                    setActualAlert(alert)

                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            setValidationErrors(validation.errorMessages)
        }

    }

    if (loadingContext) {
        return (
            <>Loading the context...</>
        )
    }

    return (
        <div className="formContainer">
            <Form
                onSubmit={(e) => submitForm(e)}
                className="form"
            >
                <h1 className="text-center">{configurationJSON.title}</h1>
                {configurationJSON?.inputs.map((inputData, index) => {
                    return (
                        <FormGroup
                            className='mt-2'
                            key={index}>
                            <ComponentsHandler
                                inputData={inputData}
                                validationError={validationErrors[inputData?.name]} />
                        </FormGroup>
                    )
                })}
            </Form>
            {actualAlert && (
                <Alert color={actualAlert.type}>{actualAlert?.message}</Alert>
            )}
        </div>
    )
}

export default CustomForm


