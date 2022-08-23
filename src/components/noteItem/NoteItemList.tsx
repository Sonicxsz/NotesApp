import NoteItem from "./noteItem";
import "./noteItem.scss";
import { filterNotes } from "../../utils/filter";
import { useAppSelector } from "../../hooks";
import TodoItem from "../todo/TodoItem";


export interface Istate {
  name: string;
  title: string;
  time: number | string;
  color: string;
  important: boolean;
  _id?: string;
}



interface NoteListProps {
  setSearchOpen: (arg: boolean) => void;
}



const NoteItemList = (props: NoteListProps) => {
  const { notes, important, loading } = useAppSelector((state) => state.notesSlice);
  const filter = useAppSelector((state) => state.notesSlice.filter);
  let filteredNotes = filterNotes(notes, important, filter);
  let todos = useAppSelector(state => state.todoSlice.todos)

  
  return (
    <div className="wrap">
      {todos.map(i =>{
        return (
          <TodoItem key={i._id} name={i.name} time={i.time} color={i.color} _id={i._id} important={i.important} todosAr={i.todosAr}/>
        )
      })}
      
      {filteredNotes.length <= 0 ? (
         <>
         <h1 className="firstNoteText">
         Добавьте вашу первую заметку
         </h1>
         </>
      ) : (
        filteredNotes.map((i, ind) => {
          return (
            <NoteItem
              setSearchOpen={props.setSearchOpen}
              color={i.color}
              important={i.important}
              key={ind}
              title={i.title}
              name={i.name}
              _id={i._id}
              delete={false}
              time={i.time}
              removeTime={''}
            />
            
          );
        })
      )}
    </div>
  );
};

export default NoteItemList;


