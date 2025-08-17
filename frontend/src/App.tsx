import { useState, useEffect, useRef } from 'react'
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
  const [validationMessage, setValidationMessage] = useState<string>('')
  // eslint-disable-next-line no-undef
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const checker = new Typo('en_US')
    setSpellChecker(checker)
  }, [])

  const handleSpellCheck = async () => {
    setValidationMessage('')
    setSpellCheckResults([])
    
    if (!spellChecker || !emailContent.trim()) {
      setValidationMessage('Please enter some email content to check spelling.')
      return
    }

    const textarea = textareaRef.current
    if (!textarea) {
      setValidationMessage('Unable to access text area.')
      return
    }

    const selectionStart = textarea.selectionStart
    const selectionEnd = textarea.selectionEnd
    
    let textToCheck = ''
    let isSelectedText = false

    if (selectionStart !== selectionEnd) {
      textToCheck = emailContent.substring(selectionStart, selectionEnd)
      isSelectedText = true
    } else {
      setValidationMessage('Please select the text you want to spell check, or select all text (Ctrl+A) to check the entire email.')
      return
    }

    const words = textToCheck.toLowerCase().match(/\b[a-zA-Z]+\b/g) || []
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
      setValidationMessage(`No spelling errors found in the ${isSelectedText ? 'selected text' : 'text'}!`)
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
            ref={textareaRef}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Compose your email here..."
            rows={10}
          />
          {validationMessage && (
            <div className="validation-message" style={{marginTop: '10px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', color: '#721c24'}}>
              <p><strong>{validationMessage}</strong></p>
            </div>
          )}
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
