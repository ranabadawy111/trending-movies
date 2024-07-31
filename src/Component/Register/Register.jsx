import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router';
import joi from "joi";

export default function Register() {

    let [user, setUser] = useState({
        first_name: "",
        last_name: "",
        age: "",
        email: "",
        password: ""
    });

    let navigate = useNavigate();

    let [errorMsg, setErrorMsg]=useState("");

    let [errorList, setErrorList]=useState([]);

    let [loading, setLoading]= useState(false);

    function getFormValue(e)
    {
        let myUser={...user};
        myUser[e.target.name]= e.target.value;
        setUser(myUser);
    }
    function goToLogin(){
        navigate("/login")
    }
    
    function validateForm(){
        let schema = joi.object({
            "first_name": joi.string().required().alphanum().min(2).max(10),
            "last_name": joi.string().required().alphanum().min(2).max(10),
            "age": joi.number().required().min(20).max(60),
            "email": joi.string().required().email({tlds:{allow:["net", "com"]}}),
            "password": joi.string().required().required().pattern(new RegExp(/^[a-z][0-9]{3}$/))
        });
        return schema.validate(user, {abortEarly:false});
    }

    async function submitFormData(e){
        e.preventDefault();
        setLoading(true)
        let validateResponse= validateForm();
        if(validateResponse.error){
            setErrorList(validateResponse.error.details);
        }else{
            let {data}= await axios.post("https://movies-api.routemisr.com/signup", user);
            if(data.message== "success"){
                goToLogin();
            }
            else{
             setErrorMsg(data.message);
            }
        }
        setLoading(false);
    }
    return (
        <>
           <div className="w-75 my-4 m-auto">
           <h1>Register Form</h1>
           {errorList.map((error, index)=>
           index ==4?<div className="alert alert-danger">Password Invalid</div>:
           <div className="alert alert-danger">{error.message}</div>)}
           {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
           
            <form onSubmit={submitFormData}>
                <div className="input-gp my-3">
                    <label htmlFor="first_name">First Name</label>
                    <input onChange={getFormValue} className="form-control" type="text" name="first_name" id="first_name"/>
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="last_name">Last Name:</label>
                    <input onChange={getFormValue} className="form-control" type="text" name="last_name" id="last_name"/>
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="age">Age:</label>
                    <input onChange={getFormValue} className="form-control" type="number" name="age" id="age"/>
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="email">Email:</label>
                    <input onChange={getFormValue} className="form-control" type="email" name="email" id="email"/>
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="password">Password:</label>
                    <input onChange={getFormValue} className="form-control" type="password" name="password" id="password"/>
                </div>
                <button className="btn btn-info float-end" type="submit">
                    {loading?<i className="fa fa-spinner fa-spin"></i>:"Register"}
                </button>
                <div className="clear-fix"></div>
            </form>
           </div> 
        </>
    )
}
