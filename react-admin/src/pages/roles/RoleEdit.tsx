import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import axios from "axios";
import {Permission} from "../../models/permission";
import {Simulate} from "react-dom/test-utils";
import {Navigate, useParams} from "react-router-dom";
import {Role} from "../../models/role";

const RoleEdit = () => {
    const [permissions, setPermissions] = useState([]);
    const [name, setName] = useState("");
    const [selected, setSelected] = useState([] as number[]);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get("permissions");
                setPermissions(response.data);

                const {data} = await axios.get(`roles/${id}`);
                setName(data.name);
                setSelected(data.permissions.map((p: Permission) => p.id));
            }
        )()
    }, []);

    const check = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`roles/${id}`, {
            name: name,
            permissions: selected
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={"/roles"}></Navigate>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               onChange={e => setName(e.target.value)}
                               defaultValue={name}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">

                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                           value={p.id}
                                           id={p.name}
                                           onChange={() => check(p.id)}
                                           checked={selected.some(s => s === p.id)}
                                    />
                                    <label htmlFor={p.name} className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}

                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default RoleEdit;