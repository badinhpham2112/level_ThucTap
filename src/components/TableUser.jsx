import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/useService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash'
import ModalConfirm from './ModalConfirm';
import {debounce} from 'lodash'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import {  toast } from 'react-toastify';
import '../App.scss'



const TableUser = (props) => {
    const [listUsers, setListUser] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [total, setTotal] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [modalShowUserEdit, setModalShowUserEdit] = useState(false);
    const [modalShowUserDelete, setModalShowUserDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState('id');
    const [keyword, setKeyword] = useState('')
    const [dataCsv, setDataCsv] = useState('')
   
    useEffect(() => {
        getUsers(1)
      
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
      
      
        if(res)
        {
           setListUser(res.data)
           setTotalPage(res.total_pages)
           setTotal(res.total)
        }
        
    }
    const handlePageClick = (event) => {
        console.log('event: ', event)
        getUsers(event.selected + 1)

    }

    const handleUpdateUser = (user) => {
        setListUser([user, ...listUsers])

    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setModalShowUserEdit(true)

    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUser(cloneListUser)
      

    }

    const handleDeleteUser = (user) => {
        setDataUserDelete(user)
        setModalShowUserDelete(true)

    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);

        cloneListUser = cloneListUser.filter(item => item.id !== user.id);
        setListUser(cloneListUser)

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy); 
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser  = _.orderBy(cloneListUser , [sortField], [sortBy]);
        setListUser(cloneListUser)
    }
   
    const handleSearch = debounce((event) => {
        console.log('even', event.target.value)
        let term = event.target.value;
        if(term){
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser  = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser)

        }else{
            getUsers(1)
        }
    }, 300)

    const getUsersCsv = (event, done) => {
        let result = [];
        if(listUsers && listUsers.length > 0){
            result.push(["ID", "Email", "First Name", "Last Name"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataCsv(result)
            done();    
            }
    }
    const handleImportCSV = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            let file = event.target.files[0];
            if(file.type !== "text/csv"){
                toast.error('File không đúng định dạng CSV')
                return;
            }
            // Parse local CSV file
            Papa.parse(file, {
                // header: true,
                complete: function(results) {
                    let rawCSV = results.data;
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 3){
                            if(rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name"){
                                toast.error('File đầu vào header không đúng định dạng')
                                return;


                            }else{
                                let result = []
                                console.log(rawCSV)
                                rawCSV.map((item, index) => {
                                    if(index > 0 && item.length === 3){
                                        let obj = {}
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj)

                                    }
                                })
                                setListUser(result)
                               
                            }

                        }else{
                            toast.error('File đầu vào không đúng định dạng')
                        }

                    }else{
                        toast.error('không có file data csv đầu vào')
                    }
                    console.log("Finished:", results.data);
                }
            });
        }
        console.log(">>Check :", event.target.files[0])

    }


    return(
        <>
         <div className='my-3 d-sm-flex justify-content-between align-items-center'>
            <h3>List User</h3>
            <div className='d-flex gap-3'>
                <label htmlFor="import" className='btn btn-warning'><i className="fa-solid fa-file-import"></i> Import</label>
                <input 
                onChange={(event) => handleImportCSV(event)}
                type="file" id='import' hidden/>
                <CSVLink
                    data={dataCsv}
                    filename={"user.csv"}
                    className="btn btn-primary"
                    asyncOnClick={true}
                    onClick={getUsersCsv}
                 
                    >
                    <i className="fa-solid fa-file-export"></i> Export
                </CSVLink>
                <button className='btn btn-success' onClick={() => setModalShow(true)}>
                    <i className="fa-solid fa-plus"></i> Add new
                </button>

            </div>
          
         </div>
         <div className='col-12 col-sm-4 d-flex justify-content-center align-items-center py-3'>
             <input type="text"
             onChange={(event) => handleSearch(event)} 
             placeholder='Tìm kiếm theo email'
             className='form-control' />
          
         </div>
         <div style={{overflowX: 'scroll'}}>
         <Table striped bordered hover size="sm">
    <thead>
        <tr>
        <th>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <span>ID</span>
                <span className='d-flex'>
                    <i
                    onClick={() => handleSort("desc", "id")} 
                    className="fa-solid fa-arrow-down cursor-pointer" style={{cursor: 'pointer'}}></i>
                    <i
                    onClick={() => handleSort("asc", "id")}  
                    className="fa-solid fa-arrow-up cursor-pointer" style={{cursor: 'pointer'}}></i>
                </span>

            </div>
            
        </th>
        <th>Email</th>
        <th>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <span>First Name</span>
                <span className='d-flex'>
                <i
                    onClick={() => handleSort("desc", "first_name")} 
                    className="fa-solid fa-arrow-down cursor-pointer" style={{cursor: 'pointer'}}></i>
                    <i
                    onClick={() => handleSort("asc", "first_name")}  
                    className="fa-solid fa-arrow-up cursor-pointer" style={{cursor: 'pointer'}}></i>
                </span>

            </div>

        </th>
        <th>Last Name</th>
        <th>Action</th>
        
        </tr>
    </thead>
    <tbody>
        {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
            return(
                <tr key={`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td className='d-flex'>
                    <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
                </td>
                </tr>
            )

        })}
        
    </tbody>
        </Table>
         </div>
        
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
        />
            <ModalAddNew
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleUpdateUser={handleUpdateUser}/>

        <ModalEditUser
            show={modalShowUserEdit}
            onHide={() => setModalShowUserEdit(false)}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
            show={modalShowUserDelete}
            onHide={() => setModalShowUserDelete(false)}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal= {handleDeleteUserFromModal}/>

            </>
        
        )
}
export default TableUser;