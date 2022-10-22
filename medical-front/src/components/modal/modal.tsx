import Modal from 'react-bootstrap/Modal';

export default function MessageModal(props: any) {

  const errList = props.errors.map((item: string, key: any) =>
    <div key={key}>
      {item}
    </div>
  )

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {props.errors.length > 0 ? (
          <div className='d-flex flex-column align-items-center gap-2'>
            {errList}
          </div>
        ) : (
          <div className='d-flex flex-column align-items-center gap-2'>
            {props.message}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
