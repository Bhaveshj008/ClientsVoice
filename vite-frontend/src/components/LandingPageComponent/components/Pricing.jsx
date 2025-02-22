import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      features: [
        "10 monthly responses",
        "Basic analytics",
        "Email support",
        "1 space limit",
        "Standard widgets"
      ]
    },
    {
      name: "Pro",
      price: "9",
      features: [
        "Unlimited responses",
        "Up to 6 spaces",
        "Priority support",
        "Advanced analytics (coming soon!)",
        "Space-specific analytics",
        "Custom branding",
        "API access"
      ],
      highlighted: true
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg">
            Start free, upgrade when you need more power. Cancel anytime.
          </p>
        </div>

        {/* Beta Version Notice */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center mb-8">
          <span className="font-semibold">Beta Notice: </span> 
          Advanced analytics features coming soon! Currently offering early access pricing.
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl backdrop-blur-lg border ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500'
                  : 'bg-gray-800/50 border-gray-700'
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-2" />
                    <span>
                      {feature.includes('coming soon') ? (
                        <>
                          {feature.replace(' (coming soon!)', '')}
                          <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        </>
                      ) : (
                        feature
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to={plan.name === "Free" ? '/signup' : '/waitlist'}>
                <button
                  className={`w-full py-2 rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'border border-blue-500 hover:bg-blue-500/10'
                  }`}
                >
                  {plan.name === "Free" ? 'Get Started' : 'Join Waitlist'}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p>Need more than 6 spaces? <a href="#contact" className="text-blue-400 hover:underline">Contact us</a></p>
          <p className="mt-2 text-sm">Advanced analytics will include space-specific metrics and comparative insights</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;