

/**
 * It takes a JSON object, checks if the inputs are affected by render conditions, and if they are, add some fields to the object for handling the logic of rendering.
 * Important: adds a property to the input object called "isRendered" and sets it to true or false depending on
 * the conditions.
 * @param configurationJSON - The JSON that contains the inputs and their conditions
 * @returns An object with a property called configurationJSON.
 */
export const processInitialRenderFunction = (configurationJSON) => {

    // Get through the inputs
    configurationJSON?.inputs.forEach((inputData) => {
        inputData["isRendered"]= true
        // Check if the input is affected by conditions and has a name ( if it doesn't have a name, is not an input )
        if (("conditions" in inputData) && inputData.name) {

            // Check if the input is affected by render conditions
            if ("render" in inputData?.conditions) {

                // Get through the render conditions
                inputData?.conditions?.render.forEach((item) => {

                    // Adding the "hasRenderCondition" property to the inputs
                    
                    // Actual item
                    inputData["hasRenderCondition"] = true
                    // Other input affected
                    configurationJSON?.inputs.forEach((inputDataNested)=>{
                        if (inputDataNested.name === item.input) {
                            inputDataNested["hasRenderCondition"] = true
                            inputDataNested["isAffectedBy"] = inputData.name
                            inputDataNested["valuesToCompare"] = inputData?.conditions?.render
                        }
                    })
                    
                    // Comparisions === includes
                    if (item.comparision === "includes") {
                        configurationJSON.inputs.forEach((input) => {
                            if (input.name === item.input) {
                                inputData["isRendered"] = false
                            }
                        })
                    // Comparisions === not_includes
                    } else if (item.comparision === "not_includes") {
                        configurationJSON.inputs.forEach((input) => {
                            if (input.name === item.input) {
                                inputData["isRendered"] = true
                            }
                        })
                    }
                })
            }
        } else {
            inputData["isRendered"] = true
        }
    })

    return { configurationJSON }
}

