import React from 'react'
import img from './public/trybg.png'

const ApiSetUp = ({input_Key,setinput_Key,onSubmit}) => {
  return (
<div style={{ backgroundImage: `url(${img})` }} className="bg-cover bg-center min-h-screen overflow-hidden">
        <div className='max-w-6xl mx-auto py-32'>
            <h2 className='text-4xl text-white font-semibold montserrat'>Welcome to BOOKS</h2>
            <p className='text-lg montserrat font-light text-white'>Ai powered suggestions that match your feelings.</p>
            <form onSubmit={onSubmit}>
                <p className='text-lg montserrat font-light text-white'>Get your Api Key</p>
                <p className='text-lg montserrat font-light text-white underline'>
                  <a href='https://aistudio.google.com/app/apikey' target='_blank'>Ai Studio</a></p>
             <br/>
             <br/>
                <input
                 value={input_Key}
                 
                 onChange={(e)=>{setinput_Key(e.target.value)
                    console.log(e.target.value)}
                 }
                className='bg-white p-4 w-full rounded-full montserrat' type='text' placeholder='Enter your Api Key please'></input>
                <button type='submit' className='bg-white text-black px-4 py-2 rounded-full my-6 montserrat'>Submit</button>
            </form>
        </div>
    </div>      
  )
}

export default ApiSetUp