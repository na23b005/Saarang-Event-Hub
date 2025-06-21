import React, { useEffect, useState } from "react";
import axios from "axios";

function MyRegistrations() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get("http://localhost:3001/api/events/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <h2>My Registered Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>{event.title} - {event.description}</li>
        ))}
      </ul>
    </div>
  );
}
export default MyRegistrations;
