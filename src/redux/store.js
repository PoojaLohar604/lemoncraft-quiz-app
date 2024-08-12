import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './slices/tagsSlice';
import quizReducer from './slices/quizSlice';

const store = configureStore({
  reducer: {
    tags: tagsReducer,
    quiz: quizReducer,
  },
});

export default store;
