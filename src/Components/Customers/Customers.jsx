import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Customers.scss'
import Data from './Data.json'
import CustomerItem from './CustomerItem'
import Alert from './Alert'

function Customers(props) {
  const { customers } = Data
  console.log('customers:', customers)

  const customersJsx = customers?.length ? (
    customers.map?.((customer, index) => {
      customer.index = index
      console.log('customer', customer)
      return <CustomerItem {...customer} key={customer.id} />
    })
  ) : (
    <Alert content={'không có danh sách'} cols={4} type={'danger'} />
  )

  return (
    <div className="container">
      <div className="row">
        <h2>Danh sach khach hang</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>stt</th>
              <th>name</th>
              <th>email</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>{customersJsx}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Customers
