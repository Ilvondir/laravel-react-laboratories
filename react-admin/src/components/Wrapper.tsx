import React, {Component} from 'react';
import Nav from "./Nav";
import Menu from "./Menu";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";


class Wrapper extends Component<{ children: any }> {
    render() {
        let {children} = this.props;
        return (
            <>
                <Nav/>

                <div className="container-fluid">
                    <div className="row">

                        <Menu/>

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                            {children}

                        </main>
                    </div>
                </div>
            </>
        )
    }
}

export default Wrapper;