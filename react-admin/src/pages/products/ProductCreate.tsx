import React, {SyntheticEvent, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Navigate} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('products', {
            title,
            description,
            price,
            image
        })
        setRedirect(true);
    }

    if (redirect) {
        return (
            <Navigate to={'/products'}/>
        );
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control"
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                              onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input type="text" className="form-control"
                               value={image}
                               onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" step="0.01" min="0" className="form-control"
                           onChange={e => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductCreate;