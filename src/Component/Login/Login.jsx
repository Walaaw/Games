import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import register from "../../images/gaming.ebaf2ffc84f4451d.jpg";
import { useState } from "react";
import Joi, { number } from "joi";
import axios from "axios";
export default function Login({getLoggeduser}) {
  const navigator=useNavigate();
    const [authmsg, setauthmsg] = useState("")
    const [error, seterror] = useState(null)
    const [user, setuser] = useState( { 
        email:"",
        password:""
    })
    function validData(e){
      e.preventDefault();
        const schema= Joi.object({ 
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
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
        setauthmsg(null)
        console.log(user);
    }
    async function callapi(){
      let {data}= await axios.post("https://sticky-note-fe.vercel.app/signin",user);
      console.log(data.message);
      if(data.message==="success"){
        localStorage.setItem('token',data.token);
        getLoggeduser();
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
                    <div class="col-md-12 mt-3">
                      <input onChange={getuser} type="email" class="form-control bg-white text-black" placeholder="Email Address" name="email"
                      />
                       {getSpicifcError("email")?<div className="alert alert-danger m-2 "> {getSpicifcError("email")}</div>:''}
                    </div>
                    <div class="col-md-12 mt-3">
                      <input onChange={getuser} type="password" class="form-control bg-white text-black" placeholder="Password" name="password"
                      />
                       {getSpicifcError("password")?<div className="alert alert-danger m-2 "> {getSpicifcError("password")}</div>:''}
                    </div>
                    <div className="col-md-12 mt-3">
                    <button className="btn p-2 w-100 "> Login</button>
                    </div>
                  </div>
                </form>
                <div>
                    <p className="text-center  text-muted fw-bold mt-5">Not a member yet?  <Link className=" text-decoration-none " to="/register">Create Account</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

