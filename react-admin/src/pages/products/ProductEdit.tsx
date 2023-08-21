import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductEdit = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`products/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setImage(response.data.image);
                setPrice(response.data.price);
            }
        )()
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`products/${id}`, {
            title,
            description,
            price,
            image
        })
        setRedirect(true);
    }

    const updateImage = (url: string) => {
        if (ref.current) {
            ref.current.value = url;
        }
        setImage(url);
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
                           defaultValue={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input type="text" className="form-control"
                               defaultValue={image}
                               ref={ref}
                               onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={updateImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" step="0.01" min="0" className="form-control"
                           value={price}
                           onChange={e => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductEdit;