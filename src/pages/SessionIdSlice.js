import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'

export const setAdminSessionId = createAsyncThunk(
  // action type is "[sliceName]/[reducerPropertyName]"
  'authUser/setAdminSessionIdStatus',
  async () => {
       // let password = JSON.parse(localStorage.getItem("admin_password"));
    let password = undefined;
    // console.log("Hi executed")
    // if (password === undefined || password === null || password ==="" || fetchAgainDespiteLocalStorage) {
    let data = await fetch('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=authentication&login=ad2021&password=scsx3104')
    data = await data.json();
    password = await data[0]['session_id'];
    // localStorage.setItem("admin_password", "hi");
    // console.log({password})
    return password;
  }
)

// setAdminSessionId(false);

const initialState = {
    fetchFirstTime: true,
    adminSessionId: "1122"
}

const sessionIdSlice = createSlice({
    name: 'sessionId',
    initialState,
    reducers: {
        setFetchFirstTime: (state, {payload})=>{
            state.fetchFirstTime = payload;
        },
        setAdminSessionIdSync: (state, {payload})=>{
            state.adminSessionId = payload;
        }   

    },
    extraReducers: {
        // action type is "authUser/setAdminSessionIdStatus"
        [setAdminSessionId.fulfilled]: (state, {payload}) => {
            state.fetchFirstTime = false;
            state.adminSessionId = payload;
        }
    }
})

export default sessionIdSlice.reducer

export const { setFetchFirstTime } = sessionIdSlice.actions;
export const { setAdminSessionIdSync } = sessionIdSlice.actions;

export const selectAdminSessionId = state => { return state.sessionId.adminSessionId; };
export const selectFetchFirstTime = state => { return state.sessionId.fetchFirstTime; };

