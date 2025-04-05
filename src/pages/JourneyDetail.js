import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function JourneyDetail() {
  const { id } = useParams();
  const [journey, setJourney] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8070/journeys/${id}`)
      .then(response => setJourney(response.data))
      .catch(error => console.error("Erreur lors du chargement du voyage:", error));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8070/journeys/${id}`);
      navigate("/"); // Redirige vers la liste des voyages après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du voyage:", error);
    }
  };

  if (!journey) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Détails du voyage</h1>
      <div className="mb-4">
        <strong className="text-xl">{journey.name}</strong>
        <p>{journey.description}</p>
        <p>{journey.ai_response}</p>
      </div>
      <div className="flex gap-4">
        <Link to={`/update/${journey.id}`} className="bg-blue-500 text-white p-2 rounded">Modifier</Link>&nbsp;
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Supprimer</button>
      </div>
    </div>
  );
}

