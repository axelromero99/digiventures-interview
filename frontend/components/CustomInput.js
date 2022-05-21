import React from 'react'
import { Label, Input } from 'reactstrap';


/**
 * Decides what type of input renders.
 * @returns A JSX input element.
 */
const CustomInput = (

    {
        // InputData from parent
        inputData: { type, name, label, required, regex, conditions, options },
        // Method passing to parent
        handleOnChange,
        // If is invalid, from parent
        isInvalid
    },

) => {

    // Normal inputs: text, password, checkbox
    if (type === "text" || type === "password" || type === "email") {
        return (
            <>
                <Label>{label}</Label>

                <Input invalid={isInvalid} onChange={handleOnChange} type={type} required={required} name={name} pattern={regex}></Input>

            </>
        )
    }
    // Checkbox
    else if (type === "checkbox") {
        return (
            <>
                <Label>
                    <Input onChange={handleOnChange} type={type} name={name}></Input>
                    {label}
                </Label>
            </>
        )
    }
    // Select
    else if (type === "select") {

        return (
            <>
                <Label for={name}>{label}</Label >
                <Input onChange={handleOnChange} type={type} name={name}
                >
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.value}</option>
                        )
                    })}
                </Input >
            </>
        )
    }

}

export default CustomInput