import React, { PropTypes } from 'react'
import Modal from '../Modal'
import {
  getIframeOffset,
  getWindowScroll,
  setWindowScroll,
  getVisibleViewPortHeight } from '../helpers/iframehelpers'


/* TODO
  * consider bottom margin when calculating visible viewport
  * write logic so still works when not in an iframe
*/

const getState = () => {
  const headerSize = getIframeOffset(parent)
  const scrollY = getWindowScroll(parent)
  const viewPortHeight = getVisibleViewPortHeight({
    window: parent,
    marginTop: scrollY > headerSize ? 0 : headerSize - scrollY
  })

  return { headerSize, scrollY, viewPortHeight }
}

const Container = React.createClass({
  getInitialState() {
    return {
      ...getState(),
      openId: null,
      modals: [
        {id: 1, content: "i am first modal"},
        {id: 2, content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        {id: 3, content: "i am third modal"},
        {id: 4, content: "i am fourth modal"},
        {id: 5, content: "i am fifth modal"},
        {id: 6, content: "i am sixth modal"},
        {id: 7, content: "i am seventh modal"},
        {id: 8, content: "i am eighth modal"},
        {id: 9, content: "i am nineth modal"},
        {id: 10, content: "i am tenth modal"},
        {id: 11, content: "i am eleventh modal"},
        {id: 12, content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
      ]
    }
  },
  toggleModal(id) {
    return () => {
      if (this.state.openId === id) {
        setWindowScroll(parent, true)
        parent.removeEventListener('resize', this.updateParentState)
        return this.setState({ openId: null })
      }

      setWindowScroll(parent, false)
      parent.addEventListener('resize', this.updateParentState)
      this.setState({
        ...getState(),
        openId: id
      })
    }
  },
  updateParentState() {
    return this.setState(getState)
  },
  render () {
    const { openId, headerSize, scrollY, viewPortHeight, modals } = this.state
    const openModal = modals.find(item => item.id === openId)
    const offsetY = scrollY > headerSize ? scrollY - headerSize : 0

    return (
      <div className="Container">
        {modals.map(modal =>
          <button key={'modal-' + modal.id} onClick={this.toggleModal(modal.id)}>
            Open modal {modal.id}
          </button>
        )}

        {openId &&
          <Modal {...openModal}
            offsetY={offsetY}
            visibleHeight={viewPortHeight}
            closeModal={this.toggleModal(openModal.id)} />}
      </div>
    )
  }
})

export default Container
