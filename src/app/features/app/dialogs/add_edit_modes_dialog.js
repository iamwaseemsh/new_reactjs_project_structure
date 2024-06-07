import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import httpClient, { requestType } from '../../../services/http_client';
import toastService from '../../../services/toast_service';
import CustomInputField from '../../../components/custom_input_field';

export default function AddEditMoodDialog({ editData, onHide ,callback}) {
    
    const [loading, setLoading] = useState(false);

    const editMood = async () => {
        try {
            let response = await httpClient({
                "method": requestType.put,
                "url": "mood"
            });
            toastService.success("Mood title updated!")


        } catch (e) {
            toastService.error(e);
        }

    }
    const addMood = async (body) => {
        setLoading(true)
        try {
            let response = await httpClient({
                "method": requestType.post,
                "url": "mood",
                "body": body
                
            });
            toastService.success("New mood added!")
            callback();

        } catch (e) {
            setLoading(false)
            toastService.error(e.toString());
        }
    }









    const validationSchema = Yup.object().shape({
        mood: Yup.string().required("Mood name is required.")


    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {

            "mood": "",




        },

        onSubmit: async (data) => {
            console.log(data);

            if (editData == null) {
                addMood(data);
                // dispatch(addCompany(data));

            } else {
                editMood();
                // data['userId']=editUser._id;
                // dispatch(editCompany(data));

            }

        },
    });

    useEffect(() => {
console.log(editData);
        if (editData != null) {

            formik.setFieldValue("mood", editData.mood);
    
        }
    }, []);



 

    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="col-12 md:col-6\8">
                        <div className=" p-fluid">
                            <CustomInputField type='text' placeHolder="Mode" iden='mood' formik={formik} />

                            <Button loading={loading} type='submit' label='Submit' className='p-button-success' />

                        </div>
                    </div>

                </form>
            </div>
        </>
    )

}
