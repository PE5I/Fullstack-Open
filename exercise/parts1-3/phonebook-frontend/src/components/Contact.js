
const ContactLine = ({ contact, onClick }) => {
    return (
        <li>
            {contact.name} {contact.number}
            <button onClick={onClick(contact.id)}>delete</button>
        </li>
    )
}

const Contact = ({ persons, searchTerm, onClick }) => {
    return (
        <div>
            <ul>
            {persons.filter(person => searchTerm.length === 0 
                    ? person 
                    : person.name.toUpperCase().includes(searchTerm.toUpperCase()))
                .map(person => <ContactLine key={person.id} onClick={onClick} contact={person} />)}
            </ul>        
        </div>
    )
}

export default Contact