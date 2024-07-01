import React, { useEffect } from 'react';
import './CompanyTags.css';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import image5 from '../../assets/image5.png';
import image6 from '../../assets/image6.png';
import image7 from '../../assets/image7.png';
import image8 from '../../assets/image8.png';
import image9 from '../../assets/image9.png';
import jobSeekerImage from '../../assets/jobSeekerImage.png';
import recruiterImage from '../../assets/recruiterImage.png';

const CompanyTags = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller');

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);
        const contentWidth = scrollerInner.scrollWidth;
        const containerWidth = scroller.offsetWidth;

        while (scrollerInner.scrollWidth < containerWidth * 2) {
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      });
    }
  }, []);

  const gradientBorderBoxStyle = {
  width: '220px',
  height: '70px',
  padding: '12px',
  borderRadius: '30px',
  textAlign: 'center',
  lineHeight: '3.5', /* Adjust line height to control spacing */
  fontSize: '16px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '6px solid transparent',
  borderImage: 'linear-gradient(to right, red, orange) 1',
  borderImageSlice: 1,
  backgroundColor: 'transparent',
  color: '#FFF',
  background: 'slate-black-300',
  whiteSpace: 'normal', /* Allow text to wrap naturally */
  overflowWrap: 'break-word' /* Break words if necessary */
};

  const textStyles = {
    color: 'aliceblue',
    justifyContent: 'center',
  };

  return (
    <div className="company-tags-page">
      <h1 className="company-tags-title bg-white text-gray-900 dark:bg-black dark:text-white">Our Featured Partners</h1>

      <div className="scroller" data-direction="right" data-speed="slow">
        <div className="scroller__inner">
          <img src={image1} alt="Partner 1" />
          <img src={image2} alt="Partner 2" />
          <img src={image3} alt="Partner 3" />
          <img src={image4} alt="Partner 4" />
          <img src={image5} alt="Partner 5" />
          <img src={image6} alt="Partner 6" />
          <img src={image7} alt="Partner 7" />
          <img src={image8} alt="Partner 8" />
          <img src={image9} alt="Partner 9" />
        </div>
      </div>

      {/* Choice Page Content */}
      <div className="choice-page">
        <h1 className="choice-page-title bg-white text-gray-900 dark:bg-black dark:text-white">CHOOSE HOW YOU WANT TO GO ABOUT</h1>
        <div className="choice-page-content">
          <div className="choice-section">
            <img src={jobSeekerImage} alt="Job Seeker" className="choice-image" />
            <button className="choice-button">JobSeeker</button>
          </div>
          <div className="partition"></div>
          <div className="choice-section">
            <img src={recruiterImage} alt="Recruiter" className="choice-image" />
            <button className="choice-button">Recruiter</button>
          </div>
        </div>
        <div className="why-choose-us bg-white text-gray-900 dark:bg-black dark:text-white">
          <h1 className="why-choose-us-title text-4xl">Why Choose Us ! </h1>
          <p className="why-choose-us-paragraph text-center">
            We offer the best platform for job seekers and recruiters to find their perfect match. Our unique features
            and easy-to-use interface make the process smooth and efficient.
          </p>
          <div className="gradient-boxes">
            <div className="gradient-border-box " style={gradientBorderBoxStyle}>
              <p style={textStyles}>Do you have  IT Skills ? </p>
            </div>
            <div className="gradient-border-box" style={gradientBorderBoxStyle}>
              <p style={textStyles}>Do you have backlogs  in college ?</p>
            </div>
            <div className="gradient-border-box" style={gradientBorderBoxStyle}>
              <p style={textStyles}>Do you have <br/> NON-IT Skills ?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTags;
