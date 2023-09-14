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
import { fetchSingleCustomer, updateCustomer } from '../../dataManager/customerData.js';

export const CustomerEdit = ({ id, getSingleCustomer }) => {
  const [customer, setCustomer] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchSingleCustomer(id).then(setCustomer);
  }, []);

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (customer.name && customer.email && customer.phone.length >= 10) {
      const copy = customer;
      copy.phone = copy.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      updateCustomer(copy, id).then(() => getSingleCustomer());
      toggle();
    } else {
      window.alert('please finish completing customer form before submission');
    }
  };

  return (
    <>
      <Button
        color="warning"
        onClick={toggle}
      >
        Edit Customer
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Edit Customer:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Enter customer name:</Label>
              <Input
                value={customer.name}
                name="name"
                onChange={handleCustomerChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Enter customer email:</Label>
              <Input
                type="email"
                value={customer.email}
                name="email"
                onChange={handleCustomerChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Enter customer phone:</Label>
              <Input
                type="phone"
                value={customer.phone}
                name="phone"
                onChange={handleCustomerChange}
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
