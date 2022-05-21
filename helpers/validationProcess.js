

/**
 * It takes a form data object and a form context object and returns an object with the isValid value and
 * an error messages object for showing the validation errors.
 * @param data - FormData
 * @param formContext - This is the object that contains the context.
 * @returns An object with the validation state and the error messages.
 */
export const validationProcess = (data, formContext) => {

    // Validation Process
    let isValid = true;
    let errorMessages = {};


    // Create an object from the form
    let formDataObject = {}
    for (var pair of data.entries()) {

        const actualValue = pair[1]
        const actualName = pair[0]

        formDataObject[actualName] = actualValue
    }

    // Getting through the data and obtaining the error messages and validation state
    for (var pair of data.entries()) {
        const actualValue = pair[1]
        const actualName = pair[0]

        formContext.formData[actualName]?.conditions?.validations?.forEach((validation) => {

            // comparision === "same"
            if (validation.comparision === "same") {
                if (actualValue === formDataObject[validation.input]) {
                    isValid = true
                } else {
                    errorMessages[actualName] = `"${formContext.formData[validation.input].label}" value must be the same as "${formContext.formData[actualName].label}" value`
                    isValid = false
                }
            // comparision === "not_includes"
            } else if (validation.comparision === "not_includes") {

                validation?.values.forEach((validationValue) => {
                    if (actualValue === validationValue) {
                        errorMessages[actualName] = `"${formContext.formData[validation.input].label}" value must not be "${validationValue}"`
                        isValid = false
                    } else {
                        isValid = true
                    }
                })

            }
        })
    }

    // Returning the objects with the values
    if (isValid) {
        return {
            isValid: true,
            data: formDataObject,
            errorMessages: {}
        }
    } else {
        return {
            isValid: false,
            errorMessages: errorMessages
        }
    }

}

