import React from "react";
import { Link, useNavigate} from "react-router-dom";
import register from "../../images/gaming.ebaf2ffc84f4451d.jpg";
import './Register.css'
import { useState } from "react";
import Joi, { number } from "joi";
import axios from "axios";
export default function Register() {
   const navigator=useNavigate();
    const [authmsg, setauthmsg] = useState("")
    const [error, seterror] = useState(null)
    const [user, setuser] = useState( { 
        first_name:"",
        last_name:"",
        age:"",
        email:"",
        password:""
    })
    function validData(e){
      e.preventDefault();
        const schema= Joi.object({ 
            first_name: Joi.string().required().min(3).max(20),
            last_name: Joi.string().required().min(3).max(20),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
            age: Joi.number().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
        })
      const errors =  schema.validate(user,{abortEarly:false})
      const msg=errors.error;
      if(msg===undefined){
          callapi();
      }
      else{
        let errorDetails=msg.details;
        seterror(errorDetails);
      }

    }
    function getuser(e){
        let userCopy={...user}
        userCopy[e.target.name]=e.target.value;
        setuser(userCopy);
        seterror(null);
        setauthmsg(null);
    }
    async function callapi(){
      let {data}= await axios.post(" https://route-egypt-api.herokuapp.com/signup",user);
      console.log(data.message);
      if(data.message==="success"){
        navigator( "/home");
      }
      else{
        setauthmsg(data.message);
        console.log(authmsg);
      }
    }
    function getSpicifcError(key){
      if (error!=null) {
        for (let i = 0; i < error.length; i++) {
         if(error[i].context.key===key){
          return error[i].message;
         }
        }
        return '';
      }
    }
  return (
    <>
      <section className=" px-5 register ">
        <div className="container mb-5 mt-4">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="item1 h-100 ">
                  <img src={register} alt="imgregister" className="w-100 h-100" />
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="item2 p-4 ">
                <h3 className="text-center text-dark">Creat My Acoount</h3>
                {authmsg?<div className=" alert alert-danger">{authmsg} </div>:''}
                <form  onSubmit={validData}>
                  <div class="row mt-3">
                    <div class="col">
                      <input onChange={getuser} type="text" class="form-control bg-dark text-white" placeholder="first_name" name="first_name"/>
                      {getSpicifcError("first_name")?<div className="alert alert-danger m-2 "> {getSpicifcError("first_name")}</div>:''}
                    </div>
                    <div class="col">
                      <input onChange={getuser} type="text" class="form-control bg-dark text-white" placeholder="last-name" name="last_name"/>
                      {getSpicifcError("last_name")?<div className="alert alert-danger m-2 "> {getSpicifcError("last_name")}</div>:''}
                    </div>
                    <div class="col-md-12 mt-3">
                      <input onChange={getuser} type="email" class="form-control bg-dark text-white" placeholder="Email Address" name="email"
                      />
                       {getSpicifcError("email")?<div className="alert alert-danger m-2 "> {getSpicifcError("email")}</div>:''}
                    </div>
                    <div class="col-md-12 mt-3">
                      <input onChange={getuser}  type="number" class="form-control bg-dark text-white" placeholder="Age" name="age"
                      />
                       {getSpicifcError("age")?<div className="alert alert-danger m-2 "> {getSpicifcError("age")}</div>:''}
                    </div>
                    <div class="col-md-12 mt-3">
                      <input onChange={getuser} type="password" class="form-control bg-dark text-white" placeholder="Password" name="password"
                      />
                       {getSpicifcError("password")?<div className="alert alert-danger m-2 "> 
                       password required and must be 8 character minmum</div>:''}
                    </div>
                    <div className="col-md-12 mt-3">
                    <button className="btn p-2 w-100 "> Creat Acount</button>
                    </div>
                  </div>
                </form>
                <div>
                    <p className="text-center text-muted py-3 border-bottom border-1 border-white">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                </div>
                <div>
                    <p className="text-center  text-muted fw-bold">Already a member? <Link className=" text-decoration-none " to="/login"> Log In</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
