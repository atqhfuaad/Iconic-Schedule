import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Subjek from './pages/Subjek';
import SesiSemester from './pages/SesiSemester';
import DrawerObject from './components/DrawerObject';
import SignInUp from "./pages/SignInUp"
import StudentTimeTable from './pages/StudentTimeTable';
import { Kurikulum } from './pages/Kurikulum';
import KurikulumElektif from './pages/KurikulumElektif';
import Ruang from './pages/Ruang';
import Profile from './pages/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthUser } from './pages/SignInUpSlice';
import { setAdminSessionId, setAdminSessionIdSync } from "./pages/SessionIdSlice";
import { getLengthToShow } from "./components/helper"
import { setLengthToShow } from './components/TableDataSlice';
import SubjekSeksyen from './pages/SubjekSeksyen';
import RuangTimetable from './pages/RuangTimetable';
import KurikulumSubjek from './pages/KurikulumSubjek';
import SubjekPensyarah from './pages/SubjekPensyarah';
import SubjekPelajar from './pages/SubjekPelajar';
import Pensyarah from './pages/Pensyarah';
import Pelajar from './pages/Pelajar';
import PensyarahSubjek from './pages/PensyarahSubjek';
import PelajarSubjek from './pages/PelajarSubjek';
import AdminProfile from './pages/AdminProfile';
import NotFound from './pages/NotFound';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: red[500],
    },
    contrastThreshold: 3,
    tonalOffset: 0.1
  },
});


theme.typography.h3 = {
  fontSize: '1.4rem',
  '@media (min-width:600px)': {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme.typography.h2 = {
  fontSize: '1.4rem',
  '@media (min-width:600px)': {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};


function App() {

  const dispatch = useDispatch();
  // const appDispatch = useAppDispatch();
  let authUser = useSelector(selectAuthUser);
  // let adminSessionId = useState(selectAdminSessionId);
  let { profession, loginName } = authUser;

  const handleSession = async () => {
    await dispatch(setAdminSessionId())
  }
  // handleSession();

  useEffect(() => {
    // console.log({ profession });
    if (profession !== "Admin") { handleSession(); }
    else { setAdminSessionIdSync(JSON.parse(localStorage.getItem('auth_admin')).session_id) }
    setLengthToShow(getLengthToShow());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <ThemeProvider theme={theme}>

      {Object.is(profession, null) &&
        <Switch>
          <Route exact path="/~rbnm/">
            <SignInUp action="Log in" actionIsSignIn={true} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      }

      {
        !Object.is(profession, null) &&
        <>
          <DrawerObject professionString={profession}>
            {/* <Switch> */}
            {/* switch's direct child must be route */}
            {
              Object.is(profession, "Admin") &&
              <Switch>
                <Route exact path="/~rbnm/">
                  <AdminProfile />
                </Route>
                <Route exact path="/~rbnm/subjek">
                  <Subjek />
                </Route>
                <Route exact path="/~rbnm/pensyarah">
                  <Pensyarah />
                </Route>
                <Route exact path="/~rbnm/pelajar">
                  <Pelajar />
                </Route>
                <Route exact path="/~rbnm/pelajar_subjek">
                  <PelajarSubjek />
                </Route>
                <Route exact path="/~rbnm/pensyarah_subjek">
                  <PensyarahSubjek />
                </Route>
                <Route exact path="/~rbnm/subjek_seksyen">
                  <SubjekSeksyen />
                </Route>
                <Route exact path="/~rbnm/subjek_pensyarah">
                  <SubjekPensyarah />
                </Route>
                <Route exact path="/~rbnm/subjek_pelajar">
                  <SubjekPelajar />
                </Route>
                <Route exact path="/~rbnm/sesisemester">
                  <SesiSemester />
                </Route>
                <Route exact path="/~rbnm/kurikulum">
                  <Kurikulum />
                </Route>
                <Route exact path="/~rbnm/kurikulum_elektif">
                  <KurikulumElektif />
                </Route>
                <Route exact path="/~rbnm/kurikulum_subjek">
                  <KurikulumSubjek />
                </Route>
                <Route exact path="/~rbnm/ruang">
                  <Ruang />
                </Route>
                <Route exact path="/~rbnm/ruang_timetable">
                  <RuangTimetable />
                </Route>
                <Route component={NotFound} />

              </Switch>
            }
            {
              Object.is(profession, "Student") &&
              <Switch>
                <Route exact path="/~rbnm/timetable">
                  <StudentTimeTable userInfo={authUser} />
                </Route>
                <Route exact path="/~rbnm/">
                  <Profile profession={profession} loginName={loginName} />
                </Route>
                <Route exact path="/~rbnm/subjek_seksyen">
                  <SubjekSeksyen />
                </Route>
                <Route exact path="/~rbnm/subjek_pensyarah">
                  <SubjekPensyarah />
                </Route>
                <Route exact path="/~rbnm/subjek_pelajar">
                  <SubjekPelajar />
                </Route>
                <Route exact path="/~rbnm/kurikulum">
                  <Kurikulum />
                </Route>
                <Route exact path="/~rbnm/kurikulum_elektif">
                  <KurikulumElektif />
                </Route>
                <Route exact path="/~rbnm/kurikulum_subjek">
                  <KurikulumSubjek />
                </Route>
                <Route exact path="/~rbnm/ruang">
                  <Ruang />
                </Route>
                <Route exact path="/~rbnm/ruang_timetable">
                  <RuangTimetable />
                </Route>
              </Switch>
            }
            {
              Object.is(profession, "Teacher") &&
              <Switch>
                <Route exact path="/~rbnm/timetable">
                  <StudentTimeTable userInfo={authUser} />
                </Route>
                <Route exact path="/~rbnm/">
                  <Profile profession={profession} loginName={loginName} />
                </Route>
                <Route exact path="/~rbnm/subjek">
                  <Subjek />
                </Route>
                <Route exact path="/~rbnm/pelajar_subjek">
                  <PelajarSubjek />
                </Route>
                <Route exact path="/~rbnm/pensyarah_subjek">
                  <PensyarahSubjek />
                </Route>
                <Route exact path="/~rbnm/subjek_seksyen">
                  <SubjekSeksyen />
                </Route>
                <Route exact path="/~rbnm/subjek_pensyarah">
                  <SubjekPensyarah />
                </Route>
                <Route exact path="/~rbnm/subjek_pelajar">
                  <SubjekPelajar />
                </Route>
                <Route exact path="/~rbnm/kurikulum">
                  <Kurikulum />
                </Route>
                <Route exact path="/~rbnm/kurikulum_elektif">
                  <KurikulumElektif />
                </Route>
                <Route exact path="/~rbnm/kurikulum_subjek">
                  <KurikulumSubjek />
                </Route>
                <Route exact path="/~rbnm/ruang">
                  <Ruang />
                </Route>
                <Route exact path="/~rbnm/ruang_timetable">
                  <RuangTimetable />
                </Route>

              </Switch>
            }
            {/* <Route component={NotFound} /> */}

            {/* </Switch> */}
          </DrawerObject>
        </>
      }

    </ThemeProvider>
    </>
  )
}

export default App
