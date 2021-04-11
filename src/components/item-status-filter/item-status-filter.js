import React, {useState} from 'react';
import './item-status-filter.css';

const ItemStatusFilter = ({changeSearch}) => {

    const [classNames, setClassNames] = useState(['btn btn-info', 'btn btn-outline-secondary', 'btn btn-outline-secondary']);

    const all = () => {
        changeSearch('all');
        setClassNames(['btn btn-info', 'btn btn-outline-secondary', 'btn btn-outline-secondary']);
    };

    const active = () => {
        changeSearch('active');
        setClassNames(['btn btn-outline-secondary', 'btn btn-info', 'btn btn-outline-secondary']);
    };
    const done = () => {
        changeSearch('done');
        setClassNames(['btn btn-outline-secondary', 'btn btn-outline-secondary', 'btn btn-info']);
    };
    return (
        <div className="btn-group">
            <button type="button"
                    className={classNames[0]} onClick={all}>All
            </button>
            <button type="button"
                    className={classNames[1]} onClick={active}>Active
            </button>
            <button type="button"
                    className={classNames[2]} onClick={done}>Done
            </button>
        </div>
    );
};
export default ItemStatusFilter;
