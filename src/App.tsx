import './App.css'
import { Card } from './components/Card'

function App() {
  return (
    <div>
        <Card card={{originalWord: 'cat', translatedWord: 'kot'}} />
    </div>
  )
}

export default App
