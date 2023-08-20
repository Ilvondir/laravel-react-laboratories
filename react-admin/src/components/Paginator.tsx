import React from 'react';

const Paginator = (props: { page: number, lastPage: number, pageChanged: (page: number) => void }) => {

    const next = () => {
        if (props.page < props.lastPage) props.pageChanged(props.page + 1);
    }

    const previous = () => {
        if (props.page > 1) props.pageChanged(props.page - 1);
    }


    return (
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
    );
};

export default Paginator;