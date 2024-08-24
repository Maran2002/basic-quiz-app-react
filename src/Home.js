import React,{useState} from 'react'
import './Home.css'
import App from './App'
import Note from './Note'


const Home = () => {
    
    const [userMail, setUserMail] = useState('')
    const [userName, setUserName] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const handleEmailChange = event => {
        setUserMail(event.target.value)
      };
    const handleNameChange = event => {
        setUserName(event.target.value)
      };
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitted(true)
      };
  return (
    <main className='maintag'>
        { !submitted ? ( <div>
        <h1 className='heading'>Web Developer Foundation Quiz</h1>
        <form onSubmit={handleSubmit} id='startForm' className='start-form'>
            <label htmlFor="name"> Name
                <input required id='name' placeholder='Enter Your Name' type="text" onChange={handleNameChange} value={userName} />
            </label>
            <label htmlFor="email">Mail ID
                <input required type="email" id='email' placeholder='Enter Your Mail ID' onChange={handleEmailChange} value={userMail} />
            </label>
            <button className='btn' type='submit'>Start Quiz</button>
        </form></div> ) : (<App userName={userName} userMail={userMail} />)
        }
        <Note />
    </main>
    
  );
}

export default Home