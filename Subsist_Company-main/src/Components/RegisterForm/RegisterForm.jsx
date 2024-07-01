import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
    file: null
  });

  const [showSuccess, setShowSuccess] = useState(false); // State to control showing success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file
    }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('number', formData.number);
    data.append('password', formData.password);
    data.append('file', formData.file);

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          number: '',
          password: '',
          confirmPassword: '',
          file: null
        });
        // Show success message
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000); // Hide after 3 seconds
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formStyle = {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative' // Added relative positioning for success message positioning
  };

  const wrapperStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  const boxContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px'
  };

  const boxStyle = {
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#141825',
    color: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #2d313f',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: '#313643',
    color: '#fff'
  };

  const confirmButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#38687e',
    color: '#fff',
    transition: 'background-color 0.3s ease'
  };

  const successBoxStyle = {
    position: 'absolute',
    bottom: '-60px', // Adjusted position below the form
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px', // Adjusted width for better fit
    padding: '10px',
    backgroundColor: '#ff9102',
    color: '#000',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: '9999',
    opacity: showSuccess ? '1' : '0',
    transition: 'opacity 0.5s ease'
  };

  return (
    <div className="register-form" style={formStyle}>
      <div className="text-wrapper" style={wrapperStyle}>
        <h2 style={{ color: '#ff9102', fontWeight: 'bold', textAlign: 'left' }}>Are you looking for a job?</h2>
      </div>
      <div className="box-container" style={boxContainerStyle}>
        <div className="left-box" style={{ ...boxStyle, backgroundColor: '#141825' }}>
          <form>
            <div className="form-group">
              <label style={labelStyle}>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Full Name" required />
            </div>
            <div className="form-group">
              <label style={labelStyle}>Email ID:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="Email-ID" required />
            </div>
            <div className="form-group">
              <label style={labelStyle}>Number:</label>
              <input type="tel" name="number" value={formData.number} onChange={handleChange} style={inputStyle} placeholder="Contact Number" required />
            </div>
          </form>
        </div>

        <div className="right-box" style={{ ...boxStyle, backgroundColor: '#0b0f1c' }}>
          <form>
            <div className="form-group">
              <label style={labelStyle}>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} placeholder="Password Minimum 10 Characters" required />
            </div>

            <div className="form-group">
              <label style={labelStyle}>Confirm Password:</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={inputStyle} placeholder="Confirm Password" required />
            </div>

            <div className="form-group">
              <label style={labelStyle}>Choose File:</label>
              <label htmlFor="file-upload" className="register-button">Choose File</label>
              <input id="file-upload" type="file" name="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
              <label>Upload .docx and pdf only</label>
            </div>

            <div className="form-buttons" style={{ textAlign: 'right' }}>
              <button onClick={handleConfirm} style={confirmButtonStyle}>Confirm</button>
            </div>
          </form>
        </div>
      </div>

      {/* Success message box with fade-in and fade-out animation */}
      {showSuccess && (
        <div id="success-box" style={successBoxStyle}>
          <h3 style={{ margin: 0 }}>Registration Successful!</h3>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
