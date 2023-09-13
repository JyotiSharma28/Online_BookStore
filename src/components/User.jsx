  import { Box, Button,Typography} from "@material-ui/core";
import React, { useEffect, useState } from "react";

  //function

const User=({fun})=>{

  var [age,setage]=useState(0);
  var [Value,setValue]=useState("");
  var [error,seterror]=useState("");
  
  const incage=()=>{
    setage(age+1)
  }

  const decage=()=>{
    if(age>0){
      setage(age-1)
    }
    
  }

  const reset=()=>{
    setage(age=0)
  }

  // useEffect( ()=>{
  //   alert("age is update")
  // } , [age])

  useEffect(()=>{
if(Value.length <10){
    seterror("value length must be more than 10")
}
else{
  seterror("");
}
  },[Value])
   
  return(
        <React.Fragment>
        <div style={{textAlign:'center'}}>
        <h1>User Component  </h1>

        <Typography variant='h4'>
              Jyoti
        </Typography>
        <Box >
          <p> age: {age}</p>
          <Button onClick={incage} variant="contained" color="primary" style={{margin:'5px'}}> Incerement </Button>
          
          <Button onClick={decage} variant="contained" color="primary"style={{margin:'5px'}}> Decrement </Button>
          <Button onClick={reset} variant="contained" color="primary" style={{margin:'5px'}}> reset </Button>
        </Box>
        <div>
        <Button onClick={fun}  variant="contained" color="secondary" style={{color:'white'}}> click </Button>
            {/* <Button variant="contained" color="primary">Success</Button> */}    
        
        </div>
        <input onChange={(e)=>setValue(e.target.value)} />
        <br />
        <p> error is : {error && error}</p>
        </div>
        </React.Fragment>
    );
      
  };

export default User;


  

  