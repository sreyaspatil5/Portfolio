import React from 'react';
import herobg from '../../assets/hero-image.png'; // Correct path
import './HomePage.css'; // Import your CSS file

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      <main className="p-8 bottom-2 relative">
        <section className="flex items-center mb-8">
          <div className="w-1/2 pr-4 relative">
            <img src={herobg} alt="Hero Background" className="rounded-lg absolute-fix p-4" />
            {/* Dotted Grid Overlay */}
          </div>
          <div className="w-full md:w-1/2 pl-4 text-left relative z-20">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 dark:text-white righteous-regular custom-h1"
              style={{
                marginTop: '-2rem', // Adjust this value as needed
                position: 'relative', // Ensure correct positioning
              }}
            >
              KNOW WHAT YOU ARE LACKING...
            </h1>
            <br/>
            <p
              className="mb-3 font-semibold dark:text-white"
              style={{
                marginTop: '-1rem', // Adjust this value to move the paragraph up
              }}
            >
              To get Hired
            </p>

            <button
              className="learn-more-btn"
              onClick={() => console.log('Learn More clicked')}
            >
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
