import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export interface todo {
    title:string,
    completed: boolean,
    _id?: string,
}

export interface Itodo {
    isTodo: boolean;
    name: string,
    todosAr:todo[],
    time: string,
    color: string,
    important: boolean,
    _id?: string;
}
export interface TodosState {
    todos: Itodo[],
    loading: boolean
}

const initialState: TodosState = {
    todos: [],
    loading: false
}
///

export const path = "http://localhost:4000/todo/";

export const fetchTodos = createAsyncThunk<Itodo[], undefined>(
  "todos/fetch",
  async () => {
    let res = await fetch(`${path}get`);

    if (!res.ok) {
      throw console.error("sss");
    }

    const data = await res.json();
    return data;
  }
);

export const addTodo = createAsyncThunk<any, any>("addTodo/fetch", async (obj) => {
  console.log(obj)
  fetch(`${path}post`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: obj,
  });
});

export const deleteTodo = createAsyncThunk<any, string>(
  "deleteTodo/fetch",
  async (id) => {
    fetch(`${path}delete/${id}`, {
      method: "DELETE",
    });
  }
);
export const recentlyDeleteTodo = createAsyncThunk<any, any>(
  "changeTodo/fetch",
  async (obj) => {
    fetch(`${path}path/${obj._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: obj.b,
    });
  }
);

export const completeTodo = createAsyncThunk<any, any>(
    'complete/todo',
    async(obj) => {
      console.log(obj)
      fetch(`${path}path/${obj._id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: obj.b,
      });
    }
)



export const changeFavoriteTodo = createAsyncThunk<any, any>(
  "changeFavoriteTodo/fetch",
  async (obj) => {
    fetch(`${path}path/${obj._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: obj.b,
    });
  }
);


///



const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
     changeFavorite: (state, action) =>{
      state.todos.map((i, ind) =>{
        if(i._id === action.payload){
          return [...state.todos, state.todos[ind].important = !state.todos[ind].important]
        }
      })
     },

     deleteTodoLocal: (state, action) =>{
      state.todos = state.todos.filter(i => i._id !== action.payload)
     }
    },

    extraReducers: (builder) =>{
        builder.addCase(addTodo.pending, (state) =>{
            state.loading = !state.loading
        })
        builder.addCase(addTodo.fulfilled, (state) =>{
            state.loading = !state.loading
        })

        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = !state.loading;
        })

        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.loading = !state.loading;
        })

    }
})


export default todoSlice.reducer;
export const {changeFavorite, deleteTodoLocal} = todoSlice.actions