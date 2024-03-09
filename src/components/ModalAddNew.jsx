import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/useService';
import {  toast } from 'react-toastify';
const ModalAddNew = (props) => {
    const {handleUpdateUser} = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const handleSaveUser = async() => {
        let res = await postCreateUser(name, job)
        if(res && res.id){
            props.onHide();
            setName('')
            setJob('')
            toast.success('New user created successfully')
            handleUpdateUser({first_name: name, id: res.id})
            //success
        }else{
            //error
            toast.error('User creation failed')
        }
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
              add new user
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
                placeholder="Enter Job"/>
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button onClick={() => handleSaveUser()}>save</Button>
          </Modal.Footer>
        </Modal>
      );

}

export default ModalAddNew