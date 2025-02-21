import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UpdateEmployee = ({
    show,
    handleClose,
    getPaginationList,
    updateEmployee,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        if (updateEmployee) {
            reset(updateEmployee);
            if (updateEmployee.image) {
                const ImageUrl = `${import.meta.env.VITE_API_KEY_URL}/${
                    updateEmployee.image
                }`;

                setImagePreview(ImageUrl);
            }
        }
    }, [updateEmployee, reset]);

    const handleClickImage = () => {
        imageInputRef.current.click();
    };

    // Handle File Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError('image', { type: 'manual', message: 'Image is required' });
            return;
        }
        if (!file.type.startsWith('image/')) {
            setError('image', {
                type: 'manual',
                message: 'Invalid file type. Please upload an image.',
            });
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setSelectedImage(file);
            clearErrors('image'); // Clear error if image is valid
        };
        reader.readAsDataURL(file);
    };

    // Form Submit Handler
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('dept_id', data.dept_id);
        formData.append('address', data.address);

        if (selectedImage) {
            formData.append('file', selectedImage);
        }

        setLoading(true);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_KEY_URL}/api/employee/${
                    updateEmployee?._id
                }`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Employee updated successfully!');
                reset();
                setImagePreview(null);
                setSelectedImage(null);
                clearErrors('image');
                getPaginationList();
                handleClose();
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Error updating employee.');
        }
        setLoading(false);
    };
    return (
        <Modal
            show={show}
            onHide={handleClose}
            scrollable={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className="modal-title ps-2 text-model-title"
                    id="contained-modal-title-vcenter"
                >
                    Update Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 form-body">
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 col-6">
                        <label className="mb-2 fw-medium form-label form-title-label">
                            Employee Name <sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="text"
                            className="w-100 input-field bg-input"
                            placeholder="Employee Name"
                            {...register('name', { required: true })}
                        />
                        {errors.name && (
                            <span className="text-danger error-text">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="mb-2 fw-medium form-label form-title-label">
                            Email <sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="email"
                            className="w-100 input-field bg-input"
                            placeholder="Email Address"
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <span className="text-danger error-text">
                                Email is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="mb-2 fw-medium form-label form-title-label">
                            Phone <sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="number"
                            className="w-100 input-field bg-input"
                            placeholder="Phone Number"
                            {...register('phone', { required: true })}
                        />
                        {errors.phone && (
                            <span className="text-danger error-text">
                                Phone is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="mb-2 fw-medium form-label form-title-label">
                            Department <sup className="text-danger">*</sup>
                        </label>

                        <select
                            className="w-100 input-field bg-input"
                            {...register('dept_id', { required: true })}
                        >
                            <option value="" disabled>
                                Select Department
                            </option>
                            <option value="Sales">Sales</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Engineering">Engineering</option>
                            <option value="HR">HR</option>
                            <option value="IT Support">IT Support</option>
                        </select>

                        {errors.dept_id && (
                            <span className="text-danger error-text">
                                Department is required
                            </span>
                        )}
                    </div>
                    <div className="mb-3 col-12">
                        <label className="mb-2 fw-medium form-label form-title-label">
                            Address <sup className="text-danger">*</sup>
                        </label>
                        <textarea
                            rows="4"
                            className="w-100 input-field bg-input"
                            placeholder="Address"
                            {...register('address', { required: true })}
                        ></textarea>

                        {errors.address && (
                            <span className="text-danger error-text">
                                Address is required
                            </span>
                        )}
                    </div>

                    <div className="mb-3 col-12">
                        <label className="mb-2 fw-medium form-label form-title-label">
                            Image <sup className="text-danger">*</sup>
                        </label>
                        <div
                            className="signature-img-container d-flex align-items-center justify-content-center rounded-3 p-3 bg-input"
                            style={{ cursor: 'pointer', height: '100px' }}
                            onClick={handleClickImage}
                        >
                            {imagePreview ? (
                                <img
                                    className="object-fit-contain"
                                    src={imagePreview}
                                    alt="image"
                                    style={{
                                        cursor: 'pointer',
                                        width: '100px',
                                        height: '100px',
                                    }}
                                />
                            ) : (
                                <p className="m-0">Click to upload image</p>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={imageInputRef}
                                className="d-none"
                            />
                        </div>
                        {errors.image && (
                            <span className="text-danger d-block mt-2">
                                {errors.image.message}
                            </span>
                        )}
                    </div>

                    <div className="mt-2 mb-3 d-flex justify-content-end">
                        <input
                            type="submit"
                            className="button-crm"
                            value={loading ? 'Loading...' : 'Update'}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateEmployee;
