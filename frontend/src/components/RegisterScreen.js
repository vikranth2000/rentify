import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(firstName, lastName, email, phoneNumber, password, role));
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <div>
                Have an Account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default RegisterScreen;