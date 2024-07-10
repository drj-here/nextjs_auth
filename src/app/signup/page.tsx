'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Signup() {
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:""
  })
  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const [disableSignupButton,setDisableSignupButton]=useState(true)

  const onSignup=async()=>{
     try {
        setLoading(true)
        const response=await axios.post('/api/users/signup',user)
        console.log("Signup success ",response.data)
        router.push('/login')
        
     } catch (error:any) {
        console.log("Error while signing up")
        toast.error(error.message)
     }
  }

  useEffect(()=>{
    if(user.username.length>0 && user.password.length>0 && user.email.length>0){
      setDisableSignupButton(false)
    }
    else {
      setDisableSignupButton(true)
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? "Processing..." :"Signup "}</h1>
      <hr/>
      <label htmlFor='username'>Username</label>
      <input
       id='username'
       className='text-center border p-1 text-black rounded-md border-gray-300 focus:outline-none focus:border-gray-600'
       type='text'
       value={user.username}
       onChange={(e)=>setUser({...user,username:e.target.value})}
       placeholder='username'/>
       <label htmlFor='username'>Email</label>
      <input
       id='email'
       className='text-center border p-1 text-black rounded-md border-gray-300 focus:outline-none focus:border-gray-600'
       type='text'
       value={user.email}
       onChange={(e)=>setUser({...user,email:e.target.value})}
       placeholder='email'/>
       <label htmlFor='username'>Username</label>
      <input
       id='password'
       className='text-center border p-1 text-black rounded-md border-gray-300 focus:outline-none focus:border-gray-600'
       type='text'
       value={user.password}
       onChange={(e)=>setUser({...user,password:e.target.value})}
       placeholder='password'/>

       <button
       onClick={onSignup}
       className='text-black bg-blue-200 p-1 mt-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600'
       >
        {disableSignupButton? "Fill the form ":"Sign up"}
       </button>
       <Link href='/login'>Visit login page</Link>
    </div>
  )
}
