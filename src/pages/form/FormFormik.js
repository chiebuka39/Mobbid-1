import React from "react";
import { withFormik, Field } from "formik";


import * as Yup from "yup";


const renderInput = ({ field, form: {touched, errors}, ...props }) => {
  // console.log("props: ", props);
  // console.log("field: ", field);
  // console.log("form: ");
  return (
    <div className={`getRide__input--cont ${props.classdiv} `}>
      {props.type === "text" && <label className="getRide__label"> {props.label} </label>}
      {/* <label className="getRide__label"> {props.label} </label> */}
      <div >
        <input
          {...field}
          {...props}
          
          className={props.className}
          placeholder={props.label}
        />
        {touched[field.name] &&
          errors[field.name] && (
              <p className="getRide__error"> {errors[field.name]} </p>
            )
          }
      </div>
    </div>
  );
};

const renderSelect = ({form: {touched, errors}, field, ...props})=> {
  
  return (
    <div className={`getRide__locations--cont ${props.divclass}`} >
      <label className="getRide__label"> {props.label} </label>
      <div>
      <select {...field} {...props} className={props.className} > {props.children} </select>
      </div>
    </div>
      
  )
}
//GET LOCATIONS
let homes = ["surulere", "VI", "Lekki", "Mile 2", "oshodi", "ikeja"];
//SORT LOCATION LIST
homes = homes.sort();


const GetRideForm = props => {
  // console.log("props: ", props);
  const {
    handleSubmit, handleChange,
    dirty,
    isSubmitting,
    handleReset,
    values,
    errors
  } = props;

  const btnStyle = {
    cursor: !dirty || isSubmitting ? "not-allowed": "pointer",
    backgroundColor:  !dirty || isSubmitting ? "#c5c2c2": "#2d9cdb",
  } 

  return (
    <form onSubmit={handleSubmit} className="getRide__form">
      <Field
        component={renderInput}
        label="first Name"
        name="firstName"
        type="text"
        className="getRide__input"
        classdiv="getRide__input--firstName"
        value={values.firstName}
      />

      <Field
        component={renderInput}
        label="last Name"
        name="lastName"
        type="text"
        className="getRide__input"
        classdiv="getRide__input--lastName"
        value={values.firstName}
      />

      <Field
        component={renderSelect}
        name="home"
        label="Home"
        className="getRide__input getRide__locations"
        divclass="getRide__locations--home"
      >
        <option className="">Select home location</option>
        {homes.map(home => (
          <option key={home} value={home}>
            {" "}
            {home}{" "}
          </option>
        ))}
      </Field>

      <Field
        component={renderSelect}
        name="work"
        label="Work"
        className="getRide__input getRide__locations"
        divclass="getRide__locations--work"
      >
        <option className="">Select work location</option>
        {homes.map(home => (
          <option key={home} value={home}>
            {" "}
            {home}{" "}
          </option>
        ))}
      </Field>

      <div className="getRide__btn--cont">
        <Field
          component={renderInput}
          name="phoneNumber"
          type="tel"
          label="Phone Number"
          className="getRide__input"
          classdiv="getRide__input--phone"
        />
        {/* <input type="tel" /> */}

        <button
          type="submit"
          style={btnStyle}
          disabled={!dirty || errors || isSubmitting}
          className="getRide__btn"
        >
          get my free ride
        </button>
      </div>
      {/* <button onClick={handleReset} disabled={!dirty || isSubmitting}>
        clear
      </button> */}
    </form>
  );
};

//MANUAL VALIDATION FOR LENGTH OF PHONE NUMBER
// const validate = values => {
//   let errors = {}
//   if(values.phoneNumber.length < 10) {
//     errors.phoneNumber = "incomplete phone number"
//   }
//   return errors
// }

//Yup Validation
const schema = Yup.object().shape({
  firstName: Yup.string().min(3, "first name must be up to 5 characters").required("* First name must not be empty"),
  lastName: Yup.string().min(3, "last name must be up to 5 characters").required("* Last name must not be empty"),
  phoneNumber: Yup.number().required("* Phone number must not be empty").typeError("* That doesn't look like a phone number")
});

export default withFormik({
  // validate,
  mapPropsToValues: () => ({
    firstName: "",
    lastName: "",
  }),
  handleSubmit: (values)=>{ 
    console.log(values)},
  handleDrag: false,
  validationSchema: schema,
  })
(GetRideForm);
