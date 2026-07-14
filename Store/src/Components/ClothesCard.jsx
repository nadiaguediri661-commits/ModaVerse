import React from 'react'
import '../CSS/Clothes.css'
import axios from 'axios'
import API from '../data/API'
import {useState} from 'react'
import Swal from 'sweetalert2'
import { FaTrashAlt, FaPen } from 'react-icons/fa';


function ClothesCard({userRole, clothes,addToCard, getlist}) {
   const isAdmin=false
  const[updating, setupdating]=useState(false)
  const[price,setprice]=useState(clothes.price)
  const afficher=()=>{
    setupdating(prev=>!prev)
}

const edit=async(id)=>{
Swal.fire({
title: 'Mise a jour de Prix',
text: "Vous voulez changer le prix"+`${price}`+"DT؟",
icon: 'question',
showCancelButton: true,
confirmButtonColor: '#2d3748',
cancelButtonColor: '#4a5568',
confirmButtonText: 'Update',
cancelButtonText: 'Cancel'
}).then(async (result) => {
if (result.isConfirmed) {
  try {
    await axios.put(`${API}/${id}`, { price: price });
    getlist();
    setupdating(!updating);
    Swal.fire('Update.', 'success');
  } catch (error) {
    console.log(error);
  }
}
});
};
const remove = async (id) => {
Swal.fire({
title: 'Are you sue',
text: "You want to delete this Item",
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#ff4d4d', 
cancelButtonColor: '#4a5568',   
confirmButtonText: 'Yes, delete',
cancelButtonText:'cancel'
}).then(async (result) => {

if (result.isConfirmed) {
  try {
    await axios.delete(`${API}/${id}`);
    getlist();
  
    Swal.fire('Deleted', 'success');
  } catch (error) {
    console.log(error);
  }
}
});

};

  return (

    <div className='clothes-card'>        
    <h3>{clothes.name}</h3>
  <img src={clothes.image}/>
  <h4>{clothes.price}</h4>
  {userRole!=="admin"?<button onClick={()=>addToCard(clothes)}>Add to Card</button>:""}
  {userRole=="admin" ?<div className="o">
  <button onClick={() => remove(clothes.id)}>🗑️</button>
<button onClick={() => afficher()}>✏️</button></div>:""}
  {updating? <>    Prix
                 <input type="number"  value={price} onChange={(event)=>setprice(event.target.value)}/>
                 
                <button onClick={()=>edit(clothes.id)}>Edit Price</button>
                </>:"" }

</div>
  )
}

export default ClothesCard