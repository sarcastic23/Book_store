import React from 'react'
import bg from './public/bg.png'

const Result = ({books,Store}) => {
  return (
     <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover bg-center min-h-screen overflow-hidden">
      {/* <p className="text-white">Book count: {books.length}</p> */}
      {books.map((book, index) => (   // ← key here (1)
       <div key={index} className=' text-white p-8 mb-8 rounded-3xl'>
      
      {/* Title */}
      <div className='flex items-center gap-4 mb-4'>
        <span className='text-6xl'>{book.emoji}</span>
        <h2 className='text-3xl font-bitcount'>{book.name}</h2>
      </div>

      {/* Description */}
      <p className='text-neutral-400 text-2xl bg-black p-6 ps-6 rounded-b-4xl font-bebas active:font-bitcount mb-6'>{book.description}</p>

      {/* Badges */}
      <div className='flex gap-3 mb-8'>
        <span className='bg-neutral-700 px-4 py-2 rounded-full text-sm font-playwrite'>⏱ {book.readtime}</span>
        <span className='bg-neutral-700 px-4 py-2 rounded-full text-sm font-playwrite'>💪 {book.difficulty}</span>
      </div>

      
      <div className='bg-neutral-700 rounded-2xl p-6 mb-6'>
        <h3 className='text-xl font-playwrite mb-4'>📚 topics</h3>
        <ul className='space-y-2'>
          {book.topics?.map((top, i) => (
            <li key={i} className='flex items-center gap-2 text-neutral-300 font-bitcount'>
              <span className='text-green-400'>✓</span> {top}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className='bg-neutral-700 rounded-2xl p-6'>
        <h3 className='text-xl font-playwrite mb-4'> ⚙️ Steps</h3>
        <ol className='space-y-3'>
          {book.steps?.map((step, i) => (
            <li key={i} className='flex gap-3 text-neutral-300 font-bitcount'>
              <span className='bg-neutral-600 rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0'>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        
        <button onClick={()=>Store(book)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all ml-auto">
          <span>⚡</span>
          Add to chart
        </button>
      
      </div>

     </div>
     ))}
    </div>
  )
}

export default Result
