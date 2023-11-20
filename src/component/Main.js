import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';

const Main = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios
      .get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        setTickets(response.data.tickets);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="main">
        <Board tickets={tickets} />
    </div>
  );
};

export default Main;
