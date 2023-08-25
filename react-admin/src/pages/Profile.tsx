import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import axios from "axios";

const Profile = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('user');
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setEmail(response.data.email);
            }
        )();
    }, []);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('user/info', {
            first_name,
            last_name,
            email
        })
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('user/password', {
            password,
            password_confirm: confirm
        })
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

export default Profile;