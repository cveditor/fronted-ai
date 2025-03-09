import React, { useEffect, useState } from 'react';
import axios from '../services/api'; // Usa il file api.js per coerenza
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Ottieni il vero userId dal localStorage

  useEffect(() => {
    if (userId) {
      fetchUser();
    } else {
      toast.error('Errore: utente non autenticato.');
      setLoading(false);
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`api/user/${userId}`);
      setUser(data);
      setSelectedPlan(data.subscriptionPlan); // Imposta il piano attuale
      setLoading(false);
    } catch (err) {
      console.error('Errore nel recupero del profilo:', err.message);
      toast.error('Impossibile caricare il profilo.');
      setLoading(false);
    }
  };

  const handlePlanChange = async (e) => {
    const newPlan = e.target.value;
    setSelectedPlan(newPlan);

    try {
      await axios.post('api/subscriptions/update', {
        userId,
        plan: newPlan,
      });
      toast.success('Piano aggiornato con successo!');
    } catch (err) {
      console.error('Errore durante l’aggiornamento del piano:', err.message);
      toast.error('Errore nell’aggiornamento del piano.');
    }
  };

  if (loading) {
    return <p className="text-center text-2xl mt-20">Caricamento profilo...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold mb-6">Profilo Utente</h2>

      {user ? (
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Piano Attuale:</strong> {user.subscriptionPlan}</p>
          </div>

          <div className="mt-6">
            <label htmlFor="plan" className="block text-lg font-medium mb-2">Modifica il tuo piano:</label>
            <select
              id="plan"
              value={selectedPlan}
              onChange={handlePlanChange}
              className="w-full p-3 border rounded-md text-lg"
            >
              <option value="basic">Basic - $4</option>
              <option value="premium">Premium - $10</option>
              <option value="pro">Pro - $25</option>
            </select>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Nessun dato disponibile.</p>
      )}
    </div>
  );
};

export default Profile;
