import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChevronDown,
    faChevronUp,
    faEnvelope,
    faFilter,
    faHouse, faPlus, faRightFromBracket,
    faUser, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const [isCategoriesOpen, setCategoriesOpen] = useState<boolean>(false);
    const [isProfileOpen, setProfileOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const categories: string[] = ["Technology", "Science", "Gaming", "Movies", "Music", "Pets"];
    const {user, logout} = useContext(AuthContext);
    const isLoggedIn = !!user;

    return (
        <nav className="navbar">
            <div className="navbar__desktop">
                <div className="navbar__logo">
                    <Link className="navbar__logo-link" to="/">React-Forum</Link>
                </div>
                <div className="navbar__center">
                    <div className="navbar__categories" onMouseEnter={() => setCategoriesOpen(true)}
                         onMouseLeave={() => setCategoriesOpen(false)}>
                        <div className="navbar__categories-button dropdown-button">
                            {isCategoriesOpen ? (
                                <FontAwesomeIcon icon={faChevronUp}/>
                            ) : (
                                <FontAwesomeIcon icon={faChevronDown}/>
                            )}
                            Categories
                        </div>
                        {isCategoriesOpen && (
                            <div className="navbar__categories-menu dropdown-menu">
                                <Link className="navbar__categories-menu-item dropdown-item" to="/categories">All</Link>
                                {categories.map((category, index) => (
                                    <Link className="navbar__categories-menu-item dropdown-item" key={index}
                                          to={`/category/${category.toLowerCase()}`}>{category}</Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <input type="text" className="navbar__search" placeholder="Search"/>
                    {isLoggedIn && (
                        <Link className="navbar__new-thread-link" to="/new-thread">
                            <FontAwesomeIcon icon={faPlus} size="lg" />
                            <span>New Thread</span>
                        </Link>
                    )}
                </div>
                <div className="navbar__auth">
                    {isLoggedIn ? (
                        <div className="navbar__profile" onMouseEnter={() => setProfileOpen(true)}
                             onMouseLeave={() => setProfileOpen(false)}>
                            <div className="navbar__profile-button dropdown-button">
                                <img
                                    className="navbar__profile-photo"
                                    src="https://cdn.pfps.gg/pfps/1907-cat.png"
                                    alt="profile picture"
                                />
                                {isProfileOpen ? (
                                    <FontAwesomeIcon icon={faChevronUp}/>
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                )}
                            </div>
                            {isProfileOpen && (
                                <div className="navbar__profile-menu dropdown-menu">
                                    <Link className="navbar__profile-menu-item dropdown-item"
                                          to={`/user/${user?.id}`}>Profile</Link>
                                    <Link className="navbar__profile-menu-item dropdown-item"
                                          to="/notifications">Notifications</Link>
                                    <div className="navbar__profile-menu-item dropdown-item" onClick={logout}>Log out</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="navbar__auth-links">
                            <Link className="navbar__auth-links-item" to="/login">Login</Link>
                            <Link className="navbar__auth-links-item" to="/register">Register</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="navbar__mobile">
                {!isMobileMenuOpen ? (
                    <div className="navbar__hamburger" onClick={() => setMobileMenuOpen(true)}>
                        <FontAwesomeIcon icon={faBars} size="2xl" />
                    </div>
                ) : (
                    <div className="navbar__mobile-menu">
                        <div className="navbar__mobile-menu-row">
                            <Link className="navbar__mobile-menu-item" to="/">
                                <FontAwesomeIcon icon={faHouse} size="lg" />
                                <span>Home</span>
                            </Link>
                            <Link className="navbar__mobile-menu-item" to="/categories">
                                <FontAwesomeIcon icon={faFilter} size="lg" />
                                <span>Categories</span>
                            </Link>
                            <Link className="navbar__mobile-menu-item" to={`/user/${user?.id}`}>
                                <FontAwesomeIcon icon={faUser} size="lg" />
                                <span>Profile</span>
                            </Link>
                        </div>
                        <div className="navbar__mobile-menu-row">
                            <Link className="navbar__mobile-menu-item" to="/notifications">
                                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                <span>Notifications</span>
                            </Link>
                            <div className="navbar__mobile-menu-item" onClick={logout}>
                                <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                                <span>Log out</span>
                            </div>
                            <Link className="navbar__mobile-menu-item" to="/new-thread">
                                <FontAwesomeIcon icon={faPlus} size="lg" />
                                <span>New Thread</span>
                            </Link>
                        </div>
                        <div className="navbar__mobile-menu-row">
                            <div className="navbar__mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                                <FontAwesomeIcon icon={faXmark} size="xl"/>
                                <span>Exit</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;