import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { postStylist } from '../../dataManager/stylistData.js';

export const StylistNew = ({ getAllStylists }) => {
  const [newStylist, setNewStylist] = useState({
    name: '',
    isActive: true
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleNewStylistChange = (e) => {
    setNewStylist({
      ...newStylist,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (newStylist.name) {
      postStylist(newStylist).then(() => getAllStylists());
      toggle();
    } else {
      window.alert('please finish completing stylist form before submission');
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={toggle}
      >
        New Stylist
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Stylist:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Enter stylist name:</Label>
              <Input
                value={newStylist.name}
                name="name"
                onChange={handleNewStylistChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
