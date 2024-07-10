'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Login() {
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const [disableButton,setDisableButton]=useState(true)

  const onSignup=async()=>{
     try {
        setLoading(true)
        const response=await axios.post('/api/users/login',user)
        console.log("Logged in successfully ",response.data)
        router.push('/')
     } catch (error:any) {
        console.log("Error while logggin")
        toast.error(error.message)
     }
  }

  useEffect(()=>{
    if(user.password.length>0 && user.email.length>0){
      setDisableButton(false)
    }
    else {
      setDisableButton(true)
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? "Processing..." :"Login "}</h1>
      <hr/>
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
        {disableButton? "Fill the form ":"Login"}
       </button>
       <Link href='/signup'>Visit signup page</Link>
    </div>
  )
}
