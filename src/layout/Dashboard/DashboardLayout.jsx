import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import DashboardHeader from './DashboardHeader';
import dahbordIcon from '../../assets/sidebarIcon/dashboard_icon.svg';
import employeeIcon from '../../assets/sidebarIcon/employeeIcon.svg';
import cardIcon from '../../assets/sidebarIcon/cardIcon.svg';
import { Link, NavLink, Outlet } from 'react-router';
import logo from '../../assets/image/logo-6.png';

const menuData = [
    {
        label: 'Dashboard',
        img: dahbordIcon,
        icon: '',
        path: '/',
        user_type: [],
    },
    {
        label: 'Employee Table View',
        img: employeeIcon,
        icon: '',
        path: '/employee',
        user_type: [],
    },
    {
        label: 'Employee List',
        img: cardIcon,
        icon: '',
        path: '/employee/card',
        user_type: [],
    },

    // {
    //     label: 'Team',
    //     img: employeeIcon,
    //     icon: '',
    //     user_type: [],
    //     submenu: [
    //         {
    //             label: 'All Team',
    //             path: '/team',
    //             user_type: [],
    //         },
    //         {
    //             label: 'Add Tema',
    //             path: '/team/add',
    //             user_type: [],
    //         },
    //     ],
    // },
];

const DashboardLayout = () => {
    const [isSmallMenu, setIsSmallMenu] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [showLabel, setShowLabel] = useState({
        visible: false,
        text: '',
        top: 0,
        left: 0,
        submenu: [],
    });
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 992) {
                setIsSmallMenu(true);
            } else {
                setIsSmallMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // const toggleMenu = () => {
    //     setIsSmallMenu(!isSmallMenu);
    // };

    // const toggleSubmenu = (index) => {
    //     setActiveSubmenu((prevIndex) => (prevIndex === index ? null : index));
    // };
    const toggleMenu = () => {
        setIsSmallMenu(!isSmallMenu);
    };

    const toggleSubmenu = (index) => {
        if (activeSubmenu === index) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(index);
        }
    };

    const handleMouseOver = (e, label, submenu, path) => {
        if (isSmallMenu) {
            const rect = e.currentTarget.getBoundingClientRect();
            setShowLabel({
                visible: true,
                text: label,
                top: rect.top + window.scrollY,
                left: rect.right + 10,
                submenu:
                    submenu.length > 0
                        ? submenu.map((item) => ({ ...item, to: item.path }))
                        : [],
                link: submenu.length > 0 ? submenu[0].path : path,
            });
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    };

    const handleMouseOut = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowLabel({
                visible: false,
                text: '',
                top: 0,
                left: 0,
                submenu: [],
                link: '',
            });
        }, 1000);
    };

    const handleLabelMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowLabel((prevState) => ({ ...prevState, visible: true }));
    };

    const handleLabelMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowLabel({
                visible: false,
                text: '',
                top: 0,
                left: 0,
                submenu: [],
                link: '',
            });
        }, 1000);
    };

    return (
        <div className="body">
            <div id="logo" className={isSmallMenu ? 'small-left-menu' : ''}>
                <span className="big-logo">
                    <span className="fw-bold d-flex  gap-2">
                        <span
                            style={{
                                border: '3px solid #025864',
                                borderRadius: '5px',
                            }}
                        >
                            <img
                                height="50"
                                width="50"
                                src={logo}
                                alt="logo"
                                loading="lazy"
                                className=""
                            />
                        </span>

                        <span className="d-flex flex-column">
                            <span style={{ fontSize: '25px' }}>Employee</span>{' '}
                            <span
                                className="d-inline-block fw-normal"
                                style={{
                                    fontSize: '12px',
                                    fontStyle: 'italic',
                                    marginTop: '-2px',
                                    color: '#025864',
                                }}
                            >
                                {' '}
                                Management
                            </span>{' '}
                        </span>
                    </span>
                </span>
                <span className="small-logo">
                    <span
                        className="d-inline-block"
                        style={{
                            border: '3px solid #025864',
                            borderRadius: '5px',
                            height: '50px',
                        }}
                    >
                        <img
                            height="50"
                            width="50"
                            src={logo}
                            alt="logo"
                            loading="lazy"
                            className=""
                        />
                    </span>
                </span>
            </div>

            <div
                id="left-menu"
                className={isSmallMenu ? 'small-left-menu' : ''}
            >
                <ul>
                    {menuData.map((item, index) => (
                        <li
                            key={index}
                            className={`has-sub ${
                                activeSubmenu === index ? 'rotate' : ''
                            }`}
                        >
                            {item.submenu ? (
                                <>
                                    <Link
                                        onClick={() => toggleSubmenu(index)}
                                        to="#"
                                        data-label={item.label}
                                        onMouseOver={(e) =>
                                            handleMouseOver(
                                                e,
                                                '',
                                                item.submenu,
                                                item.path
                                            )
                                        }
                                        onMouseOut={handleMouseOut}
                                        style={{ cursor: 'pointer' }}
                                        className={`${
                                            activeSubmenu === index
                                                ? 'active-link'
                                                : ''
                                        }`}
                                    >
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {item.img && (
                                                    <img
                                                        src={item.img}
                                                        alt={item.label}
                                                    />
                                                )}
                                                {item.icon && (
                                                    <i>{item.icon}</i>
                                                )}

                                                <span>{item.label}</span>
                                            </div>
                                            {activeSubmenu === index ? (
                                                <FaAngleDown className="angle-color" />
                                            ) : (
                                                <FaAngleRight className="angle-color" />
                                            )}
                                        </div>
                                    </Link>
                                    <ul
                                        className={`submenus ${
                                            activeSubmenu === index
                                                ? 'open'
                                                : ''
                                        }`}
                                    >
                                        {item.submenu.map(
                                            (subitem, subindex) => (
                                                <li key={subindex}>
                                                    <NavLink
                                                        to={subitem.path}
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? 'active-link-submenu submenu-items'
                                                                : 'submenu-items'
                                                        }
                                                    >
                                                        {subitem.label}
                                                    </NavLink>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    data-label={item.label}
                                    onMouseOver={(e) =>
                                        handleMouseOver(
                                            e,
                                            item.label,
                                            [],
                                            item.path
                                        )
                                    }
                                    onMouseOut={handleMouseOut}
                                    className={({ isActive }) =>
                                        isActive ? 'active-link' : ''
                                    }
                                    end
                                >
                                    {item.img && (
                                        <img src={item.img} alt={item.label} />
                                    )}
                                    {item.icon && <i>{item.icon}</i>}
                                    <span>{item.label}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div id="main-content">
                <div id="header" className="border-bottom">
                    <DashboardHeader
                        isSmallMenu={isSmallMenu}
                        toggleMenu={toggleMenu}
                    />
                </div>
                <div
                    id="page-container"
                    className={isSmallMenu ? 'small-left-menu' : ''}
                >
                    <Outlet />
                </div>
            </div>

            {showLabel.visible && (
                <div
                    id="show-label"
                    style={{ top: showLabel.top, left: showLabel.left }}
                    onMouseEnter={handleLabelMouseEnter}
                    onMouseLeave={handleLabelMouseLeave}
                >
                    {showLabel.text && (
                        <Link
                            className="text-decoration-none show-link"
                            to={showLabel.link}
                        >
                            {showLabel.text}
                        </Link>
                    )}

                    {console.log(showLabel)}

                    {showLabel.submenu.length > 0 && (
                        <ul>
                            {showLabel.submenu.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className="text-decoration-none"
                                        to={item.to}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
