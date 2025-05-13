import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

interface User {
    id: number;
    username: string;
    email: string;
    role_id: number;
    created_at: string;
}

interface Role {
    id: number;
    name: string;
}

interface PaginationData {
    currentPage: number;
    totalUsers: number;
    totalPages: number;
}

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalUsers: 0,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchRoles = async () => {
            if (!token) {
                setError("musisz byc administratorem aby korzystac z panelu");
                return;
            }
            try {
                const response = await axios.get("http://localhost:7777/admin/roles", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRoles(response.data);
            } catch (err) {
                console.error("blad podczas pobierania rol", err);
            }
        };
        fetchRoles();
    }, []);

    const fetchUsers = async (page: number = 1, query: string = '') => {
        setLoading(true);
        if (!token) {
            setError("musisz byc administratorem aby korzystac z panelu");
            setLoading(false);
            return;
        }
        try {
            const endpoint = query
                ? `http://localhost:7777/admin/users/search?query=${query}&page=${page}&limit=10`
                : `http://localhost:7777/admin/users?page=${page}&limit=10`;

            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data.data);
            setPagination({
                currentPage: response.data.currentPage,
                totalUsers: response.data.totalUsers,
                totalPages: response.data.totalPages
            });
        } catch (err) {
            setError("blad podczas pobierania uzytkownikow");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pagination.currentPage, searchQuery);
    }, [pagination.currentPage]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        fetchUsers(1, query);
    };

    const handleRoleChange = async (userId: number, newRoleId: number) => {
        if (!token) {
            alert("musisz byc administratorem aby korzystac z panelu");
            return;
        }
        try {
            await axios.put(
                `http://localhost:7777/admin/users/${userId}/role`,
                { roleId: newRoleId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchUsers(pagination.currentPage, searchQuery);
        } catch (err) {
            setError("blad podczas zmiany roli uzytkownika");
            console.error(err);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!token) {
            alert("musisz byc administratorem aby korzystac z panelu");
            return;
        }
        if (window.confirm("czy na pewno chcesz usunac tego uzytkownika?")) {
            try {
                await axios.delete(`http://localhost:7777/admin/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                fetchUsers(pagination.currentPage, searchQuery);
            } catch (err) {
                setError("blad podczas usuwania uzytkownika");
                console.error(err);
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, currentPage: newPage }));
        }
    };

    return (
        <div className="admin">
            <h1 className="admin__title">Panel Administratora</h1>
            <input
                className="admin__search-input"
                type="text"
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
            {error && <div className="admin__error">{error}</div>}

            {loading ? (
                <div className="admin__loader">Loading...</div>
            ) : (
                <>
                    <table className="admin__table">
                        <thead className="admin__table-head">
                        <tr className="admin__table-row">
                            <th className="admin__table-header">ID</th>
                            <th className="admin__table-header">Username</th>
                            <th className="admin__table-header">Email</th>
                            <th className="admin__table-header">Role</th>
                            <th className="admin__table-header">Created at</th>
                            <th className="admin__table-header">Delete</th>
                        </tr>
                        </thead>
                        <tbody className="admin__table-body">
                        {users.map(user => (
                            <tr key={user.id} className="admin__table-row">
                                <td className="admin__table-cell">{user.id}</td>
                                <td className="admin__table-cell">{user.username}</td>
                                <td className="admin__table-cell">{user.email}</td>
                                <td className="admin__table-cell">
                                    <select
                                        className="admin__table-select"
                                        value={user.role_id}
                                        onChange={(e) => handleRoleChange(
                                            user.id,
                                            parseInt(e.target.value)
                                        )}
                                    >
                                        {roles.map(role => (
                                            <option
                                                key={role.id}
                                                value={role.id}
                                                className="admin__table-select-option"
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="admin__table-cell">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className="admin__table-cell">
                                    <button
                                        className="admin__table-button"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="admin__pagination">
                        <button
                            className="admin__pagination-button"
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                        >
                            Prev
                        </button>
                        <span className="admin__pagination-info">
                            Page
                            <input
                                className="admin__pagination-info-input"
                                value={pagination.currentPage}
                                onChange={(e) => handlePageChange(parseInt(e.target.value))}
                                type="number"
                                min="1"
                                max={pagination.totalPages}
                            />
                            of {pagination.totalPages}
                        </span>
                        <button
                            className="admin__pagination-button"
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;