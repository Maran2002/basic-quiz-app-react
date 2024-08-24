import React from 'react';

function Results({ questions, userAnswers, userName, userMail, onRestart }) {
  const score = questions.reduce((total, question, index) => {
    return total + (question.answer === userAnswers[index] ? 1 : 0);
  }, 0);
  const handleExit = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div>
      <h1>Web Developer Foundation Quiz</h1>
      <div className='result-container'>
        <h2>Name: {userName}</h2>
        <h2>Mail: {userMail}</h2>
        <h2>Your Score: {score} / {questions.length}</h2>
        <button className='btn' onClick={onRestart}>Restart Quiz</button>
        <button className='btn' onClick={handleExit}>Exit Quiz</button>
      </div>
    </div>
  );
}

export default Results;
