
import './App.css'
import { ContactCard } from './widjets/Schedule/ui/ContactCard/ContactCard'
import { Schedule } from './widjets/Schedule/ui/Schedule/Schedule'

function App() {
  

  return (
    <div className='containerHolder'>
      <div className='headliner'>
          <h1 >Session Schedule</h1>
      </div>      
      <div className='session'>      
        <Schedule/>
        <ContactCard/>  
      </div>
    </div>
    
  )
}

export default App
