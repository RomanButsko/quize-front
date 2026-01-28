import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { QuizBlock } from '@/entities/quiz-block/model/types';
import type { EditorState, InitializeEditorPayload, QuizInfoPayload, UpdateBlockPayload } from './editor.types';

const initialState: EditorState = {
  quizId: null,
  title: '',
  blocks: [],
  selectedBlockId: null,
  published: false,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    initializeEditor(state, action: PayloadAction<InitializeEditorPayload>) {
      state.quizId = action.payload.quizId;
      state.title = action.payload.title;
      state.blocks = action.payload.blocks;
      state.published = action.payload.published;
      state.selectedBlockId = null;
    },
    setQuizInfo(state, action: PayloadAction<QuizInfoPayload>) {
      state.quizId = action.payload.id;
      state.title = action.payload.title;
    },
    setQuizTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setBlocks(state, action: PayloadAction<QuizBlock[]>) {
      state.blocks = action.payload;
    },
    selectBlock(state, action: PayloadAction<string | null>) {
      state.selectedBlockId = action.payload;
    },
    addBlock(state, action: PayloadAction<QuizBlock>) {
      state.blocks.push(action.payload);
    },
    updateBlock(state, action: PayloadAction<UpdateBlockPayload>) {
      const index = state.blocks.findIndex((block) => block.id === action.payload.id);
      if (index === -1) {
        return;
      }
      state.blocks[index] = action.payload;
    },
    removeBlock(state, action: PayloadAction<string>) {
      state.blocks = state.blocks.filter((block) => block.id !== action.payload);
      if (state.selectedBlockId === action.payload) {
        state.selectedBlockId = null;
      }
    },
    resetEditor() {
      return initialState;
    },
  },
});

export const {
  initializeEditor,
  setQuizInfo,
  setQuizTitle,
  setBlocks,
  selectBlock,
  addBlock,
  updateBlock,
  removeBlock,
  resetEditor,
} = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
