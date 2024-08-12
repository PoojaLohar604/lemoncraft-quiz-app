// import React, { useState } from 'react';
// import WelcomeScreen from './components/WelcomeScreen';
// import QuizScreen from './components/QuizScreen';
// import { useDispatch, useSelector } from 'react-redux';
// import { startQuiz } from './redux/slices/quizSlice';



// function App() {
//   const [quizStarted, setQuizStarted] = useState(false);
//   const selectedTags = useSelector(state => state.tags.selectedTags);
//   const dispatch = useDispatch();

//   const handleStartQuiz = () => {
//     dispatch(startQuiz(selectedTags));
//     setQuizStarted(true);
//   };

//   return (
//     <div className="App">
    
//       {quizStarted ? <QuizScreen  /> : <WelcomeScreen onStartQuiz={handleStartQuiz} />}
      
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startQuiz } from './redux/slices/quizSlice';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';

function App() {
  const dispatch = useDispatch();
  const selectedTags = useSelector(state => state.tags.selectedTags);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    dispatch(startQuiz(selectedTags));
    navigate('/quiz'); // Navigate to QuizScreen
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/" element={<WelcomeScreen onStartQuiz={handleStartQuiz} />} />
      </Routes>
    </div>
  );
}

export default App;
