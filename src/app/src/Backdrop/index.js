import React, { PropTypes } from 'react'

const Backdrop = ({ closeClick = true, children, onClose, ...otherProps }) => {

  const getRef = element => node = element
  let node = null

  function handleCloseClick(event){
    if (!closeClick || event.target !== node) return
    return onClose()
  }

  return (
    <div
      className="Backdrop"
      {...otherProps}
      onClick={handleCloseClick}
      ref={getRef}>
      {children}
    </div>
  )
}

export default Backdrop
