import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../components/loading/Loading';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { MdAddCircleOutline } from 'react-icons/md';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';

const EmployeeData = [
    {
        image: 'https://example.com/images/user1.jpg',
        name: 'John Doe',
        phone: '1234567890',
        department: 'Sales',
        email: 'johndoe@example.com',
        address: '123 Main St, New York, NY 10001',
    },
    {
        image: 'https://example.com/images/user2.jpg',
        name: 'Jane Smith',
        phone: '9876543210',
        department: 'Marketing',
        email: 'janesmith@example.com',
        address: '456 Elm St, Los Angeles, CA 90012',
    },
    {
        image: 'https://example.com/images/user3.jpg',
        name: 'Robert Brown',
        phone: '5557891234',
        department: 'IT',
        email: 'robertbrown@example.com',
        address: '789 Oak St, Chicago, IL 60605',
    },
];

const Employee = () => {
    const [allVendor, setAllVendor] = useState([]);
    const [limit, setLimit] = useState(20);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // pagination
    function handlePageClick(e) {
        currentPage.current = e.selected + 1;
    }

    // get all vendor data
    const getPaginationList = async () => {
        // const url = `${import.meta.env.VITE_API_KEY_URL}?page=${
        //   currentPage.current
        // }&limit=${limit}`;
        // setIsLoading(true);
        // try {
        //   const data = await GetRequest({
        //     url,
        //     method: "GET",
        //     headers: {
        //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //     },
        //   });
        //   // Assuming the response structure
        //   const totalVendor = data?.data?.totalBranchLists || 0;
        //   const totalPages = Math.ceil(totalVendor / limit);
        //   setPageCount(totalPages);
        //   setAllVendor(data?.data?.Branchs || []);
        // } catch (error) {
        //   console.error("Error fetching data:", error.message);
        // } finally {
        //   setIsLoading(false);
        // }
    };

    useEffect(() => {
        currentPage.current = 1;
        getPaginationList();
    }, [limit, pageCount]);

    //   if (isLoading) {
    //     return (
    //       <div className="min-vh-100 d-flex align-items-center justify-content-center">
    //         <Loading />
    //       </div>
    //     );
    //   }

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
                            placeholder="Search by name or email"
                        />
                    </div>

                    <div className="col-md-3">
                        <select className="w-100 input-field" name="">
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
                        <select className="w-100 input-field" name="">
                            <option value="" selected disabled>
                                Select Status
                            </option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="filter-btn w-100 bg-danger">
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
                            {EmployeeData?.map((data, i) => (
                                <EmployeeList
                                    data={data}
                                    key={data.id}
                                    getPaginationList={getPaginationList}
                                    slNo={i + 1}
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
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
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
