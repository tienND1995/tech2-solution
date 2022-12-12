import React from 'react'

function Demo() {
  const getApi = async () => {
    const res = await fetch('http://localhost:3004/todos')
    const todos = await res.json()
  }

  getApi()

  return <div>Demo</div>
}

export default Demo
