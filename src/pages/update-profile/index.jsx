import React, { useContext, useState } from "react";
import { editStyle } from "./style";
import { Typography, TextField, Button } from "@material-ui/core";
import {AuthContext, useAuthContext}  from "../../Context/authContext";
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../ValidationErrorMessage";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import Shared from "../../shared";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const authContext = useAuthContext();
  const classes = editStyle();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const initialValueState = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    newPassword: "",
    confirmPassword: "",
  };

  // const [initialValueState, setinitialValueState] = useState({
  //     email: user.email,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     newPassword: "",
  //     confirmPassword: ""
  //   }
  // );
  const [updatePassword, setUpdatePassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    newPassword: Yup.string().min(5, "Minimum 5 charactor is required"),
    confirmPassword: updatePassword
      ? Yup.string()
          .required("Must required")
          .oneOf([Yup.ref("newPassword")], "Passwords is not match")
      : Yup.string().oneOf([Yup.ref("newPassword")], "Passwords is not match"),
  });

  const onSubmit = async (values) => {
    const password = values.newPassword ? values.newPassword : user.password;
    delete values.confirmPassword;
    delete values.newPassword;

    const data = Object.assign(user, { ...values, password });
    delete data._id;
    delete data.__v;
    const res = await userService.updateProfile(data);
    if (res) {
      authContext.setUser(res);
      toast.success(Shared.messages.UPDATED_SUCCESS);
      navigate("/");
    }
  };

  return (
    <div className={classes.editWrapper}>
      <div className="container" style={{width:'50%'}}>
        <Typography variant="h1">Upade Profile</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validator={() => ({})}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form action="" onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <label>First Name*</label>
                  <TextField
                    id="first-name"
                    name="firstName"
                    variant="outlined"
                    value={values.firstName}
                    inputProps={{ className: "small" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                     style={{backgroundColor:'white',height:'40px',width:'600px'}}
                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                    
                  />
                </div>

                <div className="form-col">
                  <label>Last Name *</label>
                    <TextField
                      id="last-name"
                      name="lastName"
                    
                      variant="outlined"
                      value={values.lastName}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{backgroundColor:'white',height:'40px',width:'600px'}}
                    />
                    <ValidationErrorMessage
                      message={errors.lastName}
                      touched={touched.lastName}
                    />
                  </div>

                  <div className="form-col">
                    <label>Email *</label>
                    <TextField
                      id="email"
                      name="email"
                      
                      variant="outlined"
                      value={values.email}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{backgroundColor:'white',height:'40px',width:'600px'}}
                    />
                    <ValidationErrorMessage
                      message={errors.email}
                      touched={touched.email}
                    />
                  </div>
                  <div className="form-col">
                    <label>New Password</label>
                    <TextField
                      id="newPassword"
                      name="newPassword"
                      variant="outlined"
                      value={values.newPassword}
                      inputProps={{ className: "small" }}
                      onChange={(e) => {
                        e.target.value !== ""
                          ? setUpdatePassword(true)
                          : setUpdatePassword(false);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      style={{backgroundColor:'white',height:'40px',width:'600px'}}

                    />
                    <ValidationErrorMessage
                      message={errors.newPassword}
                      touched={touched.newPassword}
                    />
                  </div>
                  <div className="form-col">
                  <label>Confirm Password </label>
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                  
                      variant="outlined"
                      value={values.confirmPassword}
                      inputProps={{ className: "small" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{backgroundColor:'white',height:'40px',width:'600px'}}
                    
                    />
                    <ValidationErrorMessage
                      message={errors.confirmPassword}
                      touched={touched.confirmPassword}
                    />
                  </div>
               
                
                <div style={{marginLeft:"15px",marginTop:"20px"}}>
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                    onClick={() => {
                     navigate("/BookListing");
                    }}
                  style={{width:'100px'}}
                >
                  Save
                </Button>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/BookListing");
                  }}
                style={{marginLeft:"10px",width:"100px"}}
                >
                  Cancel
                </Button>
                </div>
              </div>
             
            </form>
          )}
        </Formik>
      </div>
    </div>

  );
};

export default UpdateProfile;
