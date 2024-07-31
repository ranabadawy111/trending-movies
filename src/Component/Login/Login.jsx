import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router';
import joi from "joi";

export default function Login(props) {

    let [user, setUser]=useState({
        email: "",
        password: ""
    });

    let navigate= useNavigate();

    let [errorMsg, setErrorMsg]= useState("");

    let [listError, setListError]= useState([]);

    let [loading, setLoading]= useState(false);
    function goToHome(){
        navigate("/home");
    }

    function getFormValue(e){
        let myUser={...user};
        myUser[e.target.name]= e.target.value;
        setUser(myUser);
    }

    function validateForm(){
        let schema =joi.object({
            "email": joi.string().required().email({tlds:{allow:["com", "net"]}}),
            "password": joi.string().required().pattern(/^[a-z][0-9]{3}$/)
        });
        return schema.validate(user, {abortEarly:false});
    }

    async function submitFormData(e){
        e.preventDefault();
        setLoading(true);
        let validateResponse= validateForm();
        if(validateResponse.error){
            setListError(validateResponse.error.details);
        }
        else{
            let {data}= await axios.post("https://movies-api.routemisr.com/signin", user);
            if(data.message== "success"){
                localStorage.setItem("userToken", data.token); // داتا متشفرة
                props.saveUserData(); // الداتا فكيت التشفير بتاعها وبرضو محفوظة فالوكال 
                goToHome();
            }
            else{
                setErrorMsg(data.message);
            }
        }
        setLoading(false);
    }
    return (
        <>
           <div className="w-75 my-5 m-auto">
                <h1>Login Form</h1>
                {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
                {listError.map((error, i)=> 
                    i ===1?<div className="alert alert-danger">Password Invalid</div>:
                    <div className="alert alert-danger">{error.message}</div>)}
                    <form onSubmit={submitFormData}>
                    <div className="input-gp my-3">
                        <label htmlFor="email">Email</label>
                        <input onChange={getFormValue} className="form-control" type="email" name="email" id="email"/>
                    </div>
                    <div className="input-gp my-3">
                        <label htmlFor="password">Password</label>
                        <input onChange={getFormValue} className="form-control" type="password" name="password" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-info float-end">
                        {loading?<i className="fa fa-spinner fa-spin"></i>:"Login"}    
                    </button>
                    <div className="clear-fix"></div>
                </form>
           </div>
        </>
    )
}
