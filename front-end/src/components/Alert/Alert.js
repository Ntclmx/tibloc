import { useGlobalState, setGlobalState } from '../../config/Store'
import { FaRegTimesCircle } from 'react-icons/fa'
import { BsCheck2Circle } from 'react-icons/bs'
import { useState } from 'react'
import './alert.css'
import { Modal } from 'react-bootstrap'

const Alert = () => {
  const [alert] = useGlobalState('alert')
  // const [show, setShow] = useState(false)
 
  const handleClose = () => {
    // setShow(false)
    setGlobalState('alert', {show: false, msg: "", color: alert.color})
  }

  return (
    <>
      <Modal show={alert.show}
      onHide={handleClose}
      size="sm"
      centered
      className="my-modal text-colour" >
        <div className='my-4 pt-4 d-flex align-items-center justify-content-center'>
        {alert.color == 'red' ? (
          <FaRegTimesCircle className="red-button" size={56}/>
        ) : (
          <BsCheck2Circle className='green-button' size={56}/>
        )}
          </div>
        <p className='mt-4 pb-4 d-flex align-items-center justify-content-center'>{alert.msg}</p>
      </Modal>
    </>
  )
}

export default Alert