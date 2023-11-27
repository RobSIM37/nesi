import { Button, Grid, Stack, Tab, Typography } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useState } from "react";
import WrapperCollection from "./wrapper/WrapperCollection";
import InputEditor from "./InputEditor";
import AddSelect from "./addControls/AddSelect";
import GreyTabPanel from "../../../styled/GreyTabPanel";
import UnderlinedBox from "../../../styled/UnderlinedBox";
import {
  STATEMENT,
  TEXT,
  NUMBER,
  PASSWORD,
  CHECKBOX,
  RADIO,
  SELECT,
  BUTTON,
} from "../../../../consts/form/inputTypes";
import Form from "../../../form/Form";
import FormLayout from "../../../form/FormLayout";
import FormMeta from "./FormMeta";
import { rndNum } from "../../../../consts/randomNumber";
import PaddedCard from "../../../styled/PaddedCard";

const FormBuilder = (props) => {
  const [currentInputIndex, setCurrentInputIndex] = useState(null);
  const [currentTab, setCurrentTab] = useState("edit");

  const handleTabChange = (e, value) => {
    const newForm = { ...props.activeForm };
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
    props.updateActiveForm(newForm);
  };

  const generateInputContent = (input) => {
    return (<FormLayout width={450} p={.01} stackPadding={.01}>
              <Form key={Math.random()} inputs={[input]} />
            </FormLayout>)
  }

  const reportInputsChange = (inputs) => {
    const newForm = { ...props.activeForm };
    newForm["inputs"] = inputs;
    if (inputs.length >= currentInputIndex) {
      const newIndex = inputs.length - 1 >= 0 ? inputs.length - 1 : null
      setCurrentInputIndex(newIndex);
    }
    props.updateActiveForm(newForm);
  };

  const reportIndexChange = (index) => {
    setCurrentInputIndex(index);
  };

  const reportOptionsChange = (data) => {
    const newForm = { ...props.activeForm };
    newForm.inputs[currentInputIndex].options = data;
    props.updateActiveForm(newForm);
  };

  const formMetaSubmitHandler = (data) => {
    const newForm = { ...props.activeForm };
    newForm["formName"] = data.formName.value;
    newForm["submitButtonText"] = data.submitButtonText.value;
    props.updateActiveForm(newForm);
  };

  const inputEditorSubmitHandler = (data) => {
    const newForm = { ...props.activeForm };
    const input = {...newForm.inputs[currentInputIndex]};
    console.log("input.default", input.default);
    console.log("data.default.value", data.default.value)
    if (data.label) input["label"] = data.label.value;
    if (data.dataKey) input["dataKey"] = data.dataKey.value;
    if (data.default) input["default"] = data.default.value;
    if (data.required) input["required"] = data.required.value;
    if (data.multiline) input["multiline"] = data.multiline.value;
    if (data.minRows) input["minRows"] = data.minRows.value;
    if (data.maxRows) input["maxRows"] = data.maxRows.value;
    if (data.includeMin) input["includeMin"] = data.includeMin.value;
    if (data.min) input["min"] = data.min.value;
    if (data.includeMax) input["includeMax"] = data.includeMax.value;
    if (data.max) input["max"] = data.max.value;
    if (data.statement) input["statement"] = data.statement.value;
    input["valid"] = Object.values(data).reduce((ack, cur) => {
      return ack && cur.errorMessage === "";
    }, true);
    newForm.inputs[currentInputIndex] = input;
    props.updateActiveForm(newForm);
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
      newInput["minRows"] = 0;
      newInput["maxRows"] = 0;
    }
    if (type === NUMBER) {
      newInput["includeMin"] = false;
      newInput["min"] = 0;
      newInput["includeMax"] = false;
      newInput["max"] = 0;
    }
    if (type === CHECKBOX) {
      newInput["default"] = false;
    }
    if (type === SELECT || type === RADIO) {
      newInput["options"] = [{ value: 0, label: `New Option` }];
    }
    if (type === STATEMENT) {
      newInput["statement"] = "New Statement";
    }
    newInput["valid"] = true;
    const newForm = { ...props.activeForm };
    newForm.inputs.push(newInput);
    props.updateActiveForm(newForm);
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

  const formSubmitButtonIsDisabled = () => {
    return !props.activeForm.inputs.reduce((ack, cur) => {
      return ack && cur.valid;
    }, true);
  };

  const formSubmitButtonClickEventHandler = () => {
    props.user.submitForm(props.activeForm);
  };

  return (
    <Grid container width={"100%"} columnSpacing={1}>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
          <FormMeta autoSubmit={formMetaSubmitHandler} />
          <Button
            disabled={formSubmitButtonIsDisabled()}
            variant="contained"
            onClick={formSubmitButtonClickEventHandler}
          >
            Submit Form
          </Button>
        </Stack>
      </Grid>
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
              <Grid item xs={4}>
                <PaddedCard p={2}>
                  <WrapperCollection
                    collection={[...props.activeForm.inputs]}
                    generateContent={generateInputContent}
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
                </PaddedCard>
              </Grid>
              <Grid item xs={8}>
                {currentInputIndex !== null && (
                  <InputEditor
                    input={props.activeForm.inputs[currentInputIndex]}
                    autoSubmit={inputEditorSubmitHandler}
                    reportCollectionChange={reportOptionsChange}
                  />
                )}
              </Grid>
            </Grid>
          </GreyTabPanel>
          <GreyTabPanel value="preview">
            <Grid item xs={3}>
              <Stack alignItems={"center"}>
                <Typography>{props.activeForm.formName}</Typography>
                <FormLayout width={400}>
                  <Form
                    inputs={[
                      ...props.activeForm.inputs,
                      { type: BUTTON, text: props.activeForm.submitButtonText },
                    ]}
                    onSubmit={() => {}}
                  />
                </FormLayout>
              </Stack>
            </Grid>
          </GreyTabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default FormBuilder;
