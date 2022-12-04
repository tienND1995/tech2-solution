import React from 'react'

function Posts(props) {
  const { posts } = props
  return (
    <div>
      {posts.map(({ id, title }) => (
        <div key={id}>
          <p>{title}</p>
        </div>
      ))}
    </div>
  )
}

export default Posts
