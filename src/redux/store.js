import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userRelated/userSlice";
import { studentReducer } from "./studentRelated/studentSlice";
import { noticeReducer } from "./noticeRelated/noticeSlice";
import { sclassReducer } from "./sclassRelated/sclassSlice";
import { teacherReducer } from "./teacherRelated/teacherSlice";
import { complainReducer } from "./complainRelated/complainSlice";
import { ngoReducer } from "./ngoRelated/ngoSlice";
import { selectedDataReducer } from "./selectedDataRelated/selectedDataSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    ngo: ngoReducer,
    notice: noticeReducer,
    complain: complainReducer,
    sclass: sclassReducer,
    selectedUser: selectedDataReducer,
  },
});

export default store;
