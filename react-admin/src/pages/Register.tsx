import React, {Component, SyntheticEvent} from 'react';
import '../Login.css';
import axios from 'axios';

class Register extends Component {
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';

    submit = async (e:SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.post("http://localhost:8000/api/register", {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
        });

        console.log(response.data);
    }


    render() {
        return (
            <main className="form-signin">
                <form onSubmit={this.submit}>
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>

                        <input className="form-control" placeholder="First name" required
                            onChange={e => this.first_name = e.target.value}
                        />

                        <input className="form-control" placeholder="Last name" required
                            onChange={e => this.last_name = e.target.value}
                        />

                        <input type="email" className="form-control" placeholder="Email" required
                            onChange={e => this.email = e.target.value}
                        />

                        <input type="password" className="form-control" placeholder="Password" required
                            onChange={e => this.password = e.target.value}
                        />

                        <input type="password" className="form-control" placeholder="Password confirm" required
                            onChange={e => this.password_confirm = e.target.value}
                        />

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        );
    }
}

export default Register;