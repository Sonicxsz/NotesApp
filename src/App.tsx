import React, { useState } from 'react';
import NoteItemList from './components/noteItem/NoteItemList';
import Menu from './components/menu/menu';
import Modal from './components/modal/modal';

import './App.css';




function App() {
  const [isNoteOpen, setNoteOpen] = useState<boolean>(false)

  return (
    <div className="App">
      <Menu openNote={setNoteOpen}/>
      {isNoteOpen ? <Modal closeNote={setNoteOpen}/> : null}
      
      <NoteItemList/>
     
    </div>
  );
}

export default App;
