
const PersonForm = ({ textHead, textName, textNumber, onSubmit, onChangeName, onChangeNumber, valueName, valueNumber }) => {

    return (
        <div>
            <h2>{textHead}</h2>
            <form onSubmit={onSubmit}>
            <div>
                {textName} <input value={valueName} onChange={onChangeName}/>
            </div>
            <div>
                {textNumber} <input value={valueNumber} onChange={onChangeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
      </div>
    )
}

export default PersonForm