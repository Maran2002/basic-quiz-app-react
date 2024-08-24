import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import './App.css';
import Results from './Results';

const shuffleArray = (array) => {
  let shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Function to select a random subset of questions
const getRandomQuestions = (questions, count) => {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.slice(0, count);
};

function App({userName, userMail}) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch('/Assests/questions.json')
      .then(response => response.json())
      .then(data => {
        const randomQuestions = getRandomQuestions(data, 10);
        setQuestions(randomQuestions.map(q => ({
          ...q,
          options: shuffleArray(q.options) // Shuffle options for each question
        })));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAnswer = (selectedOption) => {
    setUserAnswers([...userAnswers, selectedOption]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);

    // Re-fetch and shuffle questions
    fetch('/Assets/questions.json')
      .then(response => response.json())
      .then(data => {
        const randomQuestions = getRandomQuestions(data, 10);
        setQuestions(randomQuestions.map(q => ({
          ...q,
          options: shuffleArray(q.options)
        })));
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  if (quizFinished) {
    return <Results questions={questions} userAnswers={userAnswers} userName={userName} userMail={userMail} onRestart={handleRestart}/>;
  }

  return (
    <div className="App">
      <h1>Wed Developer Foundation Quiz</h1>
      <div className='user-details'>
        <h3>Name : {userName}</h3>
        <h3>Mail : {userMail}</h3>
      </div>
      {questions.length > 0 && (
        <Questions
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}

export default App;