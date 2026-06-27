import React from 'react'
import homeIcon from './public/icon.jpg'
import Keyimg from './public/key.jpg'


const Navbar = ({api_page}) => {
  return (
    <div className='flex min-w-screen bg-black'>
     <div>
      <a href='https://google.com' target='_blank'>
      <img className="p-2 h-20 rounded-[40px]" style={{ filter: 'saturate(1.5) contrast(1.2)' }} src={homeIcon}/>
      </a>
      </div>
      <div className='p-2 rounded-2xl relative flex bg-black opacity-65 min-w-350'>
        <h1 className='bg-black  text-3xl opacity-100 subpixel-antialiased absolute bottom-5 left-10 text-green-500 font-bebas'>HELLO!!!</h1>

        <div className='grid grid-cols-3 gap-6 absolute bottom-5 right-5 text-3xl opacity-100 subpixel-antialiased 
         text-green-500 font-bitcount underline underline-offset-4 decoration-green-500 decoration-dashed 
         '>

        <h1 className='hover:scale-100 hover:text-green-300 hover:font-bebas transition-all duration-200 cursor-pointer'>login</h1>
        <h1 className='hover:scale-100 hover:text-green-300 hover:font-bebas  transition-all duration-200 cursor-pointer'>Book</h1>
        <button onClick={api_page}>
        <h1 className='hover:scale-100 hover:text-green-300 hover:font-bebas transition-all duration-200 cursor-pointer'>kEY!</h1>
        </button>
        </div>
      </div>
      <div>
      <a href='https://google.com' target='_blank'>
      <img className="h-20 ps-1 p-1 rounded-2xl" style={{ filter: 'saturate(1.5) contrast(1.2)' }} src={Keyimg}/>
      </a>
      </div>

    </div>
  )
}

export default Navbar
