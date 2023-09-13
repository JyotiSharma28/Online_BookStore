import { Button, MenuItem,Select,Typography } from '@material-ui/core';
import React from 'react';
import {Formik,Field, Form} from 'formik'
import  * as Yup from 'yup';
import authService from '../service/authservice';
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ValidationErrorMessage from '../ValidationErrorMessage';
import  '../Registration/Registrationstyle.css';
import request from '../service/request'

const roles = [{ rid: 1, role: "seller" },
{ rid: 2, role: "buyer" }]

const initialValues={
  firstName:"",
  lastName:"",
  email:"",
  roleId:0,
  password:"",
  confirmPassword:""
}

const validationSchema=Yup.object().shape({
      email:Yup.string()
      .email("Invalid email address formate")
      .required("Email is required"),
      password:Yup.string()
      .min(5,"Password must be 6 characters at  minimum")
      .required("Password is required "),
      confirmPassword:Yup.string()
      .oneOf(
        [Yup.ref(" password"),null],
        "Password and Confirm Password must be match."
      )
      .required("Confirm Password is required"),
      firstName:Yup.string().required("First name is required"),
      lastName:Yup.string().required("Last name is required"),

})


  //console.log("Submitted",data);
  //  fetch("https://book-e-sell-node-api.vercel.app/api/register",{
  //    method:'POST',
  //    headers:{
  //     "Content-Type":"application/json"
  //    },
  //    body:JSON.stringify(data)
  //  })
  //  .then((res)=>res.json())
  //  .then((res)=>console.log("API result",res));


const Registration = () => {

   // const navigate=useNavigation();

   const navigate = useNavigate();
  const onSubmit=(data)=>{
        //console.log("data",data)
        delete data.confirmPassword
        
        authService.create(data).then((res)=>{
          toast.success(" Registration Successfully ")
          navigate("/Login");
         });
    } 
  // const signup = async (values) => {
    
  //   const data = JSON.parse(JSON.stringify(values))

  //   delete data.confirmPassword

  //   try {
  //       let res = await request({
  //           method: "POST",
  //           url: "/api/user",
  //           data: JSON.stringify(data)
  //       })
  //       toast.success("Register successFully")
  //       //navigate('/Login')
  //   } catch (error) {
      

  //   }

  // }

  return (

    <div style={{width:'60%',backgroundColor:'#ccc',borderRadius:'15px',margin:'auto',padding:"10px"}}>
      
        <Typography style={{textAlign:'center',fontWeight:'bold'}} variant='h4'> Create an Account</Typography>
            
        <div style={{marginLeft:'10px',padding:'20px'}} >
            
              <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit
                  })=>(
                    
                <Form  style={{justifyContent:'center'}} onSubmit={handleSubmit}> 
                <div style={{width:'80%',margin:'auto'}}>
                
                    <p style={{color:'gray'}} >please enter the following information to Create your account</p>
                        <label  htmlfor="firstname">First Name*</label>
                        <br/>
                        <Field
                            name="firstName"
                            type="text"
                            className="input"
                            placeholder="First Name"
                            variant='outlined'
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        <br/>
                        <ValidationErrorMessage 
                          message={errors.firstName}
                          touched={touched.firstName}
                        />
                        <label>Last Name*</label>
                        <br/>
                        <Field
                            name="lastName"
                            type="text"
                            className="input"
                            placeholder="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        <br/>
                        <ValidationErrorMessage 
                          message={errors.lastName}
                          touched={touched.lastName}
                        />
                        <label htmlfor="Email">Email Address*</label>
                        <br/>
                        <Field
                            name="email"
                            type="email"
                            className="input"
                            placeholder="xyz@gmail.com"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{width:'100%'}}
                          />
                        <br/>
                        <ValidationErrorMessage 
                          message={errors.email}
                          touched={touched.email}
                        />
                        <label htmlFor='role'>Role</label>
                        <br/>
                        <Select  
                              variant="standard"
                              name='roleId'
                              value={values.roleId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{width:'100%',
                                      height: '40px',
                                      fontSize: '15px',
                                      backgroundColor:'white',
                                      }}
                          >
                               {
                                     roles.map((role, idx) => <MenuItem key={idx} value={role.rid}>{role.role}</MenuItem>)
                                }
                          </Select>
                        
                        <br/>
                    <div >
                          <label htmlFor="password">Password*</label>
                          <br/>
                          <input
                                type="password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                          <ValidationErrorMessage 
                            message={errors.password}
                            touched={touched.password}
                          />
                          
                        </div>
                        
                          <label  htmlFor="confirmpassword" >Confirm Password*</label>
                          <br/>
                          <input
                              type="password"
                              name="confirmPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          <br/>
                          <ValidationErrorMessage 
                            message={errors.confirmPassword}
                            touched={touched.confirmPassword}
                          />
                         
                      <Button 
                          type='submit' 
                          variant="contained" 
                          color="primary"
                          style={{px:'20px',margin:'8px',marginLeft:'0px'}}
                          onClick={handleSubmit}
                       >
                        Register
                      </Button> 
                </div>
                </Form>
              )}
            </Formik>
             
        </div>
        
    </div>
    
    
  )
}

export default Registration;
