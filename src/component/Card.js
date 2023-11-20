import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Card = ({ ticket }) => {
  const { id, title, tag } = ticket;

  return (
    <div className="card">
      <p className="id">{id}</p>
      <h4 className="title">{title}</h4>
      <div className="box">
        <FontAwesomeIcon className="more-icon" icon={faEllipsis} />
        <span className="tag"><div className="circle"></div><div>{tag}</div></span>
      </div>
    </div>
  );
};

export default Card;
