import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8070/journeys/")
      .then(response => setJourneys(response.data))
      .catch(error => console.error("Erreur lors du chargement des voyages:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des voyages</h1>
      <ul>
        {journeys.map(journey => (
          <li key={journey.id} className="mb-2 p-2 border rounded">
            <Link to={`/journey/${journey.id}`} className="text-blue-500">{journey.name}</Link>
            <p>{journey.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

