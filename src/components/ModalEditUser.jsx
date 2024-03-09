import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpDateUser } from '../services/useService';
import {  toast } from 'react-toastify';
const ModalEditUser = (props) => {
    const {dataUserEdit, handleEditUserFromModal} = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")



    useEffect(() => {
        if(props?.onHide){
            setName(dataUserEdit.first_name)
        }

    }, [dataUserEdit])
    const handleEditUser = async () => {
        let res = await putUpDateUser(name, job)
         console.log('>>>check res update: ', res)
         if(res && res.updatedAt){
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
           props.onHide()
            toast.success('update user sucess')


         }
    }
    
    // console.log('>>check props', dataUserEdit)
   
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
               Edit a user
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3 mt-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" 
                value={name}
                onChange={((event) => setName(event.target.value))}
                placeholder="Enter name" />
            </div>
            <div className="mb-3">
                <label className="form-label">Job:</label>
                <input type="text" className="form-control" 
                 value={job}
                 onChange={((event) => setJob(event.target.value))}
               />
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} className='btn btn-dark'>Close</Button>
            <Button onClick={() => handleEditUser()} className='btn btn-success'>Confirm</Button>
          </Modal.Footer>
        </Modal>
      );

}

export default ModalEditUser