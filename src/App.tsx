import React, { useEffect, useState } from "react";
import NoteItemList from "./components/noteItem/NoteItemList";
import Menu from "./components/menu/menu";
import { useAppDispatch, useAppSelector } from "./hooks";
import DeletePage from "./components/pages/deletePage/deletePage";
import Modal from "./components/modal/modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchNotes } from "./store/slice/notesSlice";
import "./App.css";
import SingleNote from "./components/pages/singleNote/singleNote";
import Search from "./components/search/search";



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
      
      <BrowserRouter>
      <Menu isNoteOpen={isNoteOpen} searchOpen={searchOpen} setSearchOpen={setSearchOpen} openNote={setNoteOpen} />
        {isNoteOpen ? <Modal closeNote={setNoteOpen} /> : null}
        {searchOpen ? <Search searchOpen={searchOpen}/> : null}
        <Routes>
        
       
          <Route path="/" element={<NoteItemList setSearchOpen={setSearchOpen}/>} />
          <Route path="/noteid:id" element={<SingleNote />} />
          <Route path="/delete" element={<DeletePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
