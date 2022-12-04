import React from 'react'
import Avatar from './Avatar'
import MemberInfor from './MemberInfor'
import Posts from './Posts'

function Member({ info, avatar, posts }) {
  return (
    <div className="members">
      <MemberInfor {...info} />
      <Avatar {...avatar} />
      <Posts posts={posts} />
    </div>
  )
}

export default Member
