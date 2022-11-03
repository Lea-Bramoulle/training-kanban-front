import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    toggleSidebar: true,
    darkMode: false,
    toggleBordOptions: false,
    toggleTaskOptions: false,
    toggleTaskStatusOptions: false,
    selectedBoardId: 1,
    selectedTaskId: null,
    toggleTaskModal: false,
    taskTitleValue: '',
    listTitleValue: '',
    taskDescriptionValue: '',
    taskListIdValue: null,
    subtaskDescriptionValue: '',
    colorPickerValue: '#635FC7',
  },
  reducers: {
    setToggleSidebar: (state, action) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    setDisplayDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    setToggleBordOptions: (state, action) => {
      state.toggleBordOptions = !state.toggleBordOptions;
    },
    setToggleTaskStatusOptions: (state, action) => {
      state.toggleTaskStatusOptions = !state.toggleTaskStatusOptions;
    },
    setToggleTaskOptions: (state, action) => {
      state.toggleTaskOptions = !state.toggleTaskOptions;
    },
    setSelectedBoardID: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    setSelectedTaskID: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    setToggleTaskModal: (state, action) => {
      state.toggleTaskModal = !state.toggleTaskModal;
    },
    setTaskTitleValue: (state, action) => {
      state.taskTitleValue = action.payload;
    },
    setTaskDescriptionValue: (state, action) => {
      state.taskDescriptionValue = action.payload;
    },
    setTaskListIdValue: (state, action) => {
      state.taskListIdValue = action.payload;
    },
    setSubtaskDescriptionValue: (state, action) => {
      state.subtaskDescriptionValue = action.payload;
    },
    setListTitleValue: (state, action) => {
      state.listTitleValue = action.payload;
    },
    setColorPickerValue: (state, action) => {
      state.colorPickerValue = action.payload;
    },
  },
});

export const {
  setDisplayDarkMode,
  setSelectedBoardID,
  setToggleBordOptions,
  setToggleSidebar,
  setSelectedTaskID,
  setToggleTaskOptions,
  setToggleTaskStatusOptions,
  setToggleTaskModal,
  setTaskTitleValue,
  setTaskDescriptionValue,
  setTaskListIdValue,
  setSubtaskDescriptionValue,
  setListTitleValue,
  setColorPickerValue,
} = appSlice.actions;
export default appSlice.reducer;
