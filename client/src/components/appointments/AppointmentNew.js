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
import { fetchAllActiveStylists } from '../../dataManager/stylistData.js';
import { fetchAllCustomers } from '../../dataManager/customerData.js';
import { fetchAllServices } from '../../dataManager/servicesData.js';
import { postAppointment } from '../../dataManager/appointmentData.js';

export const AppointmentNew = ({ getAllAppointments }) => {
  const [newAppointment, setNewAppointment] = useState({
    stylistId: null,
    customerId: null,
    date: null,
    time: null,
    services: [],
  });
  const [allStylists, setAllStylists] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchAllActiveStylists().then(setAllStylists);
    fetchAllCustomers().then(setAllCustomers);
    fetchAllServices().then(setAllServices);
  }, []);

  const handleNewAppointmentChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (service) => {
    if (!newAppointment.services.find((s) => s.id === service.id)) {
      const copy = { ...newAppointment };
      copy.services.push(service);
      setNewAppointment(copy);
    } else {
      const copy = { ...newAppointment };
      copy.services = copy.services.filter((s) => s.id !== service.id);
      setNewAppointment(copy);
    }
  };

  const handleSubmit = () => {
    if (
      newAppointment.stylistId &&
      newAppointment.customerId &&
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.services.length > 0
    ) {
      const unformattedDate = `${newAppointment.date} ${newAppointment.time}`;

      const originalDate = new Date(unformattedDate);

      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const hours = String(originalDate.getHours()).padStart(2, '0');
      const minutes = String(originalDate.getMinutes()).padStart(2, '0');
      const seconds = '00';
      const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      const appToSend = {
        customerId: newAppointment.customerId,
        stylistId: newAppointment.stylistId,
        date: formattedDateString,
        services: newAppointment.services,
      };

      postAppointment(appToSend).then(() => getAllAppointments());
      toggle()
    } else {
      window.alert(
        'please finish completing appointment form before submission'
      );
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={toggle}
      >
        New Appointment
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Appointment:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="date">Select date</Label>
              <Input
                type="date"
                name="date"
                onChange={handleNewAppointmentChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="time">Select time</Label>
              <Input
                type="time"
                name="time"
                defaultValue={'9:00'}
                min={'9:00'}
                max={'18:00'}
                step={'3600'}
                onChange={handleNewAppointmentChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="customerId">Select customer</Label>
              <Input
                type="select"
                name="customerId"
                onChange={handleNewAppointmentChange}
              >
                <option value={null}>-- please select a customer --</option>
                {allCustomers.map((c) => {
                  return (
                    <option
                      key={c.id}
                      value={parseInt(c.id)}
                    >
                      {c.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="stylistId">Select stylist</Label>
              <Input
                type="select"
                name="stylistId"
                onChange={handleNewAppointmentChange}
              >
                <option value={null}>-- please select a stylist --</option>
                {allStylists.map((s) => {
                  return (
                    <option
                      key={s.id}
                      value={parseInt(s.id)}
                    >
                      {s.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <Label>Select services</Label>
            {allServices.map((s) => {
              return (
                <FormGroup
                  check
                  key={s.id}
                >
                  <Label
                    check
                    htmlFor={s.id}
                  >
                    {s.name} -- ${s.price}
                  </Label>
                  <Input
                    type="checkbox"
                    name={s.id}
                    checked={
                      !!newAppointment.services.find((s2) => s2.id === s.id)
                    }
                    onChange={() => {
                      handleCheckbox(s);
                    }}
                  />
                </FormGroup>
              );
            })}
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
