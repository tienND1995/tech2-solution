import React from 'react'
import ChildrenCom from './ChildrenCom'

function ParentCom(props) {
  const handleRecelive = (data) => {
    console.log(data)
  }
  return <ChildrenCom onRecelive={handleRecelive}/>
}

export default ParentCom
