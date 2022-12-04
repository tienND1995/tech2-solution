import React from 'react'

function Alert({ content, cols, type = 'success' }) {
  return (
    <tr colSpan={cols} className="text-center">
      <td className={`alert alert-${type} w-100`}>{content}</td>
    </tr>
  )
}

export default Alert
