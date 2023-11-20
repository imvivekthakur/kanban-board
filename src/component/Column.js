import React from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons'
const Column = ({ title, tickets }) => {
  console.log(tickets);
  const renderCards = () => {
    return tickets.map((ticket) => <Card key={ticket.id} ticket={ticket} />);
  };

  return (
    <div className="column">
        <div className="header">
            <h3>{title} </h3>
            <div>
                <FontAwesomeIcon className="plus" icon={faPlus} />
                <FontAwesomeIcon className="more" icon={faEllipsis} />
            </div>
        </div>
        <div className="cards">{renderCards()}</div>
    </div>
  );
};

export default Column;
