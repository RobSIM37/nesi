import { Button, Grid } from "@mui/material";
import { useState } from "react";
import WrapperCollection from "./WrapperCollection";
import InputEditor from "./InputEditor";
import AddSelect from "./addControls/AddSelect";
import { STATEMENT, TEXT, NUMBER, PASSWORD, CHECKBOX, RADIO, SELECT } from "../../../consts/form/inputTypes";
import Form from "../../form/Form";

const FormBuilder = (props) => {

    const [form, setForm] = useState({inputs:[]});
    const [currentInputIndex, setCurrentInputIndex] = useState(null);

    const moveItemUp = (index) => {
        if (index===0) return;
        const newForm = {...form}
        const temp = newForm.inputs[index-1];
        newForm.inputs[index-1] = newForm.inputs[index];
        newForm.inputs[index] = temp;
        setForm(newForm);
        setCurrentInputIndex(currentInputIndex - 1);
    }

    const moveItemDown = (index) => {
        if (index===form.inputs.length - 1) return;
        const newForm = {...form}
        const temp = newForm.inputs[index+1];
        newForm.inputs[index+1] = newForm.inputs[index];
        newForm.inputs[index] = temp;
        setForm(newForm);
        setCurrentInputIndex(currentInputIndex + 1);
    }

    const deleteItem = (index) => {
        const newForm = {...form}
        newForm.inputs = newForm.inputs.filter((item,i) => i !== index);
        setForm(newForm);
        setCurrentInputIndex(null);
    }

    const selectItem = (index) => {
        setCurrentInputIndex(index)
    }
    const addItem = (type) => {

        let newInput = {};
        newInput["type"] = type;
        if (type !== STATEMENT) {
            newInput["label"] = null;
            newInput["dataKey"] = null;
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
        if (type === SELECT) {
            newInput["menuItems"] = [];
        }
        if (type === RADIO) {
            newInput["choices"] = [];
        }
        if (type === STATEMENT) {
            newInput["statement"] = "";
        }

        const newForm = {...form}
        newForm.inputs.push(newInput);
        setForm(newForm);
        setCurrentInputIndex(newForm.inputs.length - 1);

    }

    const formBuilderInputs = [TEXT, PASSWORD, NUMBER, CHECKBOX, RADIO, SELECT, STATEMENT]

    const formSubmitButtonClickEventHandler = () => {
        props.user.submitForm(form);
    }

    return (
        <Grid container>
            <Grid item xs={4}>
                <WrapperCollection
                    collection={form.inputs.map(input => {
                        return {valid:input.valid, content:<Form key={Math.random()} inputs={[input]}/>}
                    })}
                    currentSelectedIndex={currentInputIndex}
                    moveItemUp={moveItemUp}
                    moveItemDown={moveItemDown}
                    deleteItem={deleteItem}
                    selectItem={selectItem}
                    addControl={<AddSelect default={TEXT} options={formBuilderInputs} addItem={addItem}/>}
                />
                <Button variant="contained" onClick={formSubmitButtonClickEventHandler}>Submit Form</Button>
            </Grid>
            <Grid item xs={8}>
                {currentInputIndex ?
                <InputEditor form={form} setForm={setForm} currentInputIndex={currentInputIndex}/>
                    :
                <></>}
            </Grid>
        </Grid>
    );
}

export default FormBuilder;