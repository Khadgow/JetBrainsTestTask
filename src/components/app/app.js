import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";
import ChartBar from "../chart-bar";
import './app.css';

const App = () => {

    const [maxId, setMaxId] = useState(0);
    const [tasks, setTasks] = useState(initialStateData());
    const [filterInput, setFilterInput] = useState("");
    const [activeSearch, setActiveSearch] = useState("all");

    function initialStateData() {
        if (localStorage.todoData) {
            let newStateData = [];
            JSON.parse(localStorage.todoData).forEach((item, index) => {
                item.id = index;
                newStateData.push(item);
            });

            return newStateData;
        } else {
            return [];
        }
    }

    useEffect(() => {
        setMaxId(localStorage.todoData ? JSON.parse(localStorage.todoData).length : 0);
    }, []);

    function createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: maxId
        }
    }

    function addItem(text) {
        const newItem = createTodoItem(text);
        setMaxId(prevMaxId => prevMaxId + 1);
        setTasks(prevTasks => [...prevTasks, newItem]);
    }

    function deleteItem(id) {
        setTasks(prevTasks => {
            const idx = prevTasks.findIndex((el) => el.id === id);
            return [...prevTasks.slice(0, idx), ...prevTasks.slice(idx + 1)];
        });
    }

    function toggleProperty(arr, id, propName) {

        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];

        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    function togglePropertyDone(arr, id) {

        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];

        let newItem;
        if (oldItem.done) {
            newItem = {...oldItem, done: !oldItem.done};
        } else {
            const dayOfWeekDone = new Date().getDay();
            newItem = {...oldItem, done: !oldItem.done, dayOfWeekDone};
        }

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    function onToggleImportant(id) {
        setTasks(prevTasks => toggleProperty(prevTasks, id, 'important'));
    }

    function onToggleDone(id) {

        setTasks(prevTasks => togglePropertyDone(prevTasks, id));
    }

    function onFilter(e) {
        setFilterInput(e.target.value);
    }

    useEffect(() => {
        localStorage.todoData = JSON.stringify(tasks);
    }, [tasks]);


    const doneCount = tasks.filter((el) => el.done).length;

    const todoCount = tasks.length - doneCount;

    return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} changeTasks={setTasks}/>
            <div className="top-panel d-flex">
                <SearchPanel filter={onFilter}/>

                <ItemStatusFilter
                    changeSearch={setActiveSearch}
                />

            </div>

            <TodoList
                activeSearch={activeSearch}
                filter={filterInput}
                tasks={tasks}
                onDeleted={deleteItem}
                onToggleImportant={onToggleImportant}
                onToggleDone={onToggleDone}
            />

            <ItemAddForm addItem={addItem}/>
            {activeSearch === "done" ? <ChartBar tasks={tasks}/> : null}
        </div>
    );
};
export default App;
