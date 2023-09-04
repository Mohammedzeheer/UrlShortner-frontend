import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './components/Background/BackgroundAnimate';
import InputShortner from './components/InputShortner/InputShortner';
import LinkResult from './components/LinkResult/LinkResult';
import Login from './components/Login/Login';
import CardUrl from './components/CardUrl/CardUrl';
import LogoutButton from './components/LogoutButton';


function App() {
  const [InputValue,setInputValue]=useState('')
  return (
    <>   
    <BackgroundAnimate/>
    <div className='Container'>
      <InputShortner setInputValue={setInputValue}/>
      <LinkResult InputValue={InputValue}/>
      <LogoutButton/>
      <Login/> 
      </div>
  
      <CardUrl/> 
    
  
    
    </>
    
  ); 
}

export default App;

