import { Modal } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useGlobalState } from '../../config/Store'
import './loading.css'

const Loading = () => {
  const [loading] = useGlobalState('loading')
  

  return (
    <>
      <Modal show={loading.show}
      size="sm"
      backdrop="static"
      keyboard="false"
      centered
      className="my-modal text-colour">
        <div className='my-2 pt-2 d-flex align-items-center justify-content-center'>
          <Spinner animation="border" role="status" className='mx-2'></Spinner>
          <div className='my-2 pb-2 d-flex align-items-center justify-content-center'>{loading.msg}</div>
          </div>
        <p className='pb-2 d-flex align-items-center justify-content-center'> Please do not refresh this page! </p>
      </Modal>
    </>
  )
}

export default Loading