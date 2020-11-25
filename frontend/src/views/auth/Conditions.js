import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,  Form } from 'reactstrap';
import { Link} from '@material-ui/core';
import { QRCode } from "react-qr-svg";
import { ModalFooter } from 'react-bootstrap';
import { FaCloudDownloadAlt ,FaPrint} from 'react-icons/fa';
import './style.css'
const imageOptions = {
  scale: 5,
  encoderOptions: 1,
  backgroundColor: 'white',
}

/**
 * Class Create Qr code
 * @param imageOptions {Object} props of QR code background scale ....can be modified with custmer needs
 * @param props {ReactHooks} props of class
 * @param  FaPrint {package} print QR code
 * @param  FaCloudDownloadAlt {package} download image QR code
 
 */


const Conditions = (props) => {
    const {
      buttonLabel,
      className
    } = props;
    
  
    const [modal, setModal] = useState(false);
    const [unmountOnClose] = useState(true);
  
    const toggle = () => setModal(!modal);
  const  handleClick = () => {
     // saveSvgAsPng.saveSvgAsPng(document.getElementById('svg-chart'), 'shapes.png', imageOptions);
    };
  
    return (
        <div>
            <Form inline onSubmit={(e) => e.preventDefault()}>
               
                
                
            I have read the   <Link  color="primary"
                        to="#"
                        underline="always"
                        onClick={toggle}
                        variant="h6">
                         {' '}  terms and  conditions
                   </Link>

            </Form>
            <Modal aria-labelledby="contained-modal-title-vcenter"
      centered size="lg" isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose} >
                <ModalHeader toggle={toggle}> terms and  conditions</ModalHeader>
                <ModalBody>
                terms and  conditions

                </ModalBody>
              <ModalFooter>

              
              <Button variant="primary" onClick={toggle}>
           OK
          </Button>

              </ModalFooter>
            </Modal>
        </div>
    );
}
 

export default Conditions;