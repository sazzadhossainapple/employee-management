import React, { useState } from 'react';
import editIcon from '../../assets/icon/edit.svg';
import TrashIcon from '../../assets/icon/Trash.svg';
import profile from '../../assets/image/profile.webp';
import { Tooltip } from 'react-tooltip';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import UpdateEmployee from './UpdateEmployee';

const EmployeeList = ({ data, slNo, getPaginationList }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [updateShowEmployee, setUpdateShowEmployee] = useState(false);

    const [updateEmployee, setUpdateEmployee] = useState(null);

    // update team
    const handleUpdateClose = () => setUpdateShowEmployee(false);
    const handleUpdateShow = () => setUpdateShowEmployee(true);

    // pop up
    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    // delete action
    const handleConfirmAction = () => {
        handleCloseConfirmation();
    };

    return (
        <>
            <tr>
                <td className="table-td fw-medium align-middle text-center">
                    {slNo}
                </td>

                <td className="table-td fw-medium align-middle">
                    <div className="d-flex align-items-center justify-content-center">
                        <img
                            style={{ objectPosition: 'top' }}
                            width="40px"
                            height="40px"
                            src={
                                data?.image
                                    ? `${import.meta.env.VITE_API_KEY_URL}/${
                                          data?.image
                                      }`
                                    : profile
                            }
                            alt="profile"
                            className="object-fit-contain rounded-circle"
                        />
                    </div>
                </td>

                <td className="table-td fw-medium align-middle text-center">
                    {data?.name ? data?.name : 'N/A'}
                </td>

                <td className="table-td fw-medium align-middle text-center">
                    {data?.email ? data?.email : 'N/A'}
                </td>
                <td className="table-td fw-medium align-middle text-center">
                    {data?.phone ? data?.phone : 'N/A'}
                </td>
                <td className="table-td fw-medium align-middle text-center">
                    {data?.department ? data?.department : 'N/A'}
                </td>

                <td className="table-td fw-medium align-middle text-center">
                    {data?.address ? data?.address : 'N/A'}
                </td>

                <td className="table-td fw-medium align-middle text-center ">
                    <div className="d-flex align-items-center justify-content-center gap-1">
                        <button
                            className="bg-transparent border-0"
                            data-tooltip-id="edit-tooltip"
                            data-tooltip-content="Edit"
                            onClick={() => {
                                handleUpdateShow();
                                setUpdateEmployee(data);
                            }}
                        >
                            <img
                                height="20"
                                width="20"
                                src={editIcon}
                                alt="edit"
                            />
                        </button>

                        <button
                            onClick={handleShowConfirmation}
                            className="bg-transparent border-0"
                            data-tooltip-id="delete-tooltip"
                            data-tooltip-content="Delete"
                        >
                            <img
                                height="20"
                                width="20"
                                src={TrashIcon}
                                alt="delete"
                            />
                        </button>

                        <Tooltip id="view-tooltip" />
                        <Tooltip id="edit-tooltip" />
                        <Tooltip id="delete-tooltip" />
                    </div>
                </td>
            </tr>
            <ConfirmationDialog
                show={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmAction}
                name="text"
            />

            <UpdateEmployee
                show={updateShowEmployee}
                handleClose={handleUpdateClose}
                updateEmployee={updateEmployee}
                getPaginationList={getPaginationList}
            />
        </>
    );
};

export default EmployeeList;
