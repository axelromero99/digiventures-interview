import { useState } from "react";
import { FormContextProvider } from "../frontend/context/FormContext";
import "../styles/global.css";

import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
    return (
        <FormContextProvider>
            <Component {...pageProps} />
        </FormContextProvider>
    );
}
export default MyApp;
