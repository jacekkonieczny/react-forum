import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [isCategoriesOpen, setCategoriesOpen] = useState<boolean>(false);
    const [isProfileOpen, setProfileOpen] = useState<boolean>(true);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(true);
    const categories: string[] = ["Technology", "Science", "Gaming", "Movies", "Music", "Pets"];

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link className="navbar__logo-link" to="/">React-Forum</Link>
            </div>
            <div className="navbar__center">
                <div className="navbar__categories" onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
                    <div className="navbar__categories-button dropdown-button">
                        {isCategoriesOpen ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
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
            </div>
            <div className="navbar__auth">
                {isLoggedIn ? (
                    <div className="navbar__profile" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
                        <div className="navbar__profile-button dropdown-button">
                            <img
                                className="navbar__profile-photo"
                                src="https://cdn.pfps.gg/pfps/1907-cat.png"
                                alt="profile picture"
                            />
                            {isProfileOpen ? (
                                <FontAwesomeIcon icon={faChevronUp} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronDown} />
                            )}
                        </div>
                        {isProfileOpen && (
                            <div className="navbar__profile-menu dropdown-menu">
                                <Link className="navbar__profile-menu-item dropdown-item" to="/user/31">Profile</Link>
                                <Link className="navbar__profile-menu-item dropdown-item" to="/notifications">Notifications</Link>
                                <div className="navbar__profile-menu-item dropdown-item">Log out</div>
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
        </nav>
    );
};

export default Navbar;