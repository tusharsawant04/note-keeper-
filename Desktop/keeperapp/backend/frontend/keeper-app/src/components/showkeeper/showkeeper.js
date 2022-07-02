import axios from "axios";
import React from "react";
import "./showkeeper.css"
const ShowKeeper=({keeperList, setKeeperList})=>{

    const deleteKeeper=(id)=>{
        axios.post("/api/delete",{id})
        .then(res=>setKeeperList(res.data))
    }
    return(
        <div className="showKeeper row" >
            {
                keeperList.map(keeper=>(
                    <div className="keeperCard col-md-3" key={keeper._id}>
                    <h1 className="title">{keeper.title}
                     <i class="deleteIcon fa-solid fa-trash" 
                     area-hidden="true" onClick={()=>deleteKeeper(keeper._id)}>
                        </i></h1>
                    <textarea className="descriptionBox" 
                     value={keeper.description} readOnly>

                     </textarea>
                </div>
                ))
            }
           

          
        </div>
    )
}
 
export default ShowKeeper;
