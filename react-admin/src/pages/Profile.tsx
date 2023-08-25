import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import axios from "axios";
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";

const Profile = (props: { user: User, setUser: (user: User) => void }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
    }, [props.user]);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.put('users/info', {
            first_name,
            last_name,
            email
        });

        props.setUser(new User(
            response.data.id,
            response.data.first_name,
            response.data.last_name,
            response.data.email,
            response.data.role
        ));
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('users/password', {
            password,
            password_confirm: confirm
        });


    }


    return (
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        defaultValue={first_name}
                        className='form-control'
                        onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        defaultValue={last_name}
                        onChange={e => setLastName(e.target.value)}
                        className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)}
                        className='form-control'/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>


            <h3>Change password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password"
                           onChange={e => setPassword(e.target.value)}
                           className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Confirm password</label>
                    <input type="password"
                           onChange={e => setConfirm(e.target.value)}
                           className='form-control'/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default connect(
    (state: { user: User }) => {
        return {
            user: state.user
        };
    }, (dispatch: Dispatch<any>) => {
        return {
            setUser: (user: User) => dispatch(setUser(user))
        }
    }
)(Profile);