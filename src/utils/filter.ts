import { Istate } from "../store/slice/notesSlice";

function filterNotes (arr:Istate[], important:boolean, filter:string):Istate[]{
    let items = important ? arr.filter((i:Istate) => {
          if (i.important && !i.removeNote) {
            return i;
          }
        })
      : arr.filter(i =>{
        if(!i.removeNote){
          return i
        }
      });
  
      items = filter.length ? items.filter((i:Istate)=>{
        return i.name.toLocaleLowerCase().match(filter.toLocaleLowerCase()) || i.title.toLocaleLowerCase().match(filter.toLocaleLowerCase())
      }) : items
  
      return items
  }


  export {filterNotes}