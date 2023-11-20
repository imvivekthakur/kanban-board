import React, { useEffect, useState } from "react";
import Column from "./Column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

const Board = ({ tickets }) => {
  const [groupBy, setGroupBy] = useState("status");
  const [sortOption, setSortOption] = useState("priority");
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const storedView = localStorage.getItem('preferredView');
    const storedSortOption = localStorage.getItem('preferredSortOption');
    if (storedView) {
      setGroupBy(storedView);
    }
    if (storedSortOption) {
      setSortOption(storedSortOption);
    }
  }, []);

  const handleGroupByChange = (e) => {
    const selectedGroupBy = e.target.value;
    setGroupBy(selectedGroupBy);
    localStorage.setItem('preferredView', selectedGroupBy);
  };

  const handleSortOptionChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
    localStorage.setItem('preferredSortOption', selectedSortOption);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const renderColumns = () => {
    let columns = [];

    if (groupBy === "status") {
      const statuses = [...new Set(tickets.map((ticket) => ticket.status))];
      columns = statuses.map((status) => ({
        title: status,
        tickets: tickets.filter((ticket) => ticket.status === status),
      }));
    } else if (groupBy === "user") {
      const users = [...new Set(tickets.map((ticket) => ticket.userId))];
      columns = users.map((user) => {
        const userTickets = tickets.filter((ticket) => ticket.userId === user);
        const sortedTickets =
          sortOption === "priority"
            ? sortTicketsByPriority(userTickets)
            : sortTicketsByTitle(userTickets);
        return {
          title: user,
          tickets: sortedTickets,
        };
      });
    } else if (groupBy === "priority") {
      const priorities = [0, 1, 2, 3, 4]; // Priority values
      const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"]; // Priority labels for display

      columns = priorities.map((priority, index) => ({
        title: priorityLabels[index],
        tickets: tickets.filter((ticket) => ticket.priority === priority),
      }));
    }

    return columns.map((column, index) => (
      <Column key={index} title={column.title} tickets={column.tickets} />
    ));
  };

  const sortTicketsByPriority = (ticketsToSort) => {
    const sorted = [...ticketsToSort];
    sorted.sort((a, b) => a.priority - b.priority);
    return sorted;
  };

  const sortTicketsByTitle = (ticketsToSort) => {
    const sorted = [...ticketsToSort];
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  };

  return (
    <div className="board-container">
      <div className="options-box">
        <div className="container">
          <div className="btn" onClick={toggleOptions}>
            Display
            <FontAwesomeIcon className="arrow" icon={faCircleChevronDown} />
          </div>
          {showOptions && (
            <div className="dropdowns">
              <div className="group">
                <label htmlFor="groupBySelect">Grouping </label>
                <select
                  id="groupBySelect"
                  value={groupBy}
                  onChange={handleGroupByChange}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              {groupBy === "user" && (
                <div className="order">
                  <label htmlFor="sortOption">Ordering </label>
                  <select
                    id="sortOption"
                    value={sortOption}
                    onChange={handleSortOptionChange}
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="board container">{renderColumns()}</div>
    </div>
  );
};

export default Board;
