import { createSlice } from '@reduxjs/toolkit';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    availableTags: [], // Will populate from ques.json
    selectedTags: [],
  },
  reducers: {
    setTags: (state, action) => {
      state.availableTags = action.payload;
    },
    toggleTag: (state, action) => {
      const tag = action.payload;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter(t => t !== tag);
      } else if (state.selectedTags.length < 20) {
        state.selectedTags.push(tag);
      }
    },
  },
});

export const { setTags, toggleTag } = tagsSlice.actions;
export default tagsSlice.reducer;
