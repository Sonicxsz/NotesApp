import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users:[],
  user: {},
  authUser: {},
  id: localStorage.getItem("id"),
  token: localStorage.getItem("token"),
  signupIn: false,
  signinUp: false,
  error: null,
  message: null,
  status: localStorage.getItem("status"),
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({username, password}, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:4000/auth/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });
            const dat = await res.json()
            const data = {data: dat, res: res.status};
            console.log(data);
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error);
            } else {
                localStorage.setItem("status", data.res);
                return thunkAPI.fulfillWithValue(data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async({username, password}, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password})
            });

            const dat = await res.json()
            const data = {data: dat, res: res.status};
            if (data.error) {
                console.log(data, 0);
                return thunkAPI.rejectWithValue(data.error);
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.id);
                localStorage.setItem("status", data.res);
                console.log(data, 1);
                return thunkAPI.fulfillWithValue(data)
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.signupIn = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.signupIn = false
                state.message = action.payload.data.message
                console.log(state.message);
                state.status = action.payload.res
                
            })
            .addCase(registerUser.rejected, (state, action) =>{ 
                state.signupIn = false;
                state.error = action.payload
            })
            .addCase(login.pending, (state, action) => {
                state.signinUp = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.signinUp = false;
                state.token = action.payload.data.token;
                console.log("token: ", state.token);
                state.id = action.payload.id;
                state.message = action.payload.data
                state.status = action.payload.res
            })
            .addCase(login.rejected, (state, action) => {
                state.signinUp = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;