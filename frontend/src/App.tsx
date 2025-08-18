import { useState, useEffect, useRef } from 'react'
import './App.css'

// @ts-expect-error - typo-js doesn't have TypeScript definitions
import Typo from 'typo-js'

interface SpellChecker {
  check: (word: string) => boolean
}

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [subject, setSubject] = useState('')
  const [spellChecker, setSpellChecker] = useState<SpellChecker | null>(null)
  const [validationMessage, setValidationMessage] = useState<string>('')
  const [isLoadingDictionary, setIsLoadingDictionary] = useState<boolean>(true)
  const [resultText, setResultText] = useState<string>('')
  // eslint-disable-next-line no-undef
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setIsLoadingDictionary(true)
        
        const [affResponse, dicResponse] = await Promise.all([
          // eslint-disable-next-line no-undef
          fetch(`${window.location.protocol}//${window.location.host}/en_US.aff`),
          // eslint-disable-next-line no-undef
          fetch(`${window.location.protocol}//${window.location.host}/en_US.dic`)
        ])
        
        if (!affResponse.ok || !dicResponse.ok) {
          throw new Error('Failed to load dictionary files')
        }
        
        const affData = await affResponse.text()
        const dicData = await dicResponse.text()
        
        const checker = new Typo('en_US', affData, dicData)
        setSpellChecker(checker)
        setValidationMessage('')
      } catch (error) {
        console.error('Error loading dictionary:', error)
        setValidationMessage('Failed to load spell check dictionary. Please refresh the page.')
      } finally {
        setIsLoadingDictionary(false)
      }
    }
    
    loadDictionary()
  }, [])

  const handleSpellCheck = async () => {
    setValidationMessage('')
    setResultText('')
    
    if (isLoadingDictionary) {
      setValidationMessage('Dictionary is still loading. Please wait a moment and try again.')
      return
    }
    
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

    if (misspelledWords.length === 0) {
      setResultText(`✅ No spelling errors found in the ${isSelectedText ? 'selected text' : 'text'}!`)
      setValidationMessage('')
    } else {
      setResultText(`⚠️ Potential spelling errors found: ${misspelledWords.join(', ')}`)
      setValidationMessage('')
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
        
        <div className="textarea-container">
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
          </div>
          
          <div className="form-group">
            <label htmlFor="result">Result:</label>
            <textarea
              id="result"
              value={resultText}
              placeholder="Spell check results will appear here..."
              rows={10}
              readOnly
            />
          </div>
        </div>
        
        {validationMessage && (
          <div className="validation-message" style={{marginTop: '10px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', color: '#721c24'}}>
            <p><strong>{validationMessage}</strong></p>
          </div>
        )}
        
        <div className="button-group">
          <button 
            onClick={handleSpellCheck} 
            className="btn btn-primary"
            disabled={isLoadingDictionary}
          >
            {isLoadingDictionary ? 'Loading Dictionary...' : 'Check Spelling'}
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
