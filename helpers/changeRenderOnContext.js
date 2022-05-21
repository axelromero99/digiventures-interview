

/**
 * It compares the values of the inputData with the actualValue and modifies the formContext to render
 * or not the component.
 * @param inputData - The input data that is being passed to the function
 * @param formContext - The formContext object that contains the formData object.
 * @param actualValue - The value of the input that is being changed
 */
export const changeRenderOnContext = (inputData, formContext, actualValue) => {

    // Comparing the render conditions with the values and modifying the formContext to render or not the component
    inputData?.valuesToCompare && inputData?.valuesToCompare.forEach((condition) => {
        // Comparision === includes
        if (condition.comparision === "includes") {
            if (condition.values.includes(actualValue)) {
                formContext.formData[inputData.isAffectedBy].isRendered = true
            } else {
                formContext.formData[inputData.isAffectedBy].isRendered = false
            }
        }
        // Comparision === not_includes
        else if (condition.comparision === "not_includes") {
            if (!(condition.values.includes(actualValue))) {
                formContext.formData[inputData.isAffectedBy].isRendered = true
            } else {
                formContext.formData[inputData.isAffectedBy].isRendered = false
            }
        }
        // Comparision === same
        else if (condition.comparision === "same") {
            if (condition.input === actualValue) {
                formContext.formData[inputData.isAffectedBy].isRendered = true
            } else {
                formContext.formData[inputData.isAffectedBy].isRendered = false
            }
        }
    })
}

