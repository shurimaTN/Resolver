import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,  Form } from 'reactstrap';

import { QRCode } from "react-qr-svg";
import { ModalFooter } from 'react-bootstrap';
import { FaCloudDownloadAlt ,FaPrint} from 'react-icons/fa';
import './style.css'
const saveSvgAsPng = require('save-svg-as-png')
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


const CreateQRcode = (props) => {
    const {
      buttonLabel,
      className
    } = props;
    
  
    const [modal, setModal] = useState(false);
    const [unmountOnClose] = useState(true);
  
    const toggle = () => setModal(!modal);
  const  handleClick = () => {
      saveSvgAsPng.saveSvgAsPng(document.getElementById('svg-chart'), 'shapes.png', imageOptions);
    };
  
    return (
        <div>
            <Form inline onSubmit={(e) => e.preventDefault()}>
               
                
                <Button color="info" onClick={toggle}>{buttonLabel}show qrcode</Button>
            </Form>
            <Modal size="lg" isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}> show qrcode</ModalHeader>
                <ModalBody>
                 <p>  {props.url}</p>
               <p class="center">    <QRCode
                id={"svg-chart"}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 256 }}
                value= {props.url}
            /></p>

                </ModalBody>
              <ModalFooter>

              <Button onClick={handleClick}>Download Image <FaCloudDownloadAlt /></Button>   
                 
              <Button onClick={() => window.print()}>PRINT <FaPrint/> </Button>
                 

              </ModalFooter>
            </Modal>
        </div>
    );
}
 

export default CreateQRcode;