import React, { useContext, createContext, useState } from "react";

// Creating the contexts
const FormContext = createContext(null)
const FormUpdateContext = createContext(null)

// Custom hooks for accessing the contexts
export function useFormContext() {
    return useContext(FormContext)
}
export function useFormUpdateContext() {
    return useContext(FormUpdateContext)
}

// Creating the provider
export function FormContextProvider({ children }) {

    const [formData, setFormData] = useState({})
    
    const checkRenderConditions = (data)=>{

        

    }

    function setFormDataContext(newData) {

        checkRenderConditions(newData);

        setFormData(newData)
    }


    return (
        <FormContext.Provider value={{ formData }}>
            <FormUpdateContext.Provider value={{ setFormDataContext }}>
                {children}
            </FormUpdateContext.Provider>
        </FormContext.Provider>
    )
}