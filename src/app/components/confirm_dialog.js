import { confirmDialog } from "primereact/confirmdialog";

export const showDeleteConfirmDialog=({onConfirm,onCancel})=>{
   return confirmDialog({
        message: 'Do you want to delete?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept:onConfirm,
        reject:onCancel
    });
}