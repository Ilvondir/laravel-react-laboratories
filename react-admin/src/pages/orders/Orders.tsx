import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import Paginator from "../../components/Paginator";
import axios from "axios";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";

const hide = {
    maxHeight: 0,
    transition: '600ms'
};

const show = {
    maxHeight: '150px',
    transition: '600ms'
};

const Orders = () => {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`/orders?page=${page}`);
                setOrders(response.data.data);
                setLastPage(response.data.meta.last_page);
            }
        )();
    }, [page]);

    const select = (id: number) => {
        if (selected === id) {
            setSelected(0);
            return;
        }
        setSelected(id);
    }

    const handleExport = async () => {
        const {data} = await axios.post('export', {}, {responseType: 'blob'});
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <button className="btn btn-sm btn-outline-secondary" onClick={handleExport}>Export</button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order: Order) => {
                        return (
                            <>
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <button className="btn btn-outline-secondary btn-sm"
                                                onClick={() => select(order.id)}
                                        >View
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="overflow-hidden" style={order.id === selected ? show : hide}>
                                            <table className="table table-sm">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product title</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.order_items.map((oi: OrderItem) => {
                                                    return (
                                                        <tr key={oi.id}>
                                                            <td>{oi.id}</td>
                                                            <td>{oi.product_title}</td>
                                                            <td>{oi.price}</td>
                                                            <td>{oi.quantity}</td>
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>

        </Wrapper>
    );
};

export default Orders;