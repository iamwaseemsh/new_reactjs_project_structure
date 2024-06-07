import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react'

export default function PageHeader({title, buttonTitle, buttonOnClick, dialogHeader, dialogHook,children, showDialog, onClick , onHide, showButton=true }) {
  console.log("showButton: ", showButton);
  return (
    <div>
        <Dialog header={dialogHeader} visible={showDialog} onHide={() => onHide(dialogHook)}  breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '70vw' }}>
       
                {children}
            </Dialog>


            <div className='flex flex-row justify-content-between align-content-center align-items-center pb-3'>
                    <h5>{title}</h5>
                  {showButton &&  <Button label={buttonTitle} className='p-button-success p-button-rounded p-button-sm' onClick={() =>{
                           buttonOnClick();
                        onClick(dialogHook)}} />}


                </div>
    </div>
  )
}
