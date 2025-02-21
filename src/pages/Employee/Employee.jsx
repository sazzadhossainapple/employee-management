import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { MdAddCircleOutline } from 'react-icons/md';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import axios from 'axios';

const Employee = () => {
    const [allEmployee, setAllEmployee] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef(1);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        currentPage.current = 1;
        getPaginationList();
    }, [limit, department, status, search]);

    // get all employee
    const getPaginationList = async () => {
        const url = `${import.meta.env.VITE_API_KEY_URL}/api/employee?page=${
            currentPage.current
        }&limit=${limit}&department=${department || ''}&status=${
            status || ''
        } &name=${search || ''}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const totalEmployee = response?.data?.data?.totalEmployeeLists || 0;
            const totalPages = Math.ceil(totalEmployee / limit);

            setPageCount(totalPages);
            setAllEmployee(response?.data?.data?.Employees || []);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // pagination
    const handlePageClick = (e) => {
        currentPage.current = e.selected + 1;
        getPaginationList();
    };

    function resetBtn() {
        setDepartment('');
        setStatus('');
        setSearch('');
    }

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="dashboard-title">Employee</h2>
                <div>
                    <button
                        onClick={handleShow}
                        className="button-crm text-decoration-none d-flex align-items-center gap-1"
                    >
                        <MdAddCircleOutline />
                        Add Employee
                    </button>
                </div>
            </div>

            <div className="filter-contaner mt-4">
                <div className="row g-2">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name=""
                            className="w-100 input-field"
                            placeholder="Search by name"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>

                    <div className="col-md-3">
                        <select
                            className="w-100 input-field"
                            name=""
                            onChange={(e) => setDepartment(e.target.value)}
                            value={department}
                        >
                            <option value="" selected disabled>
                                Select Department
                            </option>
                            <option value="Sales">Sales</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Engineering">Engineering</option>
                            <option value="HR">HR</option>
                            <option value="IT Support">IT Support</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select
                            className="w-100 input-field"
                            name=""
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        >
                            <option value="" selected disabled>
                                Select Status
                            </option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button
                            onClick={resetBtn}
                            className="filter-btn w-100 bg-danger"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white table-rounded">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-th fw-medium table-color align-middle table-radius-left text-center">
                                    SL.NO
                                </th>
                                <th className="table-th fw-medium table-color align-middle text-center">
                                    Image
                                </th>
                                <th className="table-th fw-medium table-color align-middle text-center">
                                    Name
                                </th>
                                <th className="table-th fw-medium table-color align-middle text-center">
                                    Email
                                </th>
                                <th className="table-th fw-medium table-color align-middle text-center">
                                    Phone
                                </th>
                                <th className="table-th fw-medium table-color align-middle text-center">
                                    Department
                                </th>
                                <th className="table-th fw-medium table-color align-middle text-center">
                                    Address
                                </th>
                                <th className="table-th fw-medium table-color align-middle table-radius-right text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allEmployee?.map((data, index) => (
                                <EmployeeList
                                    data={data}
                                    key={data?._id}
                                    getPaginationList={getPaginationList}
                                    slNo={
                                        (currentPage.current - 1) * limit +
                                        index +
                                        1
                                    }
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 pb-4 px-4">
                    <ReactPaginate
                        breakLabel="......."
                        nextLabel={
                            <span
                                className="fw-medium align-items-center gap-2 "
                                style={{ color: '#191919', fontSize: '14px' }}
                            >
                                <span> Next </span>
                                <FaArrowRight />
                            </span>
                        }
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        previousLabel={
                            <span
                                className="fw-medium align-items-center gap-2 "
                                style={{ color: '#191919', fontSize: '14px' }}
                            >
                                <FaArrowLeft /> <span>Previous</span>
                            </span>
                        }
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={2}
                        containerClassName="pagination align-items-center justify-content-end"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                    />
                </div>
            </div>

            <AddEmployee
                show={show}
                handleClose={handleClose}
                getPaginationList={getPaginationList}
            />
        </div>
    );
};

export default Employee;
