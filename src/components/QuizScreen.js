
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, resetQuiz } from '../redux/slices/quizSlice';
import Timer from './Timer';
import './QuizScreen.css'; 
import { useNavigate } from 'react-router-dom';

const QuizScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, score } = useSelector(state => state.quiz);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedAnswers([]);
    setFeedback('');
    setResetTimer(true); // Signal to reset the timer
    const timer = setTimeout(() => setResetTimer(false), 100); // Small delay to ensure timer reset
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const handleAnswerSubmit = () => {
    if (!currentQuestion) return; // Handle case where currentQuestion is undefined

    setLoading(true);
    const feedbackMsg = calculateFeedbackAndScore();
    dispatch(answerQuestion({ selectedAnswers }));
    setFeedback(feedbackMsg);
    setLoading(false);
  };

  const calculateFeedbackAndScore = () => {
    let feedbackMsg = '';

    if (currentQuestion.type === 'single') {
      if (selectedAnswers.length === 0) {
        feedbackMsg = 'No answer selected.';
      } else if (selectedAnswers[0] === currentQuestion.correctAnswer) {
        feedbackMsg = 'Correct Answer! +4 points.';
      } else {
        feedbackMsg = 'Wrong Answer! -2 points.';
      }
    } else if (currentQuestion.type === 'multiple') {
      if (selectedAnswers.length === 0) {
        feedbackMsg = 'No answer selected.';
      } else {
        const correctAnswers = currentQuestion.correctAnswers || [];
        const selected = selectedAnswers || [];

        const allSelectedCorrect = selected.every(answer => correctAnswers.includes(answer));
        const allCorrectSelected = correctAnswers.every(answer => selected.includes(answer));

        if (allCorrectSelected && allSelectedCorrect) {
          feedbackMsg = 'All options are correct! +4 points.';
        } else {
          const correctCount = selected.filter(answer => correctAnswers.includes(answer)).length;
          const incorrectCount = selected.filter(answer => !correctAnswers.includes(answer)).length;

          feedbackMsg = `+${correctCount} for correct answers, -${incorrectCount} for incorrect answers.`;
        }
      }
    }

    return feedbackMsg;
  };

  const handleAnswerChange = (option) => {
    if (currentQuestion.type === 'single') {
      setSelectedAnswers([option]);
    } else {
      setSelectedAnswers(prev =>
        prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
      );
    }
  };

  const handleQuizReset = () => {
    dispatch(resetQuiz());
    navigate('/'); // Navigate  to the welcome screen
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="quiz-container">
      <div className="scoring-rules">
        <h3>Scoring Rules:</h3>
        <p><strong>For single choice questions:</strong> +4 marks for a correct answer. -2 marks for a wrong answer.</p>
        <p><strong>For multiple choice questions:</strong> +4 marks if all options selected are correct. +1 mark for each correct option selected. -1 mark for each incorrect option selected.</p>
      </div>
      {currentQuestion ? (
        <>
          <h2>{currentQuestion.question}</h2>
          <p>Question Type: {currentQuestion.type === 'single' ? 'Single Choice' : 'Multiple Choice'}</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type={currentQuestion.type === 'single' ? 'radio' : 'checkbox'}
                    value={option}
                    checked={selectedAnswers.includes(option)}
                    onChange={() => handleAnswerChange(option)}
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
          <Timer onTimeout={handleAnswerSubmit} reset={resetTimer} />
          {feedback && <p className="feedback">{feedback}</p>}
        </>
      ) : (
        <div className="quiz-complete">
          <h2>Quiz Complete!</h2>
          <p>Final Score: {score}</p>
          <button className="restart-button" onClick={handleQuizReset}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
