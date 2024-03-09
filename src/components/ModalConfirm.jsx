import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/useService';
import {  toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const {dataUserDelete, handleDeleteUserFromModal} = props;

    const handleDeleteUser = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if(res && +res.statusCode === 204){
            toast.success('Delete user Success!')
            props.onHide()
            handleDeleteUserFromModal(dataUserDelete)
            
        }else{
            toast.error('error delete user')
        }
        console.log('>>check delete: ', res)


    }
    
   
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='text-uppercase'>
               Delete a user
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3 mt-3">
                Bạn có chắc là muốn xóa <b>email: {dataUserDelete.email}</b> này chứ? 
               
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} className='btn btn-dark'>Close</Button>
            <Button onClick={() => handleDeleteUser()} className='btn btn-success'>ConfirmDelete</Button>
          </Modal.Footer>
        </Modal>
      );

}

export default ModalConfirm