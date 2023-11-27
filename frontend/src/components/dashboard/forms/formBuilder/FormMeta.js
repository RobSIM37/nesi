import { metaFormInputs } from "../../../../consts/form/metaForm";
import Form from "../../../form/Form";
import FormLayout from "../../../form/FormLayout";

const FormMeta = (props) => {
  return (
    <FormLayout width={500}>
      <Form inputs={metaFormInputs} autoSubmit={props.autoSubmit} />
    </FormLayout>
  );
};

export default FormMeta;
