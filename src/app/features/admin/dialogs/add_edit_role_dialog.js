import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import httpClient, { requestType } from '../../../services/http_client';
import toastService from '../../../services/toast_service';
import CustomInputField from '../../../components/custom_input_field';

export default function AddEditRoleDialog({ editData, onHide }) {
    const fullMenuPages = [
        {
            "label": "Home",
            "children": [
                {
                    "label": "Home",
                    "route": "/",
                    "icon": "pi pi-fw pi-home"
                }
            ]
        },
        {
            "label": "Manage",
            "children": [
                {
                    "label": "Panel Users",
                    "route": "/admin/users",
                    "icon": "pi pi-fw pi-users",
                    "create": true,
                    "view": true,
                    "delete": true,
                    "update": true
                },
                {
                    "label": "Roles & Permissions",
                    "route": "/admin/users/roles",
                    "icon": "pi pi-fw pi-user-edit",
                    "create": true,
                    "view": true,
                    "delete": true,
                    "update": true
                }
            ]
        },
        {
            "label": "App",
            "children": [
                {
                    "label": "Users",
                    "route": "/app/users",
                    "icon": "pi pi-fw pi-users",
                    "create": true,
                    "view": true,
                    "delete": true,
                    "update": true
                },
                {
                    "label": "Modes",
                    "route": "/app/modes",
                    "icon": "pi pi-fw pi-heart",
                    "create": true,
                    "view": true,
                    "delete": true,
                    "update": true
                },
                {
                    "label": "Posts",
                    "route": "/app/posts",
                    "icon": "pi pi-fw pi-play-circle",
                    "create": true,
                    "view": true,
                    "delete": true,
                    "update": true
                }
            ]
        }
    ];
    const [loading, setLoading] = useState(false);

    const editRole = async () => {
        try {
            let response = await httpClient({
                "method": requestType.put,
                "url": "role"
            });
            toastService.success("Role updated!")


        } catch (e) {
            toastService.error(e);
        }

    }
    const addRole = async () => {
        try {
            let response = await httpClient({
                "method": requestType.post,
                "url": "role"
            });
            toastService.success("New role added!")

        } catch (e) {
            toastService.error(e);
        }
    }









    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required.")


    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {

            "role": "",
            "description": "",




        },

        onSubmit: async (data) => {
            console.log(data);

            if (editData == null) {
                addRole();
                // dispatch(addCompany(data));

            } else {
                editRole();
                // data['userId']=editUser._id;
                // dispatch(editCompany(data));

            }

        },
    });

    useEffect(() => {
        console.log(editData);
        if (editData != null) {
            formik.setFieldValue("role", editData.role.role);
            formik.setFieldValue("description", editData.role.description);
        }
    }, []);



    const displayMenuPages = () => {
        return <div>
            {
                fullMenuPages.map((item,index)=>{
                    if(index == 0){


                    }else{

                    }
                    

                })
            }

        </div>
    }

    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="col-12 md:col-6\8">
                        <div className=" p-fluid">
                            <CustomInputField type='text' placeHolder="Name" iden='role' formik={formik} />
                            <CustomInputField type='text' placeHolder="Description" iden='description' formik={formik} />

                            <Button loading={loading} type='submit' label='Submit' className='p-button-success' />

                        </div>
                    </div>

                </form>
            </div>
        </>
    )

}
