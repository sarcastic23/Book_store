import { useState,useEffect } from 'react'
import Navbar from './components/navbar'
import NewCard from './components/newCard'
import img from './components/public/trybg.png'
import ApiSetUp from './components/ApiSetup'
import Result from './components/result'
import bg from './components/public/bg.png'
import Login from './components/login'

const App = () => {
  //for apis
  const [api,setapi]=useState(false)
  const [input_Key,setinput_Key]=useState('')
  const [api_key,setapi_key]=useState('')

  const[fetching,setfetching]=useState(false)

  //for moods
  const[custom_mood,setcustom_mood]=useState('')

  //for books
  const[book,setbook]=useState([])
  const[results,setresults]=useState(false)
  const[offline,setOffline]=useState(false)

  //local api /offline:
  const[passMood,setPassMood]=useState('')
  
  //loged in
  const[logedin,setlogedin]=useState(true)
  const[register,setregister]=useState(false)
  const[email,setemail]=useState('')
  const[password,setPassword]=useState('')
  const[token,setToken]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDBlMmEzZTlhMGMzMDg2NzMyMDczNyIsInVzZXJuYW1lIjoiQWF5dXNoIiwiaWF0IjoxNzgyODMwMDI0LCJleHAiOjE3ODI5MTY0MjR9.TaBn15aaBH_Fp3MeYfSWYeFh60ir7Oluk3iD7OtJMUU')
 
  useEffect(()=>{
    if(api_key){
      localStorage.setItem("apiKey",api_key)
    }

  },[api_key])
   
  useEffect(() => {
  if(offline){
    fetch_getBook(passMood)
  }
}, [offline])  // ← only runs when offline changes, not every render


//  const MOODS = [
//     { id: "Horror", emoji: "😄", label: "Horror", color: "from-yellow-400 to-orange-400", bg: "bg-yellow-50", border: "border-yellow-300" },
//     { id: "Sci-fy", emoji: "🧸", label: "Sci-fy", color: "from-amber-400 to-brown-400", bg: "bg-amber-50", border: "border-amber-300" },
//     { id: "comedy", emoji: "🌍", label: "Comedy", color: "from-green-400 to-teal-500", bg: "bg-green-50", border: "border-green-300" },
//     { id: "action", emoji: "💕", label: "Action", color: "from-pink-400 to-rose-500", bg: "bg-pink-50", border: "border-pink-300" },
//     { id: "philosophy", emoji: "😤", label: "Philosophy", color: "from-purple-400 to-indigo-500", bg: "bg-purple-50", border: "border-purple-300" },
//     { id: "documentary", emoji: "😔", label: "Documentary", color: "from-blue-400 to-cyan-500", bg: "bg-blue-50", border: "border-blue-300" },
//     { id: "research", emoji: "⚡", label: "Research", color: "from-red-400 to-orange-500", bg: "bg-red-50", border: "border-red-300" },
//     { id: "creative", emoji: "🛋️", label: "Creative", color: "from-slate-400 to-gray-500", bg: "bg-slate-50", border: "border-slate-300" },
//     { id: "romance", emoji: "🛋️", label: "Romance", color: "from-slate-400 to-gray-500", bg: "bg-slate-50", border: "border-slate-300" },
//     { id: "Tantra", emoji: "🛋️", label: "Tantra", color: "from-slate-400 to-gray-500", bg: "bg-slate-50", border: "border-slate-300" },
//   ];

    const MOODS=[
      { id: "horror",       emoji: "👻", label: "Horror" },
      { id: "Sci-fy",       emoji: "🚀", label: "Sci-fi" },
      { id: "comedy",       emoji: "😂", label: "Comedy" },
      { id: "action",       emoji: "⚔️", label: "Action" },
      { id: "philosophy",   emoji: "🧠", label: "Philosophy" },
      { id: "documentary",  emoji: "🎥", label: "Documentary" },
      { id: "research",     emoji: "🔬", label: "Research" },
      { id: "creative",     emoji: "🎨", label: "Creative" },
      { id: "romance",      emoji: "❤️", label: "Romance" },
      { id: "Sanatan",      emoji: "🕉️", label: "Sanatan" },
    ]

  const fetchbook=async(moodLabel)=>{
    setfetching(true)
try{
    const prompt =`You are a book selector based on genere of book which is  ${moodLabel},rightnow
    suggest 2 books that match the genere.
    For each book,return a json obj wth :
    -name:string(name of book)
    -genere:String(genere of the book)
    -emoji:string(1 fitting emoji)
    -description:string(1 sentence abt the book and link to genere)
    difficulty:string{"EASY","MEDIUM","HARD"}
    -readtime:string(eg.3mins)
    -topics:array of string(4-5 clear topics or concepts)
    -steps:array of string(steps to buy or get online)
    Return only a valid JSON array of 2 recepies, no markdown,no extratexts`
    

  
  
  const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',{
    method:"POST",
    headers:{"Content-Type":"application/json","x-goog-api-key":api_key},
    body:JSON.stringify({
      contents:[{parts:[{text:prompt}]}],
      generationConfig:{temperature:0.2,maxOutputTokens:8192}
    })
  })

    if(!response.ok){
      const err=await response.json();
      console.log(err)
      setPassMood(moodLabel)
      setOffline(true)

    }
    //if success
    const data =await response.json()
    const text=data.candidates[0]?.content?.parts[0]?.text
    console.log(text)
    if(!text) throw new Error("No response from gemini")
    const cleaned=text.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim()
    const parsed=JSON.parse(cleaned);
    setbook(parsed)
    setresults(true)


}catch(err){
  console.log(err)
}
finally{
  setfetching(false)
}
  }

  const fetchStorebook=async(book)=>{

  const response = await fetch('http://localhost:3000/books', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`   // ← your jwt token
    },
   
    body: JSON.stringify({
      name:book.name,
      genere:book.genere,
      emoji:book.emoji,
      description:book.description,
      difficulty:"Hard",
      readtime:"4 HRs",
      topics:["Wont give u the spoilers", "nice bro"],
      steps:["BUY And read yourself","i dont know"],
      price:400,
      Stored_by:"testuser"
    })
    
  })

  const data = await response.json()
  console.log(data)
      




  }

const fetchUsers=async(email,password,x)=>{


    const response = await fetch(`http://localhost:3000/${x}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username:email,
      password:password

    })
    
  })
  if(!response.ok){
    const err=await response.json();
    console.log(err)
    alert('enter valid data')
    throw new Error("smth went wrong login",err)
    alert('enter valid data')
  }  

 const data= await response.json()
 console.log(data)
 console.log(data.token)
 setToken(data.token)
 setlogedin(true)

}

  const fetch_getBook=async(passMood)=>{
  const response = await fetch(`http://localhost:3000/books/${passMood}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`

  },
  
})  
  
  const data=await response.json()
  console.log(data)
  setbook(data)
  

  }

  const onsubmit = (e) => {
    e.preventDefault()
    if(input_Key){
      setapi_key(input_Key)
      setapi(false)
    }
  }

  const handleregister=(user,pass)=>{
  
   const x='register'
   fetchUsers(user,pass,x)

  }

  const handlelogin=(user,pass,e)=>{
    e.preventDefault()
    const x='login'
    fetchUsers(user,pass,x)
 
  }

  const handleCustomMood=(e)=>{
    e.preventDefault()
    if(custom_mood){
      fetchbook(custom_mood)
  }}

  const handleStore=(book)=>{
    fetchStorebook(book)
  }

  const handleMood=(mood)=>{
    fetchbook(mood.label)
  }

  if(!logedin){
    return(
     <Login email={email} setemail={setemail} password={password} setPassword={setPassword} onClick={handlelogin} handleregister={handleregister} ></Login>

    )
  }

  if(api){
    return(
      <ApiSetUp input_Key={input_Key} setinput_Key={setinput_Key} onSubmit={onsubmit}/>
    )
  }

  if(offline){
    return(
    <Result books={book} Store={handleStore}></Result>
    )
  }

  if(fetching){
    return(
      <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover bg-center min-h-screen overflow-hidden">
        <Navbar api_page={()=>setapi(true)}></Navbar>
      <div className='ml-170 my-79 flex'>
      <div className="flex flex-col items-center gap-4">
       <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <h1 className='font-bebas text-4xl text-white'>LOADING....</h1>
       </div>


      </div>
      </div>
    )
  }

  if(results){
    return(
    <>
    <Navbar/>
    <Result books={book} Store={handleStore}/>
    </>
    )
  }

  return (
    
    <div style={{ backgroundImage: `url(${img})` }} className="bg-cover bg-center min-h-screen overflow-hidden">
       {/* <div className='bg-gray-900 min-h-200'>   */}
      <div className='bg-black'>
         <Navbar api_page={()=>{setapi(true)}}></Navbar>
      </div>
      <NewCard moods={MOODS} onMoodSelect={handleMood} custom_mood={custom_mood} setcustom_mood={setcustom_mood} handleCustomMood={handleCustomMood}></NewCard>
    </div>
  )
}

export default App
