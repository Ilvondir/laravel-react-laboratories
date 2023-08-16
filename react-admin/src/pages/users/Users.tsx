import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import {User} from "../../models/user";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`users?page=${page}`);
                setUsers(response.data.data);
                setLastPage(response.data.meta.last_page);
            }
        )()
    }, [page]);

    const next = () => {
        if (page < lastPage) setPage(page + 1);
    }

    const previous = () => {
        if (page > 1) setPage(page - 1);
    }

    const del = async (id: number) => {
        if (window.confirm("Are you sure you want delete this record?")) {
            await axios.delete(`users/${id}`);

            setUsers(users.filter((u: User) => u.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {users.map((user: User) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <button className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => del(user.id)}>Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    )}

                    </tbody>
                </table>
            </div>

            <nav className='d-flex justify-content-center align-items-center'>
                <ul className="pagination">
                    <li className='page-item'>
                        <a className='page-link' onClick={previous}>Previous</a>
                    </li>
                    <li className='page-item'>
                        <a className='page-link' onClick={next}>Next</a>
                    </li>
                </ul>
            </nav>

        </Wrapper>
    );
}

export default Users;