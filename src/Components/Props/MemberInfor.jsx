import React from 'react'

function MemberInfor({ name, email }) {
  return (
    <div className='members-info'>
      <p>Ten: {name}</p>
      <p>email: {email}</p>
    </div>
  )
}

export default MemberInfor
