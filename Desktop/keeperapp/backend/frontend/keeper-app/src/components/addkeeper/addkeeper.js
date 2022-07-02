import React, { useState } from "react";
import "./addkeeper.css";
import axios from "axios";

const AddKeeper=()=>{
    const[keeperObj,setKeeperObj]=useState({
        title:"",
        description:""
    });
    const handleChange=e=>{
        const{name,value}=e.target
        setKeeperObj({
            ...keeperObj,
            [name]:value
        })
    }
    const add=()=>{
        if(keeperObj.title){
          axios.post("http://localhost:5000/api/addNew",keeperObj).then(res=>console.log(res))  
          setKeeperObj({
            title:"",
            description:""
        })
        }
    }
    return(
        <div className="addKeeper">
             <input
             className="inputBox"
             type="text"
             name="title"
             autocomplete="off"
             onChange={handleChange}
             value={keeperObj.title}
             ></input>

        <textarea
          className="inputBox titleInput"
          name="description"
          placeholder="add Description here"
          onChange={handleChange}
          value={keeperObj.description}
        />     
        <div className="addButton" onClick={add}>Add</div>
        </div>

    )
}
export default AddKeeper;