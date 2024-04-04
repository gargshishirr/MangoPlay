import React, { useState, useEffect } from 'react'; // Import useState hook for form state

function UpdateForm({ userData, onCancel, onSave }) {
  const [formData, setFormData] = useState(userData); 


  useEffect(() => {
    setFormData(userData); 
  }, [userData]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/v1/users/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessTokenMP")}`, 
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update account details");
      }
      const updatedUserData = await response.json();
      onSave(updatedUserData); 
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error as needed
    } // Call onSave function passed from parent, passing updated form data
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.fullName} onChange={handleInputChange} />
        <label htmlFor="surname">Surname</label>
        <input type="text" id="surname" name="surname" value={formData.surName} onChange={handleInputChange} />
      </div>
      <div className="form-row">
        <label htmlFor="city">Address</label>
        <input type="text" id="city" name="city" value={formData.address} onChange={handleInputChange} />
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="birthdate">Birthdate</label>
        <input type="date" id="birthdate" name="birthdate" value={formData.dateOfBirth} onChange={handleInputChange} />
        <label htmlFor="panCard">PAN Card</label>
        <input type="text" id="panCard" name="panCard" value={formData.pancard} onChange={handleInputChange} />
      </div>

      <div className="button-row">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default UpdateForm;
