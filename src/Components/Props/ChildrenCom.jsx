import React from 'react'

function ChildrenCom({onRecelive}) {
  console.log(onRecelive)
  return (
    <div>
      <h1>Render props</h1>
      <button onClick={() => {
        onRecelive('hello')
      }}>Button</button>
    </div>
  )
}

export default ChildrenCom
