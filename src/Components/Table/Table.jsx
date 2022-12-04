import React from 'react'
import Tr from './Tr'

function Table(props) {
  const product = {
    id: 1,
    name: 'shoe',
    price: '3000$',
    isStock: false,
  }

  let value = null
  if (product.isStock) {
    value = (
      <>
        <p>Tên: {product.name}</p>
        <p>Giá: {product.price}</p>
        <p>
          Hàng: <b>Còn hàng</b>
        </p>
      </>
    )
  } else {
    value = <p>Hết hàng</p>
  }

  return (
    // <table className="table table-bordered mt-5">
    //   <thead>
    //     <Tr />
    //   </thead>
    // </table>

    <div>
      <h1 className='mt-5'>Shop</h1>
      {value}
    </div>
  )
}

export default Table
