import axios from "axios";
import React, {Dispatch, useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {User} from "../models/user";
import {connect} from 'react-redux';
import {setUser} from "../redux/actions/setUserAction";

const Nav = (props: any) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get('user');
                    props.setUser(new User(
                        response.data.id,
                        response.data.first_name,
                        response.data.last_name,
                        response.data.email,
                        response.data.role
                    ));

                } catch (e) {
                    setRedirect(true);
                }
            }
        )()
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }

    if (redirect) {
        return (
            <Navigate to={'/login'}/>
        )
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/profile"
                      className="p-2 text-white text-decoration-none">{props.user.first_name} {props.user.last_name}</Link>
                <Link to="/login" className="p-2 text-white text-decoration-none" onClick={logout}>Sign out</Link>
            </ul>
        </nav>
    );
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);