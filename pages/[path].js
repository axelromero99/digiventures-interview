import inputs from '../api/models/inputs.json'
import CustomForm from '../frontend/components/CustomForm';
import { processInitialRenderFunction } from "../helpers/processInitialRender"


export default function Page({ configurationJSON }) {
  return <>
    <CustomForm configurationJSON={configurationJSON} />
  </>;
}

/**
 * It fetches the configuration JSON from the server, and then passes it to a function that will
 * process the JSON with useful values.
 * @returns The configurationJSON object is being returned.
 */
export const getServerSideProps = async ({ params }) => {

  const configuration = await fetch(`http://localhost:3000/configuration/${params.path}`);

  const configurationJSON = await configuration.json()

  // If the configurationJSON is empty, it means that the page does not exist. Returns 404.
  if (!configurationJSON) {
    return {
      notFound: true,
    }
  }

  // Processing the configuration JSON for the initial render function and new fields for handling the components/data flow logic.
  processInitialRenderFunction(configurationJSON)

  return {
    props: {
      configurationJSON
    },
  };
};