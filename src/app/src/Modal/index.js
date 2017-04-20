import React, { PropTypes } from 'react'
import Backdrop from '../Backdrop'

const Modal = ({ offsetY, content, isOpen, visibleHeight, closeModal }) => {
  const style = {
    transform: `translateY(${offsetY}px)`,
    height: visibleHeight
  }
  const modalClassName = `Modal ${isOpen?"Modal--open":"Modal--close"}`

  return (
    <Backdrop style={style} onClose={closeModal}>
      <div className={modalClassName} >
        <button onClick={closeModal}>X</button>
        <p>
          {content}
        </p>
      </div>
    </Backdrop>
  )
}

export default Modal
