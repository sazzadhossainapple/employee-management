import React from 'react';
import { FaChartBar } from 'react-icons/fa';
import { GoProject } from 'react-icons/go';
import { MdPeopleAlt } from 'react-icons/md';
import CardDashboard from '../../components/CardDashboard/CardDashboard';
import BarChartTarget from '../../components/BarChartTarget/BarChartTarget';
import PieCharts from '../../components/PieCharts/PieCharts';

const cardData = [
    {
        count: '72',
        name: 'Total Employees',
        iconColor: '#00AC4F',
        iconBg: '#d3ffe7',
        icon: <MdPeopleAlt />,
    },
    {
        count: '03',
        name: 'New Projects',
        iconColor: '#0F5FC2',
        iconBg: '#CDF4FF',
        icon: <GoProject />,
    },
    {
        count: '56%',
        name: 'Today Profit',
        iconColor: '#DA001A',
        iconBg: '#FFD4F3',
        icon: <FaChartBar />,
    },
    {
        count: '05',
        name: 'Today Leave',
        iconColor: '#030a00',
        iconBg: '#0da52845',
        icon: <MdPeopleAlt />,
    },
];
const Dashboard = () => {
    return (
        <div>
            <h2 className="dashboard-title">Dashboard</h2>

            <div className="overview-card-grid">
                {cardData?.map((data, i) => (
                    <CardDashboard data={data} key={i} />
                ))}
            </div>

            <div className="chart-notification ">
                <div className="chart-left bg-white border-radius-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="overview-target-title ">Expense</h3>
                        <div>
                            <select class="form-select select-focus input-text-14">
                                <option selected value="">
                                    2025
                                </option>
                                <option>2024</option>
                                <option value="1">2023</option>
                                <option value="2">2022</option>
                                <option value="3">2021</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3">
                        <BarChartTarget />
                    </div>
                </div>
                <div className="notification-right bg-white border-radius-12">
                    <h3 className="overview-target-title ">Attendances</h3>

                    <div className="mt-3 h-100">
                        <PieCharts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
