import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateJourney() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8070/journeys/${id}`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch(error => console.error("Erreur lors du chargement du voyage:", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8070/journeys/${id}`, { name, description });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du voyage:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier le voyage</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mettre à jour</button>
      </form>
    </div>
  );
}

