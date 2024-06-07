import React, { useEffect, useState } from 'react'
import httpClient, { requestType } from '../../../services/http_client';
import toastService from '../../../services/toast_service';
import PageHeader from '../../../components/app_header';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { primeIcons } from '../../../constants/prime_icons';
import AddEditMoodDialog from '../dialogs/add_edit_modes_dialog';
import { showDeleteConfirmDialog } from '../../../components/confirm_dialog';
import { confirmDialog } from 'primereact/confirmdialog';


export default function ModesScreen() {
    //To show main loading
    const [loading, setLoding] = useState(false);
    //to store api response data
    const [modes,setModes] = useState([]);

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



    const getModes =async () => {
        try{
          setLoding(true)
            let response = await httpClient({
                "method": requestType.get,
                "url": "mood"
            });
            setModes(response.data);
            setLoding(false)
        }catch(e){
          setLoding(false)
            toastService.error(e.toString());
        }

    }
    var showConfirmDel=()=>{
      confirmDialog({
        message: 'Do you want to delete?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept:()=>{},
        reject:()=>{},
    });
    }
    useEffect(() => {
        getModes();
    }, [])
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon={primeIcons['pi-pencil']} className="p-button-rounded p-button-success mr-2" onClick={()=>{
                     setEditData(rowData);
                 
                     onClick('showDialog')
                }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning  mr-2" onClick={() => {
                  
            
                 showDeleteConfirmDialog({
                  onConfirm:()=>{

                  },
                  onCancel:()=>{

                  }
                 })
                }} />
             
            </React.Fragment>
        );
    }

    return (
       <div className='card'>
          <PageHeader 
            buttonTitle={"Add mood"} 
            onClick={onClick} 
            onHide={onHide} 
            showDialog={showDialog} 
            dialogHeader={"Mood"} 
            title={"Mood"} 
            dialogHook={"showDialog"} 
            buttonOnClick={() => {
                setEditData(null);
            }
            
            
            }>
                <AddEditMoodDialog
                editData={editData}
                callback={()=>{
                onHide();
                getModes();
                }} />
            </PageHeader>

    <DataTable value={modes} paginator className="p-datatable-gridlines" showGridlines rows={10}
        dataKey="id" filterDisplay="menu" loading={loading} responsiveLayout="scroll"
        emptyMessage="No data found.">
                    <Column field="mood" header="Mood" style={{ minWidth: '12rem' }} />

        <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />

    </DataTable>
</div>
    )
}
