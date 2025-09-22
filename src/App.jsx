
import './App.css'
import { ContactCard } from './widjets/Schedule/ui/ContactCard/ContactCard'
import { Schedule } from './widjets/Schedule/ui/Schedule/Schedule'

function App() {
  

  return (
    <div className='session'>      
      <Schedule  className='schedule'/>
      <ContactCard/>     
    </div>
  )
}

export default App
