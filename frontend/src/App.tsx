import React, { useState } from 'react'
import './App.css'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [subject, setSubject] = useState('')

  const handleSpellCheck = async () => {
    // TODO: Implement spell check functionality
    console.log('Spell check requested')
  }

  const handleGrammarCheck = async () => {
    // TODO: Implement grammar check functionality
    console.log('Grammar check requested')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Email AI Utility Tool</h1>
        <p>Intelligent email composition with spell check and grammar correction</p>
      </header>
      
      <main className="email-composer">
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Email Content:</label>
          <textarea
            id="content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Compose your email here..."
            rows={10}
          />
        </div>
        
        <div className="button-group">
          <button onClick={handleSpellCheck} className="btn btn-primary">
            Check Spelling
          </button>
          <button onClick={handleGrammarCheck} className="btn btn-secondary">
            Fix Grammar
          </button>
        </div>
      </main>
    </div>
  )
}

export default App