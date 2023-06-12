import React from 'react'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';



export default function CustomInputField({ iden, formik, type = 'text', className, label, placeHolder, options, optionLabel, optionValue,value,onChange }) {

    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
    };
    return (
        <div className={`field ${className}`}>
            <label className='text-white' htmlFor="name1">{label || titleCase(iden)}</label>

            {
                type === 'dropdown' ?
                    <Dropdown  placeholder={placeHolder} id={iden} name={iden} options={options} optionLabel={optionLabel} optionValue={optionValue} value={formik.values[iden]} onChange={formik.handleChange} className={classNames('customInput',{ 'p-invalid': isFormFieldValid({ iden }) })} />

                    :type==='multiSelect'?
                    <MultiSelect  placeholder={placeHolder} id={iden} name={iden} options={options} optionLabel={optionLabel} optionValue={optionValue} value={formik.values[iden]} onChange={formik.handleChange} className={classNames('customInput',{ 'p-invalid': isFormFieldValid({ iden }) })} />

                    :
                    (type === 'textArea'||type==='textarea') ?
                        <InputTextarea id={iden} name={iden} value={formik.values[iden]} onChange={formik.handleChange} type="text" placeholder={placeHolder} className={classNames('customInput',{ 'p-invalid': isFormFieldValid({ iden }) })} />

                        :
                        <InputText autoComplete='off' autoSave='off' id={iden} name={iden} value={formik.values[iden]} onChange={formik.handleChange} type={type} placeholder={placeHolder} className={classNames('customInput',{ 'p-invalid': isFormFieldValid({ iden }) })} />

            }
            {getFormErrorMessage(iden)}
        </div>)
}





{/* <div className="field">
<label htmlFor="name1">Action</label>
<Dropdown placeholder='Select action' id="status" name='status' options={statusList} optionLabel='name' optionValue='value' value={formik.values.status} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('status') })} />
{getFormErrorMessage('status')}

</div>
<div className="field">
<label htmlFor="comment">Comment</label>
<InputTextarea id="comment" name='comment' value={formik.values.comment} onChange={formik.handleChange} type="text" className={classNames({ 'p-invalid': isFormFieldValid('comment') })} />
{getFormErrorMessage('comment')}

</div> */}