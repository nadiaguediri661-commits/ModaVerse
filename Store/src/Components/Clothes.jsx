import React from 'react'
import { useParams } from 'react-router-dom'
import ClothesCard from './ClothesCard';
import '../CSS/Clothes.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import API from '../data/API'
function Clothes({userRole, list, addToCard, getlist}) {
    console.log(list)
    let  {categoryName}  = useParams();
    console.log(categoryName) 
    
    const activeCat =  categoryName || "all" ;

    
    const displayedItems = activeCat.toLowerCase() === "all"? 
    list: list.filter(item => item.category?.toLowerCase() === activeCat.toLowerCase());

    const Addclothes = () => {
      Swal.fire({
        title: 'Add new clothes',
        html: `
          <div style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
            <label><b>Name</b></label>
            <input id="swal-name" class="swal2-input" placeholder="trousers" style="margin: 0; width: 100%;">
            
            <label><b>Price:</b></label>
            <input id="swal-price" type="number" class="swal2-input" placeholder="12.99" style="margin: 0; width: 100%;">
            
            <label><b>  (URL):</b></label>
            <input id="swal-image" class="swal2-input" placeholder="" style="margin: 0; width: 100%;">
            <label><b>  Categoty</b></label>
            <input id="swal-category" class="swal2-input" placeholder="category" style="margin: 0; width: 100%;">
          </div>   `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Add Clothes' ,
                cancelButtonText: 'Cancel',
          confirmButtonColor: '#2ec4b6',
          cancelButtonColor: '#4a5568',
          preConfirm: () => {        
            const name = document.getElementById('swal-name').value;
            const price = document.getElementById('swal-price').value;
            const image = document.getElementById('swal-image').value;
            const category = document.getElementById('swal-category').value;
      
           
            if (!name || !price || !image) {
              Swal.showValidationMessage('Give all informations');
              return false;
            }
      
            return { name: name, price: parseFloat(price), image: [image] ,category:category};
          }
        }).then(async (result) => {
         
          if (result.isConfirmed) {
            try {
             
              await axios.post(API, result.value);         
             
              getList();           
              
              Swal.fire('yessssssssss', 'success');
            } catch (error) {
              console.log(error);
              Swal.fire('error');
            }
          }
        });
      };

  return (
    <>
          {userRole=="admin" && (
             <div className="add-clothes-container">
                <button className="add-clothes-btn" onClick={Addclothes}>
                 ➕ Add new clothes
                </button>
              </div>
              )}

    <div className='clothesgallery'>
            {
                displayedItems.map(item => 
                    (<ClothesCard  key={item.id} userRole={userRole} clothes={item} addToCard={addToCard}  getlist={getlist}  /> ))
             }
        </div>
        </>
  )
}

export default Clothes


