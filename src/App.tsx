import React, { useEffect, useState, useRef } from "react";
import NoteItemList from "./components/noteItem/NoteItemList";
import Menu from "./components/menu/menu";
import { useAppDispatch, useAppSelector } from "./hooks";
import Modal from "./components/modal/modal";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { fetchNotes } from "./store/slice/notesSlice";
import "./App.css";
import SingleNote from "./components/pages/singleNote";
import Search from "./components/search/search";
import Regist from "./components/auth/Regist"
import Login from "./components/auth/Login";


function App() {
  const [isNoteOpen, setNoteOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.notesSlice.loading);
  
  useEffect(() => {
    dispatch(fetchNotes());
    const keyClick = (e:KeyboardEvent) =>{
      if(e.key === 'Escape' || e.key === 'Enter'){
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', keyClick)
    return () =>{
     document.removeEventListener('keydown', keyClick)
    }
  }, []);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [loading]);

  return (
    <div className="App">
      {/* <Route path="/registred" element={<Regist />} />
      <Regist /> */}
      <BrowserRouter>
      <Menu searchOpen={searchOpen} setSearchOpen={setSearchOpen} openNote={setNoteOpen} />
      {isNoteOpen ? <Modal closeNote={setNoteOpen} /> : null}
        {searchOpen ? <Search searchOpen={searchOpen}/> : null}
        <Routes>

          <Route path="/login" element={<Login/>} />
          <Route path="/registred" element={<Regist/>} />
          <Route path="/" element={<NoteItemList setSearchOpen={setSearchOpen}/>} />
          <Route path="/noteid:id" element={<SingleNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
