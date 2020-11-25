import React from 'react';

// {item} - kallas för destructering och kan användas för att plocka ut en egenskap från props-objektet
function AddTodo(props) {
    console.log(props);
    const handleKeyUp = (event) => {
        //console.log(event);
        if(event.key == 'Enter') {
            console.log('Todo added: ', event.target.value);
            props.updateState({ task: event.target.value })
        }
    }

    return (
        <section className="add-todo">
            <p>Parameter i url:en { props.param.params.id }</p>
            <input className="input-field" placeholder="Skriv in en todo" onKeyUp={handleKeyUp} />
        </section>
    )
}

export default AddTodo;