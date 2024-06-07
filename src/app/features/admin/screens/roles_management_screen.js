import React, { useEffect, useState } from 'react'
import httpClient, { requestType } from '../../../services/http_client';
import toastService from '../../../services/toast_service';
import PageHeader from '../../../components/app_header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { primeIcons } from '../../../constants/prime_icons';
import AddEditRoleDialog from '../dialogs/add_edit_role_dialog';


export default function RolesManagmentScreen() {
    //To show main loading
    const [loading, setLoding] = useState(false);
    //to store api response data
    const [roles,setRoles] = useState([]);

    // To pass editable data to the EditDialog
    const [editData, setEditData] = useState(null);
    const [showDialog,setShowDialog] = useState(false);
    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const dialogFuncMap = {
        'showDialog': setShowDialog,

    }



    const getRoles =async () => {
        try{
            let response = await httpClient({
                "method": requestType.get,
                "url": "role"
            });
            setRoles(response.data);

        }catch(e){
            toastService.error(e);
        }

    }
    useEffect(() => {
        getRoles();
    }, [])
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon={primeIcons['pi-pencil']} className="p-button-rounded p-button-success mr-2" onClick={()=>{
                    //  setEditData(rowData);
                 
                    //  onClick("showAddSpecializationDialog")
                }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning  mr-2" onClick={() => {
                //    deleteId = rowData._id;
                //    deleteConfirmation();
                }} />
             
            </React.Fragment>
        );
    }

    return (
       <div className='card'>
          <PageHeader buttonTitle={"Add Role"} onClick={onClick} onHide={onHide} showDialog={showDialog} dialogHeader={"Role"} title={"Role"} dialogHook={"showDialog"} buttonOnClick={() => {
                setEditData(null);
            }}>
                <AddEditRoleDialog/>
            </PageHeader>

    <DataTable value={roles} paginator className="p-datatable-gridlines" showGridlines rows={10}
        dataKey="id" filterDisplay="menu" loading={loading} responsiveLayout="scroll"
        emptyMessage="No data found.">
                    <Column field="role" header="Role" style={{ minWidth: '12rem' }} />

        <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />

    </DataTable>
</div>
    )
}
