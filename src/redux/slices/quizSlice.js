import { createSlice } from '@reduxjs/toolkit';
import quesData from '../../assets/ques.json';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
  },
  reducers: {
    startQuiz: (state, action) => {
      const selectedTags = action.payload;
      const matchingQuestions = quesData.questions.filter(q =>
        q.tags && q.tags.some(tag => selectedTags.includes(tag))
      );
      state.questions = matchingQuestions.slice(0, 10);
      state.currentQuestionIndex = 0;
      state.score = 0;
    },
    answerQuestion: (state, action) => {
      const { selectedAnswers } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];

      if (!currentQuestion) {
        console.error('Current question is undefined');
        return;
      }

      const scoreChange = calculateScore(currentQuestion, selectedAnswers);

      if (scoreChange !== 0) {
        state.score += scoreChange;
      }

      state.currentQuestionIndex++;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.score = 0;
      
    },
  },
});

const calculateScore = (question, selectedAnswers) => {
  let scoreChange = 0;
  const correctAnswers = question.correct || [];
  const selected = selectedAnswers || [];

  if (question.type === 'single') {
    if (selected.length === 0) {
      return scoreChange;
    } else if (selected[0] === correctAnswers[0]) {
      scoreChange = 4;
    } else {
      scoreChange = -2;
    }
  } else if (question.type === 'multiple') {
    const allSelectedCorrect = selected.every(answer => correctAnswers.includes(answer));
    const allCorrectSelected = correctAnswers.every(answer => selected.includes(answer));

    if (allCorrectSelected && allSelectedCorrect) {
      scoreChange = 4;
    } else {
      const correctCount = selected.filter(answer => correctAnswers.includes(answer)).length;
      const incorrectCount = selected.filter(answer => !correctAnswers.includes(answer)).length;

      scoreChange = correctCount - incorrectCount;
    }
  }

  return scoreChange;
};

export const { startQuiz, answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
