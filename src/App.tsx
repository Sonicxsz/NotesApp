import React, { useEffect, useState } from 'react';
import NoteItemList from './components/noteItem/NoteItemList';
import Menu from './components/menu/menu';
import { useAppDispatch, useAppSelector } from './hooks';
import Modal from './components/modal/modal';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { fetchNotes } from './store/slice/notesSlice';
import './App.css';





function App() {
  
  const [isNoteOpen, setNoteOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.notesSlice.loading)
  useEffect(() =>{
    dispatch(fetchNotes())
  },[])

  useEffect(() =>{
    dispatch(fetchNotes())
  },[loading])


  return (
    <div className="App">
      <Menu openNote={setNoteOpen}/>
      {isNoteOpen ? <Modal closeNote={setNoteOpen}/> : null}
      <BrowserRouter>
      <Routes >
    
      <Route path='/' element={<NoteItemList />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
