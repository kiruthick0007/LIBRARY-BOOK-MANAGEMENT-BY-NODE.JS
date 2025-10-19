import { useState, useEffect } from 'react';
import { FaTimes, FaBook, FaUserFriends, FaChartBar } from 'react-icons/fa';

const WelcomeModal = ({ userName, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(true);

  const steps = [
    {
      icon: FaBook,
      title: 'Welcome to Library System!',
      description: `Hi ${userName}! We're excited to have you here. Let us show you around.`,
      color: 'indigo'
    },
    {
      icon: FaBook,
      title: 'Browse Our Collection',
      description: 'Explore thousands of books across multiple categories. Use our advanced search and filters to find exactly what you need.',
      color: 'purple'
    },
    {
      icon: FaUserFriends,
      title: 'Manage Your Account',
      description: 'Update your profile, track borrowed books, and manage your reading history all in one place.',
      color: 'green'
    },
    {
      icon: FaChartBar,
      title: 'Stay Organized',
      description: 'Keep track of due dates, receive notifications, and never miss a return deadline.',
      color: 'pink'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  const colorClasses = {
    indigo: 'from-indigo-600 to-purple-600',
    purple: 'from-purple-600 to-pink-600',
    green: 'from-green-500 to-emerald-600',
    pink: 'from-pink-500 to-rose-600'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className={`bg-gradient-to-r ${colorClasses[step.color]} p-8 text-white relative`}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-6 rounded-full backdrop-blur-sm">
              <Icon className="text-6xl" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-2">{step.title}</h2>
          <p className="text-center text-white text-opacity-90">{step.description}</p>
        </div>

        {/* Progress Indicator */}
        <div className="px-8 py-6">
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-gradient-to-r ' + colorClasses[step.color]
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Skip Tour
            </button>
            
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-all"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={handleNext}
                className={`px-8 py-2 bg-gradient-to-r ${colorClasses[step.color]} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
