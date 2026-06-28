import React from 'react'
import img from './public/bg.png'

const Login = ({email,setemail,password,setPassword,onClick,handleregister}) => {

  return (

 <div className="flex items-center justify-center p-8 min-h-screen bg-black"> 

  <div className=" border border-gray-200 rounded-xl p-8 w-90 bg-white shadow-sm">
    
    <h2 className="text-xl font-semibold text-gray-800">Sign in</h2>
    <p className="text-gray-400 mt-1 mb-6">Welcome back</p>
    <form onSubmit={(e)=>onClick(email,password,e)}>
    <label className="text-sm font-medium text-gray-600">Email</label>
    <input value={email} onChange={(e)=>setemail(e.target.value)} placeholder="your username"
      className="w-full block mt-1 mb-4 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />

    <label className="text-sm font-medium text-gray-600">Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••••"
      className="w-full block mt-1 mb-6 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />

    <button type='submit' className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors">
      Sign in
    </button>
    </form>

    <p className="text-center mt-4 text-sm text-gray-400">
      Don't have an account? <button  onClick={()=>handleregister(email,password)} className='bg-white text-black border-black' > register</button>
    </p>

  </div>
</div>
  )
}

export default Login
