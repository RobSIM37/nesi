import FormBuilder from "./formBuilder/FormBuilder";

const Forms = (props) => {

    return (<FormBuilder user={props.user} activeForm={props.activeForm} updateActiveForm={props.updateActiveForm}/>)

}

export default Forms;