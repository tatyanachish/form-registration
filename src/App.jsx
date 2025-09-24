
import './App.css'
import { SocialIcon } from './entites/SocialIcon/ui/SocialIcon'
import { ContactCard } from './widjets/Schedule/ui/ContactCard/ContactCard'
import { Schedule } from './widjets/Schedule/ui/Schedule/Schedule'

function App() {
  

  return (
    <div className='containerHolder'>
      <div className='headliner'>
          <h1 >Session Schedule</h1>
      </div>      
      <div className='session'>      
        <Schedule  className='schedule'/>
        <ContactCard/>  
      </div>
    </div>
    
  )
}

export default App
