import { SocialIcon } from "../../../../entites/SocialIcon/ui/SocialIcon"
import { dataContact } from "../../lib/dataContact"
import './ContactCard.css'

export const ContactCard = () => {
    return(
        <div className="cardHolder">
            <div className="cardContact">
                {dataContact.map(({id,title,info}) => (
                    <div key={id} >
                        <p className='contactTitle'>{title}</p>  
                        <div className='contactInfo'>
                            {info.map((line, index) => (
                            <div key={index}>
                                {line}
                            </div>
                            ))}
                        </div> 
                    </div>
                ))}
            </div>
            <div className="cardConnect">        
                <SocialIcon className='iconWapper'/>
            </div>
            
        </div>
    )
}