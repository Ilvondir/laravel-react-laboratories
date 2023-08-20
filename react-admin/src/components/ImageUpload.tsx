import React from 'react';
import axios from "axios";

const ImageUpload = (props: { uploaded: (url: string) => void }) => {

    const upload = async (files: FileList | null) => {
        if (files === null) return;
        const formData = new FormData();
        formData.append("image", files[0]);
        const response = await axios.post('/upload', formData);
        props.uploaded(response.data.url);
    }

    return (
        <label className="btn btn-secondary">
            Upload <input type="file" hidden onChange={e => upload(e.target.files)}/>
        </label>
    );
};

export default ImageUpload;