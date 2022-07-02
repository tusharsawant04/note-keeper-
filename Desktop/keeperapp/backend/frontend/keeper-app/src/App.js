
import './App.css';
import Header from './components/header/header';
import AddKeeper from './components/addkeeper/addkeeper';
import { useState, useEffect } from 'react';
import ShowKeeper from './components/showkeeper/showkeeper';
import axios from 'axios';

function App() {
const[keeperList, setKeeperList]=useState([])
 useEffect(()=>{
  axios.get("http://localhost:5000/api/getAll").then(res=>setKeeperList(res.data))  

 },[])
  return (
    <div className="App">
      <header className="App-header">
       <Header/>
       <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList}/>
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList}/>
         
      </header>
    </div>
  );
}

export default App;
