import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdLogout, MdOutlineMenu } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegBell } from 'react-icons/fa';
import profileImg from '../../assets/image/profile.webp';
import { Link } from 'react-router';

const DashboardHeader = ({ isSmallMenu, toggleMenu }) => {
    return (
        <div
            className={
                isSmallMenu
                    ? 'small-left-menu header-left d-flex align-items-center justify-content-between'
                    : 'header-left d-flex align-items-center justify-content-between'
            }
        >
            <div>
                <i
                    id="toggle-left-menu"
                    className="fa fa-bars"
                    onClick={toggleMenu}
                >
                    <MdOutlineMenu />
                </i>
            </div>
            <div className="pe-4 d-flex align-items-center gap-4">
                <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center p-3"
                    style={{ height: '40px', width: '40px' }}
                >
                    <Dropdown>
                        <Dropdown.Toggle className="bg-transparent position-relative border-0 p-0 notification-buttons">
                            <button className="bg-transparent border-0 d-inline-block position-relative">
                                <FaRegBell
                                    style={{
                                        fontSize: '16px',
                                        color: '#171215',
                                    }}
                                />
                                <div className="position-absolute  notifications"></div>
                            </button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '300px' }}>
                            <p className="text-center m-0 pt-1 fw-bold">
                                Notification
                            </p>
                            <hr />
                            <div
                                style={{ height: '200px', overflowY: 'scroll' }}
                            >
                                <div className="notification-flex">
                                    {/* {notificationData?.slice(0, 10).map((data) => (
                    <div
                      className="notification-card d-flex align-items-center gap-3 px-2"
                      key={data.id}
                    >
                      <div>
                        <div
                          className={`notification-icon-card ${
                            data.read === true
                              ? "notication-border"
                              : "notication-bg-1"
                          } `}
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <FaRegBell
                            className={`notification-icon ${
                              data.read === true
                                ? "notification-color"
                                : "text-white"
                            }`}
                            style={{
                              fontSize: "18px",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="m-0 notification-content">
                          {data.text ? truncate(data.text, 20) : "N/A"}
                        </p>
                        <p className="mb-0 notification-date mt-1">
                          {data?.createdAt
                            ? moment(data.createdAt).fromNow()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  ))} */}
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center justify-content-center">
                                <Link
                                    to=""
                                    className="text-center text-black fw-bold"
                                    style={{ fontSize: '14px' }}
                                >
                                    View All
                                </Link>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Dropdown className="bg-transparent">
                    <Dropdown.Toggle className="bg-transparent position-relative border-0 p-0 notification-buttons">
                        <div className="d-flex align-items-center gap-2">
                            <div className="profile-img">
                                <img src={profileImg} alt="profile" />
                            </div>
                            <div className="porfile-content">
                                <p className="user-name m-0">Sazzad Hossain</p>
                                <p className="user-dig m-0 text-start">
                                    Forntend Developer
                                </p>
                            </div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link
                                to=""
                                className="text-dark w-100 d-block d-flex align-items-center gap-1 text-decoration-none"
                            >
                                <CgProfile style={{ fontSize: '20px' }} />
                                <span> Profile</span>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item className="mb-2">
                            <Link
                                to=""
                                className="text-dark w-100 d-block d-flex align-items-center gap-1 text-decoration-none"
                            >
                                <RiLockPasswordLine
                                    style={{ fontSize: '20px' }}
                                />
                                <span> Change Password</span>
                            </Link>
                        </Dropdown.Item>
                        <hr />
                        <Dropdown.Item className="mb-2">
                            <button className="bg-transparent border-0 d-flex align-items-center gap-1">
                                <MdLogout style={{ fontSize: '20px' }} />

                                <span>Logout</span>
                            </button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default DashboardHeader;
