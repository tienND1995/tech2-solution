import React from 'react'
import './App.css'
import Customers from './Components/Customers/Customers'
import Member from './Components/Props/Member'
import Table from './Components/Table/Table'

function App() {
  const members = {
    info: {
      name: 'tien',
      email: 'halelugia96@gmail.com',
    },
    avatar: {
      src: 'https://picsum.photos/800',
      width: '200',
      height: '150',
      alt: 'Ảnh của tôi',
    },
    posts: [
      {
        id: 1,
        title: 'bai 1',
      },
      {
        id: 2,
        title: 'bai 2',
      },
      {
        id: 3,
        title: 'bai 3',
      },
    ],
  }

  return (
    <React.Fragment>
      <Customers />
      <Member {...members} />
      <Table />
    </React.Fragment>
  )
}

export default App
