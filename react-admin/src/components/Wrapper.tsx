import React from 'react';
import Nav from "./Nav";
import Menu from "./Menu";

const Wrapper = ({children}: any) => {
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

export default Wrapper;