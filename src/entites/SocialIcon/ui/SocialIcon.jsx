import { dataIcon } from "../lib/dataIcon"
import './SocialIcon.css'

export const SocialIcon = () => {
    return(
        <div className="iconWapper" >
            {dataIcon.map(({id,icon,href}) => (
                <a 
                    key={id}
                    href={href}
                    rel="noopener noreferrer"
                    target='_blank' 
                    className="circle"                                                    
                    >
                        {icon ('#FDCE16')}

                </a>
            ))}
        </div>
    )
}