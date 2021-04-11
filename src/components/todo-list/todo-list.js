import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = (props) => {
    let filteredItems;

    const {tasks, onDeleted, onToggleDone, onToggleImportant, filter, activeSearch} = props;
    if (!filter.trim()) {
        filteredItems = tasks;
    } else {
        filteredItems = tasks.filter((item) => {
            return item.label.toLowerCase().includes(filter)
        });
    }

    if (activeSearch !== 'all') {
        if (activeSearch === 'done') {
            filteredItems = filteredItems.filter((item) => {
                return item.done
            });
        } else {
            filteredItems = filteredItems.filter((item) => {
                return !item.done
            });
        }

    }
    const elements = filteredItems.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;
