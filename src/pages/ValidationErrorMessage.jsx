import React from 'react'

const ValidationErrorMessage = (props) => {
  return (
    <>{props.touched && <p style={{color:'red',fontSize:'13px',margin:'0px'}}>{props.message}</p>}</>
  )
}

export default ValidationErrorMessage

