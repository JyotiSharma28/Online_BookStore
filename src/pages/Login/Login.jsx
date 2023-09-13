import { Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Loginstyle.css'
import { Formik,Field,Form } from 'formik';
import  * as Yup from 'yup';
import ValidationErrorMessage from '../ValidationErrorMessage'
import authService from '../service/authservice';
import { toast } from 'react-toastify';
//import request from '../service/request'
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import { authContext } from '../../App';
import { useAuthContext } from '../../Context/authContext';


const Login = () => {

  const navigation=useNavigate();
  const authContext=useAuthContext();


  const initialValues={
    email:"",
    password:"",
  }
  
  const validationSchema=Yup.object().shape({
    email:Yup.string()
    .email("Email is Invalid")
    .required("Email is required"),
    password:Yup.string()
    .min(5,"Password must be 5 characters at  minimum")
    .required("Password is required "),
  })
  
  // const login = async (values) => {
  //   const data = JSON.parse(JSON.stringify(values))
  
    
  //   data.firstName='hf'
  
  //   try {
  //       let res = await request({
  //           method: "POST",
  //           url: "/api/user",
  //           data: JSON.stringify(data)
  //       })
  //       toast.success("Login successFully")
  //   } catch (error) {
  
  //   }
  
  // }
  
  const onSubmit=(data)=>{
      //console.log("data",data)
      authService.login(data).then((res)=>{
        toast.success(" Login Successfully ")
         authContext.setUser(res);
         navigation('/BookListing');
       });
  }
  
  return (
    <div className='container'>
      <div style={{padding:'20px',borderRadius: '4px',border: '1px solid red'}}>
          {/* <div>
      <Breadcrumbs  separator=">"  aria-label='breadcrumb' className='bredcrumb-wrapper'>
          <Link color="inherit" href="/" title="home" style={{fontSize:'large'}}>Home</Link>
          <Typography color="textPrimary"  style={{fontSize:'large'}} >Login</Typography>
      </Breadcrumbs>
          </div> */}

          <Typography style={{textAlign:'center',fontWeight:'bold',fontSize:"50px"}}>Login</Typography>
          <p style={{color:'gray'}} > If you have an account with us please log in</p>
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

            <Form style={{backgroundColor:'Background'}} onSubmit={handleSubmit}>
                   <div   >
                    <div >
                        <label htmlfor="Email">Email Address*</label>
                              <br/>
                              <Field
                                  name="email"
                                  type="email"
                                  className="input"
                                  autoComplete="off"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  variant="outlined"
                                />
                                <ValidationErrorMessage 
                                  message={errors.email}
                                  touched={touched.email}
                                />
                              <br/>
                      </div>
                             
                        <div style={{marginTop:'0px'}}>
                          <label >Password*</label>
                          <br/>
                          <input
                                type="password"
                                name="password"
                                style={{width:'400px' }}
                                autoComplete="off"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  variant="outlined"
                               
                              />
                              <ValidationErrorMessage 
                                  message={errors.password}
                                  touched={touched.password}
                               />
                        </div>
                        <Button 
                          type='submit' 
                          variant="contained" 
                          color="primary"
                          style={{px:'50px',marginTop:'20px'}}
                          disableElevation
                          onClick={handleSubmit}
                       >
                        Login
                      </Button> 
                        </div>
                  </Form>
                 )}
              </Formik>
          </div>
    </div>
  )
}
export default Login;
