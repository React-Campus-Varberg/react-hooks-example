import React, { useState } from 'react';

// {item} - kallas för destructering och kan användas för att plocka ut en egenskap från props-objektet
function TodoItem(props) {
    console.log(props);
    const [done, setDone] = useState(props.done);

    return (
        <li
            className={ 'todo-item' + (done ? ' done' : '') }
            onClick={ () => setDone(prevState => !prevState) }>
                {props.item}
        </li>
    )
}

export default TodoItem;