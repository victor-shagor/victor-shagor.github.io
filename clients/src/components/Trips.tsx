import React, { useEffect, useContext, useState, useRef } from "react";
import { Table, Button, Modal, Icon, Header, Input } from "semantic-ui-react";
import { UserContext } from "../context/userContext";
import { SideNav } from "./Dashboard";
import { TabDiv } from "./styled-components";
import {TripContext} from '../context/TripContext';
import {useHistory} from 'react-router-dom'


const Triptable = () => {
  const history = useHistory()
  if(!localStorage.token){
    history.push('/')
  }
  type Trip = {
    id: number,
    bus_id: number,
    origin: string,
    destination: string,
    fare: number,
    trip_date: string,
    status: string
  }
  const [open, setOpen] = useState();
  const origin: any = useRef();
  const destination: any = useRef();
  // const [trips, setTrips] = useState([]);
  const [id, setId] = useState();
  // const [message, setMessage] = useState();
  const [originquery, setOrigin] = useState("");
  const [destinationquery, setDestination] = useState("");
  const {trips, getTrips, message, handleClick } = useContext(TripContext)
  const handleBook = (e: any) => {
    e.preventDefault();
    handleClick(id)
    setOpen(false)
    console.log(message);
    // try {
    //   fetch("https://bus-connect.herokuapp.com/api/v1/bookings", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //       token: localStorage.token
    //     },
    //     body: JSON.stringify({ trip_id: id })
    //   })
    //     .then(response => response.json())
    //     .then((res) => {
    //       if (res.data) {
    //         setMessage("Trip booked succesfully"); 
    //       }
    //     });
    // } catch (error) {}
    // setOpen(false)
    // if(message){
    //   setTimeout(() => {
    //     setMessage("");
    //   }, 3000); 
    // }
  };
  const { token } = useContext(UserContext);
  useEffect(() => {
    // async function getData() {
    //   const get = await fetch(
    //     `https://bus-connect.herokuapp.com/api/v1/trips?origin=${originquery}&destination=${destinationquery}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-type": "application/json",
    //         token: localStorage.token
    //       }
    //     }
    //   );
    //   const result = await get.json();
    //   if (result.data) {
    //     setTrips(result.data);
    //   }
    // }
    getTrips(originquery, destinationquery);
  }, [originquery, destinationquery]);
  return (
    <div>
      <SideNav />
      <TabDiv>
        <form action="">
          <Input
            icon="search"
            placeholder="Origin"
            ref={origin}
            onChange={e => setOrigin(e.target.value)}
          />
          <Input
            icon="search"
            placeholder="Destination"
            ref={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </form>
        <p style={message?({display:"block", color:"green"}):({display:"none"})}>{message}</p>
        <Table style={{ color: "#00bfa6" }} color={"green"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              <Table.HeaderCell>Trip Date</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {trips.map((trip:any) => (
              <Table.Row>
                <Table.Cell>{trip.origin}</Table.Cell>
                <Table.Cell>{trip.destination}</Table.Cell>
                <Table.Cell>{trip.trip_date}</Table.Cell>
                <Table.Cell>{trip.fare}</Table.Cell>
                <Table.Cell>
                  <Modal
                    trigger={
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setId(trip.id);
                        }}
                        style={{ backgroundColor: "#00bfa6" }}
                        positive
                      >
                        Book
                      </Button>
                    }
                    basic
                    size="small"
                    open={open}
                  >
                    <Header icon="bus" content="Trip Booking" />
                    <Modal.Content>
                      <p>Are you sure you want to book this trip?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        onClick={() => {
                          setOpen(false);
                        }}
                        basic
                        color="red"
                        inverted
                      >
                        <Icon name="remove" /> No
                      </Button>
                      <Button
                        onClick={handleBook}
                        id={trip.id}
                        color="green"
                        inverted
                      >
                        <Icon name="checkmark" /> Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TabDiv>
    </div>
  );
};
export default Triptable;
