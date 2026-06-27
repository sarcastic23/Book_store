import React from 'react'
import luffy from './public/luffy.png'
const NewCard = ({moods,onMoodSelect,custom_mood,setcustom_mood,handleCustomMood}) => {
  return (
    <div className='flex flex-wrap gap-4 min-h-screen '>
      <img className='-translate-y-15 -translate-x-7' src={luffy}/>
      <div className='h-50 opacity-50 ml-auto mr-10 translate-y-10'>
        <h1 className='text-8xl text-white font-bebas translate-x-12'>what</h1>
        <h1 className='text-5xl text-green bg-white ps-2 p-2 rounded-3xl font-bitcount hover:font-bebas translate-x-20'> are u</h1>
        <h1 className='text-7xl text-white font-bebas'>Gonna watch</h1>
        <h1 className='text-7xl text-white font-bitcount translate-x-5 hover:font-bebas'>TODAY!!</h1>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-2 gap-7 translate-y-15 -translate-x-5 '>
      
            {moods.map((mood)=>( 
                <button 
                key={mood.id}
                onClick={()=>onMoodSelect(mood)}
                
                className='bg-neutral-900 p-6 rounded-2xl hover:scale-110 hover:text-green-300 hover:bg-white transition-all duration-200 cursor-pointer'>
                    <div className='text-3xl'>{mood.emoji}</div>
                    <div className='text-2xl text-white hover:text-green-500 hover:text-2xl'>{mood.label}</div>
                </button>

                ))}
          </div>
        </div>
      </div>
     
    <form onSubmit={handleCustomMood} className='my-10 ml-270 opacity-50'>

     <input value={custom_mood} onChange={(e)=>setcustom_mood(e.target.value)} type='text' placeholder='tell ur mood' className='w-full p-4 rounded-full bg-black text-white font-bebas text-2xl translate-x-20'></input>
     <button type='submit' className='bg-black text-white px-4 py-2 rounded-full my-5 translate-x-70 text-2xl font-bebas '>Generating</button> 

    </form>
     

    </div>
  )
}

export default NewCard
