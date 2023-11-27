import Form from "../../../form/Form";
import FormLayout from "../../../form/FormLayout";
import { useEffect, useState } from "react";
import {
  STATEMENT,
  TEXT,
  NUMBER,
  CHECKBOX,
  RADIO,
  SELECT,
} from "../../../../consts/form/inputTypes";
import { Stack } from "@mui/material";
import WrapperCollection from "./wrapper/WrapperCollection";
import AddOptions from "./addControls/AddOptions";

const InputEditor = (props) => {
  const [currentInputIndex, setCurrentInputIndex] = useState(null);
  const [inputFormControls, setInputFormControls] = useState(null);

  useEffect(() => {
    let inputFormObjs = [];
    if (props.input.type !== STATEMENT) {
      inputFormObjs.push({
        type: TEXT,
        label: "Label",
        dataKey: "label",
        default: props.input.label,
        required: true
      });
      inputFormObjs.push({
        type: TEXT,
        label: "Data Key",
        dataKey: "dataKey",
        default: props.input.dataKey,
        required: true
      });
      inputFormObjs.push({
        type: CHECKBOX,
        label: "Input is Required:",
        dataKey: "required",
        default: props.input.required,
      });
    }
    if (props.input.type === TEXT) {
      inputFormObjs.push({
        type: TEXT,
        label: "Default Value",
        dataKey: "default",
        default: props.input.default,
      });
      inputFormObjs.push({
        type: CHECKBOX,
        label: "Multi-Line Input:",
        dataKey: "multiline",
        default: props.input.multiline,
      });
      inputFormObjs.push({
        type: NUMBER,
        label: "Minimum Number of Rows:",
        dataKey: "minRows",
        default: props.input.minRows,
        required: true
      });
      inputFormObjs.push({
        type: NUMBER,
        label: "Maximum Number of Rows:",
        dataKey: "maxRows",
        default: props.input.maxRows,
      });
    }
    if (props.input.type === NUMBER) {
      inputFormObjs.push({
        type: NUMBER,
        label: "Default Value",
        dataKey: "default",
        default: props.input.default,
      });
      inputFormObjs.push({
        type: CHECKBOX,
        label: "Include Minimum Value:",
        dataKey: "includeMin",
        default: props.input.includeMin,
      });
      inputFormObjs.push({
        type: NUMBER,
        label: "Minimum:",
        dataKey: "min",
        default: props.input.min,
      });
      inputFormObjs.push({
        type: CHECKBOX,
        label: "Include Maximum Value:",
        dataKey: "includeMax",
        default: props.input.includeMax,
      });
      inputFormObjs.push({
        type: NUMBER,
        label: "Maximum:",
        dataKey: "max",
        default: props.input.max,
      });
    }
    if (props.input.type === CHECKBOX) {
      inputFormObjs.push({
        type: CHECKBOX,
        label: "Default Value",
        dataKey: "default",
        default: props.input.default,
      });
    }
    if (props.input.type === STATEMENT) {
      inputFormObjs.push({
        type: TEXT,
        label: "Statement Text",
        dataKey: "statement",
        default: props.input.statement,
        required: true
      });
    }
    setInputFormControls(inputFormObjs);
  }, [props.input]);

  const generateOptionContent = (option) => {
    return (<Form
      inputs={buildOptionsInputs(option)}
      autoSubmit={props.autoSubmit}
    />)
  }
  const selectItem = (index) => {
    setCurrentInputIndex(index);
  };

  const addOption = () => {
    const options = [...props.input.options];
    options.push({ value: 0, label: `New Option` });
    props.reportCollectionChange(options);
  };

  const buildOptionsInputs = (option) => {
    return [
      {
        type: TEXT,
        label: "Label",
        dataKey: "label",
        default: option.label,
        required: true,
      },
      {
        type: TEXT,
        label: "Value",
        dataKey: "value",
        default: option.value,
        required: true,
      },
    ];
  };

  return (
    <>
      {inputFormControls && 
        <Stack>
          <FormLayout width={400}>
            <Form inputs={inputFormControls} autoSubmit={props.autoSubmit} />
          </FormLayout>
          {(props.input.type === RADIO || props.input.type === SELECT) && (
            <WrapperCollection
              collection={props.input.options}
              generateContent={generateOptionContent}
              currentSelectedIndex={currentInputIndex}
              reportCollectionChange={props.reportCollectionChange}
              reportIndexChange={selectItem}
              addControl={
                <AddOptions title={"Add Option"} addOption={addOption} />
              }
            />
          )}
        </Stack>
      }
    </>
  );
};

export default InputEditor;
