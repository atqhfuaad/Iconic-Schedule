import { createSlice } from '@reduxjs/toolkit';

let localStorageSesiSemester = localStorage.getItem("sesiSemesterValues");
let sesi = "", semester = "";
if (localStorageSesiSemester === "" || localStorageSesiSemester === null || localStorageSesiSemester === undefined) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  sesi = ((month >= 7) || (month <= 2)) ? `${year - 1}/${year}` : `${year}/${year + 1}`;
  semester = ((month >= 7) || (month <= 2)) ? 1 : 2;
}
else {
  ({ sesi, semester } = JSON.parse(localStorageSesiSemester));
}

export const slice = createSlice({
  name: 'sesiSemester',
  // A slice is a combination of reducers
  // Slice's name is sesiSemester slice and state can be accessed by state.sesiSemester
  // state has 2 objects: state.sesiSemesterValues

  // Creates state also by initialState

  // Actions:
  // Action has type and payload
  // action type is "[sliceName]/[reducerPropertyName]"

  initialState: {
    sesiSemesterValues: {
      // slice's sesiSemesterValues.[state1] accessed by slice.[state1] later to export the state. It's an object for conciseness
      sesi,
      semester
    },
    limitValues: 25,
    offsetValues: 1,
    lengthToShowValues: 10,
    sesiMasukValues: {
      // slice's sesiSemesterValues.[state2] accessed by slice.[state2] later to export the state. It's an object for conciseness
      sesi_masuk: "2017/2018"
    },
    kodRuangValues: {
      // slice's sesiSemesterValues.[state3] accessed by slice.[state3] later to export the state. It's an object for conciseness
      kodRuang: "N28-105-01"
    },
    idKurikulumValues: "4",
    idKurikulumSubjekValues: "87",
    subjekPelajarValues: {
      kodSubjek: "SCSI1013", seksyen: "01"
    },
    subjekPensyarahValues: {
      kodSubjek: "SCSI1013", seksyen: "01"
    }
  },

  reducers: {
    // Although it's written as reducers, it's better called action
    // [action1] exported as slice.actions.[action1]
    // ...action.payload (payload is the parameter sent) :       
    // Example in this slice file:      state.sesiSemesterValues = { ...action.payload };
    // Example in actual js file:       setSesiSemester({sesi: "20118/2019", semester: 1})
    // What it does in the reducer:     state.sesiSemesterValues= {sesi: "20118/2019", semester: 1}

    setSesiSemester: (state, action) => {
      // Will handle the action type `'sesiSemester/setSesiSemester'`
      state.sesiSemesterValues = { ...action.payload };
    },
    setLengthToShow: (state, action) =>{
      state.lengthToShowValues = action.payload ;
    },
    setLimit: (state, {payload}) =>{
      state.limitValues = payload ;
    },
    setOffset: (state, {payload}) =>{
      state.offsetValues = payload ;
    },
    // [action2] exported as slice.actions.[action2]
    setSesiMasuk: (state, action) => {
      // Will handle the action type `'sesiSemester/setSesiMasuk'`
      state.sesiMasukValues = { ...action.payload };
    },
    // [action3] exported as slice.actions.[action3]
    setKodRuang: (state, action) => {
      // Will handle the action type `'sesiSemester/setKodRuang'`
      state.kodRuangValues = { ...action.payload };
    },
    setIdKurikulum: (state, action) => {
      // Will handle the action type `'sesiSemester/setSubjekPensyarah'`
      state.idKurikulumValues = action.payload;
    },
    setIdKurikulumSubjek: (state, action) => {
      // Will handle the action type `'sesiSemester/setSubjekPensyarah'`
      state.idKurikulumSubjekValues = action.payload;
    },
    setSubjekPelajar: (state, action) => {
      // Will handle the action type `'sesiSemester/setSubjekPelajar'`
      state.subjekPelajarValues = { ...action.payload };
    },
    setSubjekPensyarah: (state, action) => {
      // Will handle the action type `'sesiSemester/setSubjekPensyarah'`
      state.subjekPensyarahValues = { ...action.payload };
    },

  },
});
// exporting the actions. Later imported as useDispatch([actionName]) ?? 95% SURE
export const { setSesiSemester } = slice.actions;
export const { setSesiMasuk } = slice.actions;
export const { setKodRuang } = slice.actions;
export const { setIdKurikulum } = slice.actions;
export const { setIdKurikulumSubjek } = slice.actions;
export const { setSubjekPelajar } = slice.actions;
export const { setSubjekPensyarah } = slice.actions;
export const { setLengthToShow } = slice.actions;
export const { setLimit } = slice.actions;
export const { setOffset } = slice.actions;

// exporting the states. Later imported as useSelector([stateName])  ?? 95% SURE
export const selectSesiSemester = state => { return state.sesiSemester.sesiSemesterValues };
export const selectLengthToShow = state => { return state.sesiSemester.lengthToShowValues };
export const selectOffset = state => { return state.sesiSemester.offsetValues };
export const selectLimit = state => { return state.sesiSemester.limitValues };
export const selectSesiMasuk = state => { return state.sesiSemester.sesiMasukValues };
export const selectKodRuang = state => { return state.sesiSemester.kodRuangValues };
export const selectIdKurikulum = state => { return state.sesiSemester.idKurikulumValues };
export const selectIdKurikulumSubjek = state => { return state.sesiSemester.idKurikulumSubjekValues };
export const selectSubjekPelajar = state => { return state.sesiSemester.subjekPelajarValues };
export const selectSubjekPensyarah = state => { return state.sesiSemester.subjekPensyarahValues };

// exporting the slice (combination of reducers, so more apt name should be slice.slice???) for combination in the store
export default slice.reducer;
