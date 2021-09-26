import { configureStore } from '@reduxjs/toolkit';
import sesiSemester from '../components/TableDataSlice';
import authUser from '../pages/SignInUpSlice'; 
import sessionId from "../pages/SessionIdSlice";

export default configureStore({
    reducer: {
      sesiSemester,
      authUser,
      sessionId
    },
  });
  