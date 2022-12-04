import React from 'react'

function Avatar({ src, width, height, alt }) {
  return (
    <div className="avatar">
      <img src={src} alt={alt} height={height} width={width} />
    </div>
  )
}

export default Avatar
