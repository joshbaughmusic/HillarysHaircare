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
import { postCustomer } from '../../dataManager/customerData.js';

export const CustomerNew = ({ getAllCustomers }) => {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleNewCustomerChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone.length === 10) {
        const copy = newCustomer;
        copy.phone = copy.phone.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '$1-$2-$3'
        );
      postCustomer(copy).then(() => getAllCustomers());
      toggle();
    } else {
      window.alert('please finish completing customer form before submission');
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={toggle}
      >
        New Customer
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Customer:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Enter customer name:</Label>
              <Input
                value={newCustomer.name}
                name="name"
                onChange={handleNewCustomerChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Enter customer email:</Label>
              <Input
                type="email"
                value={newCustomer.email}
                name="email"
                onChange={handleNewCustomerChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Enter customer phone:</Label>
              <Input
                type="phone"
                value={newCustomer.phone}
                name="phone"
                maxlength="10"
                onChange={handleNewCustomerChange}
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
