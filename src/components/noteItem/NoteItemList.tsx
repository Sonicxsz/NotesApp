import React from "react";
import NoteItem from "./noteItem";
import "./noteItem.scss";
import { filterNotes } from "../../utils/filter";
import { useAppSelector } from "../../hooks";

export interface Istate {
  name: string;
  title: string;
  time: number | string;
  color: string;
  important: boolean;
  id: string;
}

interface NoteListProps {
  setSearchOpen: (arg: boolean) => void;
}

const NoteItemList = (props: NoteListProps) => {
  const { notes, important } = useAppSelector((state) => state.notesSlice);
  const filter = useAppSelector((state) => state.notesSlice.filter);
  let filteredNotes = filterNotes(notes, important, filter);

  return (
    <div className="wrap">
      {filteredNotes.length > 0 ? (
        filteredNotes.map((i, ind) => {
          return (
            <NoteItem
              setSearchOpen={props.setSearchOpen}
              color={i.color}
              important={i.important}
              key={ind}
              title={i.title}
              name={i.name}
              id={i.id}
              time={i.time}
            />
          );
        })
      ) : (
        <div>
        
        </div>
      )}
    </div>
  );
};

export default NoteItemList;
