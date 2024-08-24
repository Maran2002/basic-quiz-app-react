import React from 'react';

function Questions({ question, onAnswer }) {
  const { question: questionText, options } = question;

  return (
    <div className="question-container">
      <h2>{questionText}</h2>
      <div className='options'>
        {options.map((option, index) => (
          <p className='choices' key={index}>
            <button onClick={() => onAnswer(option)}>{index+1}. {option}</button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Questions;