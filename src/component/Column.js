// Inside Column.js component

import React from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faExclamationCircle,
  faFlag,
  faTasks,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Column = ({ title, tickets, taskCount }) => {
  const renderCards = () => {
    return tickets.map((ticket) => <Card key={ticket.id} ticket={ticket} />);
  };

  const getIconByTitle = (title) => {
    switch (title) {
      case "Todo":
        return <FontAwesomeIcon className="icon" icon={faTasks} color="blue"/>;
      case "In progress":
        return <FontAwesomeIcon className="icon" icon={faFlag} color="green"/>;
      case "Backlog":
        return <FontAwesomeIcon className="icon" icon={faBell} color="red"/>;
    
      case "No Priority":
            return <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="gray" />;
      case "Low":
        return <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="green" />;
      case "Medium":
        return <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="orange" />;
      case "High":
        return <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="red" />;
      case "Urgent":
        return <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="purple" />;
      
      default:
        return <FontAwesomeIcon className="icon" icon={faUser} />;
    }
  };

  return (
    <div className="column">
      <div className="header">
        <h3>
          {getIconByTitle(title)}
          {title} <span className="count">{taskCount}</span>
        </h3>
      </div>
      <div className="cards">{renderCards()}</div>
    </div>
  );
};

export default Column;
