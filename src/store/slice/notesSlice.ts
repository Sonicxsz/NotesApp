import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




type Istate = {
    name: string;
    title: string;
    time: number | string;
    important: boolean;
    id: string;
    color: string;
   };

type NotesState = {
    notes: Istate[];
    loading: boolean
}
   
const initialState: NotesState = {
    notes: [],
    loading: false,
   
}

 export const fetchNotes = createAsyncThunk<Istate[], undefined>(
    'notes/fetch',
    async () => {  
        let res = await fetch('https://62dc84e04438813a2616d538.mockapi.io/notes')

            if(!res.ok){

                throw console.error('sss');
                 
            }

            const data = await res.json();
            return data
        
    }
)

export const addNotes = createAsyncThunk<any, any>(
    'add/fetch',
    async (obj) =>{
        fetch('https://62dc84e04438813a2616d538.mockapi.io/notes', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: obj
        })

    }

)

export const deleteNotes = createAsyncThunk<any, any>(
    'delete/fetch',
    async (id) =>{
        fetch(`https://62dc84e04438813a2616d538.mockapi.io/notes/${id}`, {
            method: 'DELETE',
        })
    }

)

const NoteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) =>{
            state.notes.push(action.payload)
        },
        deleteNote: (state, action) =>{
            const notes = state.notes.filter(i =>{
                return i.id !== action.payload
            })
            state.notes = notes
        }
    },

    extraReducers: (builder) =>{
        builder.addCase(fetchNotes.rejected, () =>{
            console.log('sorry something wrong')
        })
        builder.addCase(fetchNotes.fulfilled, (state, action) =>{
                state.notes = action.payload
               
              
        })
        builder.addCase(fetchNotes.pending, () =>{
            
        })
        builder.addCase(addNotes.pending, (state) =>{
            state.loading = !state.loading
        })
        builder.addCase(addNotes.fulfilled, (state) =>{
            state.loading = !state.loading
        })
        builder.addCase(deleteNotes.pending, (state) =>{
            state.loading = !state.loading
        })
        builder.addCase(deleteNotes.fulfilled, (state) =>{
            state.loading = !state.loading
        })

    }

})

export const {addNote, deleteNote} = NoteSlice.actions
export default NoteSlice.reducer

