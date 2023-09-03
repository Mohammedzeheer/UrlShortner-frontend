import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './components/Background/BackgroundAnimate';
import InputShortner from './components/InputShortner/InputShortner';
import LinkResult from './components/LinkResult/LinkResult';

function App() {
  const [InputValue,setInputValue]=useState('')
  return (
    <>   
    <BackgroundAnimate/>
    <div className='Container'>
      <InputShortner setInputValue={setInputValue}/>
      <LinkResult InputValue={InputValue}/>
    </div>
    
    </>
    
  ); 
}

export default App;
