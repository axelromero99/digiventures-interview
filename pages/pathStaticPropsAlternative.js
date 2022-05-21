import inputs from '../api/models/inputs.json'
import CustomForm from '../frontend/components/CustomForm';
import { processInitialRenderFunction } from "../helpers/processInitialRender"


export default function Page({ configurationJSON }) {
  return <>
    <CustomForm configurationJSON={configurationJSON} />
  </>;
}

export const getStaticProps = async ({ params }) => {

  const configuration = await fetch(`http://localhost:3000/configuration/${params.path}`);

  const configurationJSON = await configuration.json()

  processInitialRenderFunction(configurationJSON)

  return {
    props: {
      configurationJSON
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { path: "register" } },
      { params: { path: "login" } },
    ],
    fallback: false, //return 404 if the path does not exist in the configuration
  };
};

