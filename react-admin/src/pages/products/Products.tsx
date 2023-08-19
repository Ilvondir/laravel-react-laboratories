import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import axios from "axios";
import {Product} from '../../models/product';
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`products?page=${page}`);
                setProducts(response.data.data);
                setLastPage(response.data.meta.last_page);
            }
        )()
    }, [page]);

    const del = async (id: number) => {
        if (window.confirm("Are you sure you want delete this item?")) {
            await axios.delete(`products/${id}`);
            setProducts(products.filter((p: Product) => p.id !== id));
        }
    }

    const next = () => {
        if (page < lastPage) setPage(page + 1);
    }

    const previous = () => {
        if (page > 1) setPage(page - 1);
    }


    return (
        <Wrapper>


            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product: Product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.image} width="50"/></td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/products/${product.id}/edit`}
                                              className="btn btn-outline-secondary btn-sm">
                                            Edit
                                        </Link>

                                        <button className="btn btn-outline-secondary btn-sm"
                                                onClick={() => del(product.id)}>Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

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
};

export default Products;