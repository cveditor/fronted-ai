import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Base',
      price: 'Gratis',
      features: ['Dashboard essenziale', '1 account social', 'Supporto via email'],
      highlight: false,
    },
    {
      name: 'Pro',
      price: '19€/mese',
      features: ['Dashboard avanzata', '5 account social', 'Supporto prioritario', 'Analisi dettagliate'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '49€/mese',
      features: ['Dashboard personalizzata', 'Account illimitati', 'Supporto dedicato', 'Reportistica avanzata'],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white font-sans">
      {/* Hero section */}
      <section className="text-center py-28 px-8">
        <h1 className="text-5xl font-extrabold leading-tight mb-6 text-white">Potenzia la tua presenza online</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-80">
          Un'unica piattaforma per gestire, analizzare e far crescere la tua audience sui social.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-blue-600 font-bold py-3 px-10 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Inizia ora
        </button>
      </section>

      {/* Piani */}
      <section className="py-20 px-5 bg-white text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Scegli il piano giusto per te</h2>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all ${plan.highlight ? 'border-4 border-blue-600' : 'border'}`}
            >
              <h3 className="text-3xl font-bold mb-4 text-blue-900">{plan.name}</h3>
              <p className="text-5xl font-extrabold mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/register')}
                className={`w-full py-3 rounded-full text-lg font-bold ${plan.highlight ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-blue-600'}`}
              >
                Scegli il piano
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 bg-gray-800 text-white text-sm">
        © {new Date().getFullYear()} AI-SaaS. Potenzia il tuo brand online.
      </footer>
    </div>
  );
};

export default HomePage;
