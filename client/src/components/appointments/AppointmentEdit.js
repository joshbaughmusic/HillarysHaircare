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
import { fetchAllServices } from '../../dataManager/servicesData.js';
import {
  cancelAppointment,
  fetchSingleAppointment,
  updateAppointment,
} from '../../dataManager/appointmentData.js';

export const AppointmentEdit = ({ id, getSingleAppointment }) => {
  const [appointment, setAppointment] = useState({});
  const [allServices, setAllServices] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getCurrentAppointment = () => {
    fetchSingleAppointment(id).then(setAppointment);
  };
  const getAllServices = () => {
    fetchAllServices(id).then(setAllServices);
  };

  useEffect(() => {
    getCurrentAppointment();
    getAllServices();
  }, []);

  const handleCheckbox = (service) => {
    if (!appointment.services?.find((s) => s.id === service.id)) {
      const copy = { ...appointment };
      copy.services.push(service);
      setAppointment(copy);
    } else {
      const copy = { ...appointment };
      copy.services = copy.services.filter((s) => s.id !== service.id);
      setAppointment(copy);
    }
  };

  const handleCancel = () => {
    cancelAppointment(id).then(() => getSingleAppointment(id));
    toggle();
  };

  const handleSubmit = () => {
    if (appointment.services.length > 0) {
      updateAppointment(appointment, id).then(() => getSingleAppointment());
      toggle();
    } else {
      window.alert(
        'please finish completing appointment form before submission'
      );
    }
  };

  return (
    <>
      <Button
        color="warning"
        onClick={toggle}
      >
        Edit Appointment
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Edit Appointment:</ModalHeader>
        <ModalBody>
          <Form>
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
                      !!appointment.services?.find((s2) => s2.id === s.id)
                    }
                    onChange={() => {
                      handleCheckbox(s);
                    }}
                  />
                </FormGroup>
              );
            })}
          </Form>
          <Button
            color="danger"
            onClick={handleCancel}
          >
            Cancel
          </Button>
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
