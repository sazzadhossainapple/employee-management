import React, { useEffect, useState } from 'react';
import profile from '../../assets/image/profile.webp';
import Loading from '../../components/loading/Loading';
import axios from 'axios';

const EmployeeCardList = () => {
    const [allEmployee, setAllEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // get all employee
    const getPaginationList = async () => {
        const url = `${import.meta.env.VITE_API_KEY_URL}/api/employee`;

        setIsLoading(true);

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setAllEmployee(response?.data?.data?.Employees || []);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPaginationList();
    }, []);

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <h2 className="dashboard-title">Employee</h2>

            <div className="grid-card-container">
                {allEmployee?.map((data) => (
                    <div key={data?._id}>
                        <div className="containers shadow rounded">
                            <div className="shape">
                                <div className="image">
                                    <img
                                        src={
                                            data?.image
                                                ? `${
                                                      import.meta.env
                                                          .VITE_API_KEY_URL
                                                  }/${data?.image}`
                                                : profile
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="padding-card">
                                <h3 className="h3 fw-bold">
                                    {data?.name ? data?.name : 'N/A'}
                                </h3>
                                <h3 className="title">
                                    {data?.email ? data?.email : 'N/A'}
                                </h3>
                                <p className="p m-0">
                                    {data?.phone ? data?.phone : 'N/A'}
                                </p>
                                <p
                                    className="p m-0"
                                    style={{ fontSize: '12px' }}
                                >
                                    {data?.address ? data?.address : 'N/A'}
                                </p>
                                <div className="mt-3">
                                    <button className="button-crm text-decoration-none ">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeCardList;
