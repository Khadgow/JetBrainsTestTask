import React, {useEffect, useState} from 'react';
import {Bar} from "react-chartjs-2";

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const ChartBar = ({tasks}) => {

    const [chartData, setData] = useState({
        labels: ['Monday', 'tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Tasks done',
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        let newData = [0, 0, 0, 0, 0, 0, 0];
        for (let task of tasks) {
            if (task.done) {
                const dataIdx = task.dayOfWeekDone === 0 ? 6 : task.dayOfWeekDone - 1;
                newData[dataIdx]++;
            }
        }
        setData(prevData => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: newData
                }
            ]
        }))
    }, [tasks]);


    return <Bar data={chartData} options={options}/>
};
export default ChartBar;
