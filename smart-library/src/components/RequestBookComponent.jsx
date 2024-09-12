import React, { useState } from 'react'
import style from './RequestBookComponent.module.css'
import DataTable from 'react-data-table-component';

const RequestBookComponent = () => {

  // Sample Data
const data = [
  {  name: 'The Matrix', branch: 'naic', no: '1', status: 'pending' },
  {  name: 'The Matrix', branch: 'tanza', no: '2', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '5', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '9', status: 'pending' },
  {  name: 'The Matrix', branch: 'naic', no: '1', status: 'pending' },
  {  name: 'The Matrix', branch: 'tanza', no: '2', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '5', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '9', status: 'pending' },
  {  name: 'The Matrix', branch: 'naic', no: '1', status: 'pending' },
  {  name: 'The Matrix', branch: 'tanza', no: '2', status: 'pending' },
  {  name: 'The Matrix', branch: 'naic', no: '1', status: 'pending' },
  {  name: 'The Matrix', branch: 'tanza', no: '2', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '5', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '9', status: 'pending' },
  {  name: 'The Matrix', branch: 'naic', no: '1', status: 'pending' },
  {  name: 'The Matrix', branch: 'tanza', no: '2', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '5', status: 'pending' },
  {  name: 'The Matrix', branch: 'trece', no: '9', status: 'pending' },
  {  name: 'The Matrix', branch: 'naic', no: '1', status: 'pending' },
  {  name: 'The Matrix', branch: 'tanza', no: '2', status: 'pending' },
];

// Columns
const columns = [
  
  {
    name: 'Book Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Branch',
    selector: row => row.branch,
    sortable: true,
  },
  {
    name: 'No. of Books',
    selector: row => row.no,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
  },
];

  const [filterText, setFilterText] = useState('');
  
  // Filter the data based on the search query
  const filteredData = data.filter(item => 
    item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || 
    item.branch && item.branch.toLowerCase().includes(filterText.toLowerCase()) ||
    item.no && item.no.toLowerCase().includes(filterText.toLowerCase()) ||
    item.status && item.status.toLowerCase().includes(filterText.toLowerCase())
  );

  const customStyles = {
    table: {
      style: {
        color: 'red'
      },
    },
    headCells: {
      style: {
        //backgroundColor: '#ffa600 ',
        fontWeight: 'bold',
        fontSize: '12pt',
        //borderRight: '1px solid #764d01'
      },
    },
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Request Book List</h1>
        <div className={style.tableDiv}>
          <input
            id={style.searchBar}
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <DataTable 
            columns={columns}
            data={filteredData}
            highlightOnHover
            pointerOnHover
            striped
            pagination
            paginationPerPage={5}  // Default rows per page
            paginationRowsPerPageOptions={[5, 10]}  // Custom dropdown options
            className={style.table}
            customStyles={customStyles}
          >
          </DataTable>
        </div>


      </div>
      
    </div>
  )
}

export default RequestBookComponent
