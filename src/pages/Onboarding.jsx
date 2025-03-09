import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const navigate = useNavigate();

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = () => {
    console.log('Piano scelto:', selectedPlan);
    navigate('/dashboard');
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Benvenuto! 🚀</h2>

      <p className="text-center mb-4">Scegli il tuo piano:</p>

      <div className="space-y-4">
        {['Base', 'Pro', 'Premium'].map((plan) => (
          <button
            key={plan}
            onClick={() => handlePlanSelection(plan)}
            className={`w-full p-4 border rounded-md ${
              selectedPlan === plan ? 'border-blue-600 bg-blue-100' : 'border-gray-300'
            }`}
          >
            {plan}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedPlan}
        className={`mt-6 w-full p-2 text-white rounded-md ${
          selectedPlan ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Conferma
      </button>
    </div>
  );
};

export default Onboarding;
