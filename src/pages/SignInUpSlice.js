import { createSlice } from '@reduxjs/toolkit';

let local_auth_user = JSON.parse(localStorage.getItem("auth_user")) ?? {};

export function getAuthDetails(local_auth_user) {
  let { login_name: loginName, full_name: fullName, description, session_id: sessionId } = local_auth_user;
  return { loginName, fullName, description, sessionId }
}

export function getProfession(local_auth_user) {
  let local_password = localStorage.getItem("password") ?? "";
  let loginNameLength = null;
  if (!Object.is(local_auth_user['login_name'], undefined)) {
    loginNameLength = local_auth_user['login_name'].length ?? 0;
    let passwordLength = local_password.length;
    if (loginNameLength === 9 && passwordLength === 12) return "Student"; // A 18 CS 30 26 (9)  20 19 01 M1 02 99 (12)
    else if (loginNameLength === 5 && passwordLength === 7) return "Teacher"; // 12 08 5 (5) S8 08 32 3 (7)
    else if (loginNameLength === 6 && passwordLength === 8) return "Admin"; //  ad 20 21 (6) sc sx 31 04 (8) 
    // scsx3104 
    else return "";
  }
}

export const slice = createSlice({
  name: 'authUser',         // slice name
  initialState: {
    authUserValues: {
      ...getAuthDetails(local_auth_user), profession: getProfession(local_auth_user) || null,

    },
  },
  reducers: {
    // action type is "authUser/setAuthUser"
    setAuthUser: (state, action) => {
      state.authUserValues = { ...action.payload };
    }
  },
 
});


export const { setAuthUser } = slice.actions;
export const selectAuthUser = state => { return state.authUser.authUserValues; };

export default slice.reducer;

// CORRECT: return undefined|| 0
// WRONG:   return undefined.length|| 0
// CORRECT: try {return undefined} try{ return 0 }
// CORRECT: return undefined.length?? 0
// BEST WAY: try...catch

// dispatch the async thunk

// dispatch(fetchSessionId());
// console.log(store.getState().adminSessionId);