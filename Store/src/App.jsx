import { useState,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Card from './Components/Card'
import Login from './Components/Login'
import Home from './Components/Home'
import axios from 'axios'
import Clothes from './Components/Clothes'
import API from './data/API'
import './App.css'

function App() {
 const[acticecategory, setactivecategory]=useState("")
 const[list,setlist]=useState([])
 const[card,setcard]=useState([])
 const[isLoggedIn, setIsLoggedIn]=useState(false)
  const[userName,setUserName]=useState("")
  const[userRole,setUserRole]=useState("")

  useEffect(()=>{const connected=localStorage.getItem('isconnected')==="true";
  const saveUser=localStorage.getItem('userLogin')  
  const saveUserRole=localStorage.getItem('userRole')  
  setIsLoggedIn(connected)
  if(connected && saveUser){
    setUserName(saveUser)
    setUserRole(saveUserRole)
  }
},[])
const handlelogout=()=>{
  localStorage.clear()
  setIsLoggedIn(false)
  setUserName('')
  alert("deconnecxion")
  navigate('/')
  window.location.reload()
}

 const addToCard = (product) => {  
    setcard([...card, product ]);
  } 

 const getlist=async()=>{
               try{
                 const reponse= await axios.get(API)
                 setlist(reponse.data)
               }
               catch(error){console.log(error)}
 }
 useEffect(()=>{getlist()},[])
  return (
    <>
     <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
              userName={userName} setUserName={setUserName} setUserRole={setUserRole} handlelogout ={handlelogout} />
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/card' element={<Card card={card} setcard={setcard} userName={userName} />}/>
       <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} 
              userName={userName} setUserName={setUserName} setUserRole={setUserRole}/>}/>
       <Route path='/clothes/:categoryName' element={<Clothes userRole={userRole} list={list} addToCard={addToCard} getlist={getlist}/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
