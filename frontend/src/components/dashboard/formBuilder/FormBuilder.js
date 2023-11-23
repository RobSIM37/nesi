import { Button, Grid, Tab, Typography } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useState } from "react";
import WrapperCollection from "../../wrapper/WrapperCollection";
import InputEditor from "./InputEditor";
import AddSelect from "./addControls/AddSelect";
import GreyTabPanel from "../../GreyTabPanel";
import UnderlinedBox from "../../UnderlinedBox";
import {
  STATEMENT,
  TEXT,
  NUMBER,
  PASSWORD,
  CHECKBOX,
  RADIO,
  SELECT,
  BUTTON,
} from "../../../consts/form/inputTypes";
import Form from "../../form/Form";
import FormLayout from "../../form/FormLayout";
import FormMeta from "./FormMeta";
import { rndNum } from "../../../consts/randomNumber";

const FormBuilder = (props) => {
  const [form, setForm] = useState({ inputs: [] });
  const [currentInputIndex, setCurrentInputIndex] = useState(null);
  const [currentTab, setCurrentTab] = useState("edit");

  const handleTabChange = (e, value) => {
    const newForm = { ...form };
    switch (value) {
      case "edit":
        newForm.inputs.forEach((input) => (input["disabled"] = true));
        break;
      case "preview":
        newForm.inputs.forEach((input) => (input["disabled"] = false));
        break;
      default:
    }
    setCurrentTab(value);
    setForm(newForm);
  };

  const reportInputsChange = (inputs) => {
    const newForm = { ...form };
    newForm["inputs"] = inputs;
    setForm(newForm);
  };

  const reportIndexChange = (index) => {
    setCurrentInputIndex(index);
  };

  const reportOptionsChange = (data) => {
    console.log("data:", data);
    const newForm = { ...form };
    newForm.inputs[currentInputIndex].options = data.options;
    setForm(newForm);
  };

  const formMetaSubmitHandler = (data) => {
    const newForm = { ...form };
    newForm["formName"] = data.formName.value;
    newForm["submitButtonText"] = data.submitButtonText.value;
    setForm(newForm);
  };

  const inputEditorSubmitHandler = (data) => {
    console.log("in iesh, data:", data);
    const newForm = { ...form };
    const input = form.inputs[currentInputIndex];
    if (data.label) input["label"] = data.label.value;
    if (data.dataKey) input["dataKey"] = data.dataKey.value;
    if (data.default) input["default"] = data.default.value;
    if (data.required) input["required"] = data.required.value;
    if (data.multiline) input["multiline"] = data.multiline.value;
    if (data.minRows) input["minRows"] = data.minRows.value;
    if (data.maxRows) input["maxRows"] = data.maxRows.value;
    if (data.min) input["min"] = data.min.value;
    if (data.max) input["max"] = data.max.value;
    if (data.statement) input["statement"] = data.statement.value;
    setForm(newForm);
  };

  const addItem = (type) => {
    let newInput = {};
    newInput["type"] = type;
    newInput["disabled"] = true;
    if (type !== STATEMENT) {
      newInput["label"] = `New ${type} Input`;
      newInput["dataKey"] = `dataKey-${rndNum(10000)}`;
      newInput["default"] = "";
      newInput["required"] = true;
    }
    if (type === TEXT) {
      newInput["multiline"] = false;
      newInput["minRows"] = null;
      newInput["maxRows"] = null;
    }
    if (type === NUMBER) {
      newInput["min"] = null;
      newInput["max"] = null;
    }
    if (type === SELECT || type === RADIO) {
      newInput["options"] = [{ value: 0, label: `New Option` }];
    }
    if (type === STATEMENT) {
      newInput["statement"] = "New Statement";
    }

    const newForm = { ...form };
    newForm.inputs.push(newInput);
    console.log("newForm - post push", newForm);
    setForm(newForm);
    setCurrentInputIndex(newForm.inputs.length - 1);
  };

  const formBuilderInputs = [
    TEXT,
    PASSWORD,
    NUMBER,
    CHECKBOX,
    RADIO,
    SELECT,
    STATEMENT,
  ];

  const formSubmitButtonClickEventHandler = () => {
    props.user.submitForm(form);
  };

  return (
    <Grid container width={"100%"}>
      <Grid item xs={12}>
        <TabContext value={currentTab}>
          <UnderlinedBox>
            <TabList aria-label="Dashboard Options" onChange={handleTabChange}>
              <Tab label="Edit Form" value="edit" />
              <Tab label="Preview Form" value="preview" />
            </TabList>
          </UnderlinedBox>
          <GreyTabPanel value="edit" direction={"row"}>
            <Grid container width={"100%"}>
              <Grid item xs={2}>
                <WrapperCollection
                  collection={form.inputs.map((input) => {
                    return {
                      valid: input.valid,
                      content: <Form key={Math.random()} inputs={[input]} />,
                    };
                  })}
                  currentSelectedIndex={currentInputIndex}
                  reportCollectionChange={reportInputsChange}
                  reportIndexChange={reportIndexChange}
                  addControl={
                    <AddSelect
                      title={"Add an Input:"}
                      default={TEXT}
                      options={formBuilderInputs}
                      addItem={addItem}
                    />
                  }
                />
              </Grid>
              <Grid item xs={10}>
              {currentInputIndex !== null && (
                <InputEditor
                  input={form.inputs[currentInputIndex]}
                  autoSubmit={inputEditorSubmitHandler}
                  reportCollectionChange={reportOptionsChange}
                />
              )}</Grid>
            </Grid>
          </GreyTabPanel>
          <GreyTabPanel value="preview">
            <Typography>{form.formName}</Typography>
            <FormLayout width={400}>
              <Form
                inputs={[
                  ...form.inputs,
                  { type: BUTTON, text: form.submitButtonText },
                ]}
                onSubmit={() => {}}
              />
            </FormLayout>
          </GreyTabPanel>
        </TabContext>
        <FormMeta autoSubmit={formMetaSubmitHandler} />
        <Button variant="contained" onClick={formSubmitButtonClickEventHandler}>
          Submit Form
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormBuilder;
