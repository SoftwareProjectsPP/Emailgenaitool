import { useState, useEffect } from 'react'
import './App.css'

// @ts-expect-error - typo-js doesn't have TypeScript definitions
import Typo from 'typo-js'

declare const alert: (message: string) => void

interface SpellChecker {
  check: (word: string) => boolean
}

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [subject, setSubject] = useState('')
  const [spellChecker, setSpellChecker] = useState<SpellChecker | null>(null)
  const [spellCheckResults, setSpellCheckResults] = useState<string[]>([])

  useEffect(() => {
    const checker = new Typo('en_US')
    setSpellChecker(checker)
  }, [])

  const handleSpellCheck = async () => {
    if (!spellChecker || !emailContent.trim()) {
      alert('Please enter some email content to check spelling.')
      return
    }

    const words = emailContent.toLowerCase().match(/\b[a-zA-Z]+\b/g) || []
    const misspelledWords: string[] = []

    words.forEach(word => {
      if (!spellChecker.check(word)) {
        if (!misspelledWords.includes(word)) {
          misspelledWords.push(word)
        }
      }
    })

    setSpellCheckResults(misspelledWords)

    if (misspelledWords.length === 0) {
      alert('No spelling errors found!')
    } else {
      alert(`Found ${misspelledWords.length} potential spelling errors: ${misspelledWords.join(', ')}`)
    }
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
          {spellCheckResults.length > 0 && (
            <div className="spell-check-results" style={{marginTop: '10px', padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px'}}>
              <p><strong>Potential spelling errors found:</strong> {spellCheckResults.join(', ')}</p>
            </div>
          )}
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
