import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Istate = {
  name: string;
  title: string;
  time: number | string;
  important: boolean;
  _id: string;
  color: string;
  remove: boolean;
  removeTime:string;

};

type NotesState = {
  notes: Istate[];
  filter: string;
  loading: boolean;
  important: boolean;
  
};

const initialState: NotesState = {
  notes: [],
  filter: '',
  loading: false,
  important: false,
  
  
};

export const path = "http://localhost:4000/note/";

export const fetchNotes = createAsyncThunk<Istate[], undefined>(
  "notes/fetch",
  async () => {
    let res = await fetch(`${path}get`);

    if (!res.ok) {
      throw console.error("sss");
    }

    const data = await res.json();
    return data;
  }
);

export const addNotes = createAsyncThunk<any, any>("add/fetch", async (obj) => {
  fetch(`${path}post`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: obj,
  });
});

export const deleteNotes = createAsyncThunk<any, string>(
  "delete/fetch",
  async (id) => {
    fetch(`${path}delete/${id}`, {
      method: "DELETE",
    });
  }
);
export const recentlyDelete = createAsyncThunk<any, any>(
  "change/fetch",
  async (obj) => {
    fetch(`${path}path/${obj._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: obj.b,
    });
  }
);

export const changeFavorite = createAsyncThunk<any, any>(
  "change/fetch",
  async (obj) => {
    fetch(`${path}path/${obj._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: obj.b,
    });
  }
);

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    changeFilter: (state, action) =>{
      state.filter = action.payload
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      const notes = state.notes.filter((i) => {
        return i._id !== action.payload;
      });
      state.notes = notes;
    },
    changeImportant: (state, action) => {
      state.important = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNotes.rejected, () => {
      console.log("sorry something wrong");
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;    
    });
    builder.addCase(addNotes.pending, (state) => {
      state.loading = !state.loading;
    });
    builder.addCase(addNotes.fulfilled, (state) => {
      state.loading = !state.loading;
    });
    builder.addCase(deleteNotes.pending, (state) => {
      state.loading = !state.loading;
    });
    builder.addCase(deleteNotes.fulfilled, (state) => {
      state.loading = !state.loading;
    });
    builder.addCase(changeFavorite.pending, (state) => {
      state.loading = !state.loading;
    });
    builder.addCase(changeFavorite.fulfilled, (state) => {
      state.loading = !state.loading;
    });
  },
});

export const { addNote, deleteNote, changeImportant, changeFilter } = NoteSlice.actions;
export default NoteSlice.reducer;
