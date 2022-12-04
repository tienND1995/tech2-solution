import React from 'react'

const getBtn = (status) => (
  <button className={`btn btn-${status ? 'success' : 'danger'}`}>
    {status ? status : 'InActive'}
  </button>
)

function CustomerItem({ name, email, status, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{getBtn(status)}</td>
      
    </tr>
  )
}


export default CustomerItem
