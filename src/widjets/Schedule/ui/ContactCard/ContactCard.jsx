import { dataContact } from "../../lib/dataContact"

export const ContactCard = () => {
    return(
        <div>
            {dataContact.map(({id,title,info}) => (
                <div key={id}>
                    <p>{title}</p>  
                    <p>{info}</p> 
                </div>
            ))}
        </div>
    )
}