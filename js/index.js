import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

/**
 1. När användaren lägger till en ny todo i AddTodo
 2. Skicka "upp" denna todo parent (App) och uppdatera state med
    den nya todo:n
 */

function useCustomHook() {
    const [test, setTest] = useState('');
    const [test2, setTest2] = useState('');

    useEffect(() => {
        if (test === 'Hej') {
            setTest2('Hejsan');
        } else {
            setTest2('Hoppsan');
        }
    }, [test])

    return [test2, setTest];
}

function App(props){
    const [todos, setTodos] = useState(null);
    const [latestTodo, setLatestTodo] = useState('');
    const [customHookState, setCustomHookState] = useCustomHook('');

    function addTodo(todo) {
        console.log('I addTodo: ', todo);  
        setTodos(prevState => prevState.concat(todo));

        setLatestTodo(todo.todo);
    }

    //Kör useEffect varje gång state uppdateras samma som livscykelmetoden componentDidUpdate
    //OBS! Om du uppdaterar state i denna useEffect så kommer samma useEffect köras igen.
    //Beware of endless loops!
    /*useEffect(() => {

    });*/

    //Kör useEffect en gång vid första renderingen samma som livscykelmetoden componentDidMount
    useEffect(() => {
        async function getTodos() {
            const response = await fetch('http://awesome-todo-api.herokuapp.com/tasks');
            const data = await response.json();

            setTodos(data)
        }

        getTodos();
        setCustomHookState('Hej')
    }, []);

    //Kör useEffect varje gång som todos uppdateras
    useEffect(() => {
        console.log('Uppdaterade todo');
    }, [todos]);

    return (
        <article className="todo-app">
            <h1>{props.title} {customHookState}</h1>
            <ul className="todo-list">
                { todos && todos.map((todo, index) => {
                    return <TodoItem item={ todo.task } key={ index } done={ false } />
                }) }
            </ul>

            <p>Senast tillagda: { latestTodo }</p>

            <AddTodo updateState={ addTodo } />
        </article>
    )
}


ReactDOM.render(<App title="Todo" />, document.getElementById('root'));