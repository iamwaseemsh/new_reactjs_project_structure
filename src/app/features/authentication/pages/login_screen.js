import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../manager/auth_slice';
import appAssets from '../../../constants/appAssets';
import CustomInputField from '../../../components/custom_input_field';
import toastService from '../../../services/toast_service';

export default function LoginScreen() {

  //redux
  const { success = false, error = null, loading = false } = useSelector((state) => state.auth || {});

  //hooks


  useEffect(() => {
    if (success !== undefined) {
      if (success === false) {
        toast.error(error)

      } else {

      }
    }
  }, [success]);

  const dispatch = useDispatch();

  //forms
  const validationSchema = Yup.object().shape({

    password: Yup.string().required("Password is required.").min(5, 'Minimum length should be 5'),
    email: Yup.string().required("Email is required."),

  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {

      dispatch(loginUser(data));

      console.log(data);

    },
  });





  return (
    <>
      <div className='background-wrapper-class'>

        <div className='form-wrapper py-5'>
        
          <h2 className='auth-heading text-center'>WELCOME</h2>
          <form style={{ width: '100%' }} className='grid p-fluid justify-content-center align-items-center' onSubmit={formik.handleSubmit}>



            <div className=' col-12 md:col-4'>


              <CustomInputField iden='email' formik={formik} placeHolder='Enter email' type='email' />
              <CustomInputField iden='password' formik={formik} placeHolder='Enter password' type='password' />


              <Button loading={loading} type='submit' className='customButton' label='NEXT' />
            </div>






          </form>

        </div>






      </div>


    </>
  )
}
