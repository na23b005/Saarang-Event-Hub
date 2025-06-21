import React, { useEffect, useState } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/events").then((res) => setEvents(res.data));
  }, []);

  const filtered = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  const handleRegister = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }
    await axios.post(`http://localhost:3001/api/events/${id}/register`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Registered!");
  };

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events" />
      <ul>
        {filtered.map((event) => (
          <li key={event._id}>
            <b>{event.title}</b> - {event.description}
            <button onClick={() => handleRegister(event._id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default EventList;
