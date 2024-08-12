import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTags, toggleTag } from '../redux/slices/tagsSlice';
import quesData from '../assets/ques.json';
import './WelcomeScreen.css'; 

const WelcomeScreen = ({ onStartQuiz }) => {
  const dispatch = useDispatch();
  const { availableTags, selectedTags } = useSelector(state => state.tags);

  useEffect(() => {
  
    const tags = [...new Set(quesData.questions.flatMap(q => q.tags))];
    dispatch(setTags(tags.slice(0, 100))); 
    }, [dispatch]);

  return (
    <div className="container">
      <h1>Select 20 Tags</h1>
      <div className="tag-buttons">
        {availableTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => dispatch(toggleTag(tag))}
            className={selectedTags.includes(tag) ? 'selected' : ''}
          >
            {tag}
          </button>
        ))}
      </div>
      <button
        className="start-quiz-button"
        onClick={onStartQuiz}
        disabled={selectedTags.length !== 20}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default WelcomeScreen;
