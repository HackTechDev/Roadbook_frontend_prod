import React, { useState } from "react";
import axios from "axios";

export default function ChatWithMistral() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://roadbook-backend-prod.onrender.com/journey/chat", {
        name,
        description
      });
      setResponse(data.response);
    } catch (error) {
      console.error("Erreur lors de l'interrogation de Mistral:", error);
      setResponse("Erreur lors de la récupération de la réponse.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat avec Mistral</h1>
      <p>Exemple de prompt : <br/>
      Je suis un touriste.<br/>Je voudrais un voyage touristique entre la ville de Sedan (Ardennes) et la ville de Givet (Ardennes).
      Le voyage dure 3 jours.<br/>
      Je voudrai visiter des lieux touristiques.<br/>
      </p>
      <br/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold">Réponse :</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

