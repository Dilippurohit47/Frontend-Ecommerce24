import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {FcGoogle} from 'react-icons/fc'
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { messageResponse } from '../types/api-types';
import { useNavigate } from 'react-router-dom';
const Login = () => {

const [gender , setgender]  = useState("");
const [date , setdate]  = useState("");


const  [login] = useLoginMutation()

const navigate  = useNavigate();


const loginHandler= async() =>{
    try {

        const provider = new GoogleAuthProvider();
       const {user} =  await signInWithPopup(auth , provider);

  const res = await login({
        name : user.displayName!,
        email : user.email!,
        photo : user.photoURL!,
        gender ,
        dob: date,
        _id : user.uid,
         role : "user",

       })


if("data" in res){
    console.log(res)

    toast.success(res.data.message)
    console.log("login",res)
    navigate("/")


}
else{
    const error = res.error as FetchBaseQueryError
    const message  = (error.data as messageResponse).message;
    toast.error(message)

}


       console.log(user);

        
    } catch (error) {

        toast.error("Sign In Failed")
    }

} 

  return (
    <div className='login'>
<main>
<h1 className='heading'>Login</h1>
<div>
    <label >Gender</label>
    <select value={gender} onChange={(e)=> setgender(e.target.value)}>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>

</div>
<div>
    <label >Date of birth</label>
   <input type="date"  value={date} onChange={(e)=>setdate(e.target.value)}/>

</div>

<div>
    <p>Already Signed in Once</p>
    <button onClick={loginHandler}>
        <FcGoogle/> <span>Sign in with google</span>
    </button>
</div>



</main>
      
    </div>
  )
}

export default Login
