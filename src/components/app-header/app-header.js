import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done, changeTasks}) => {

    function readFile(input) {
        let file = input.target.files[0];

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function () {
            let newTasks = JSON.parse(reader.result);
            changeTasks(newTasks);
            input.target.value = '';
        };

        reader.onerror = function () {
            console.log(reader.error);
            input.target.value = '';
        };
    }

    return (
        <div className="app-header d-flex flex-row">
            <h1>Todo List</h1>
            <h2>{toDo} more to do, {done} done</h2>
            <div className="file-input-div">
                <label htmlFor="formFile">Upload JSON file</label>
                <input type="file" id="formFile" accept=".json" onChange={(e) => readFile(e)}/>
            </div>
        </div>
    );
};

export default AppHeader;
