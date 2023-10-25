import { Troubleshoot } from "@mui/icons-material";
import Axios from "./connection";
import { useState } from "react";


export const loginUser = async (UserName, Password) => {



  try {
    const response = await Axios.post('/User/login', { UserName, Password });

    localStorage.setItem("LoggedIn" , true)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("UserID" , response.data.user.UserID)
    localStorage.setItem("type" , response.data.user.RolesID)
    return true;


  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'Not Authorized No Token.') {
        const errorMessage = error.response.data.message + ' Please Login First';
        alert(errorMessage);
        window.location.href = '/';
      } else if (error.response.data.message === 'UnAuthorized Token.') {
        const errorMessage = "You don't have access to this page.";
        alert(errorMessage);
        window.location.href = '/Home';
      } else {
        alert(error.response.data.message);
      }
    } else {
      alert("An error occurred. Please try again later.");
    }
    
    return null; // Return null in case of an error
  }
}

export const LoginCustomer = async (CNICNo = null , FileNo = null) => {



  try {
    const response = await Axios.post('/Customer/login', { CNICNo , FileNo });

    localStorage.setItem("CNICNo" , CNICNo)

    return true;


  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'Not Authorized No Token.') {
        const errorMessage = error.response.data.message + ' Please Login First';
        alert(errorMessage);
        window.location.href = '/';
      } else if (error.response.data.message === 'UnAuthorized Token.') {
        const errorMessage = "You don't have access to this page.";
        alert(errorMessage);
        window.location.href = '/Home';
      } else {
        alert(error.response.data.message);
      }
    } else {
      alert(error.response.data.message);
    }
    
    return null; // Return null in case of an error
  }
}

export const loginAgent = async (token) => {



  try {
    const response = await Axios.post('/AgentRecord/login', { token });

    localStorage.setItem("Name" , response.data.AgentName)
    localStorage.setItem("LoggedIn" , true)
    
    return true;


  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'Not Authorized No Token.') {
        const errorMessage = error.response.data.message + ' Please Login First';
        alert(errorMessage);
        window.location.href = '/';
      } else if (error.response.data.message === 'UnAuthorized Token.') {
        const errorMessage = "You don't have access to this page.";
        alert(errorMessage);
        window.location.href = '/Home';
      } else {
        alert(error.response.data.message);
      }
    } else {
      alert(error.response.data.message);
    }
    
    return null; // Return null in case of an error
  }
}