
const ContactLine = ({ contact }) => {
    return (
        <li>{contact.name} {contact.number}</li>
    )
}

const Contact = ({ persons, searchTerm }) => {
    return (
        <div>
            <ul>
            {persons.filter(person => searchTerm.length === 0 
                    ? person 
                    : person.name.toUpperCase().includes(searchTerm.toUpperCase()))
                .map(person => <ContactLine key={person.id} contact={person} />)}
            </ul>        
        </div>
    )
}

export default Contact