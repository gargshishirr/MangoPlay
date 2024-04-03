import React, { useState } from 'react'; // Import useState hook for form state

function UpdateForm({ userData, onCancel, onSave }) {
  const [formData, setFormData] = useState(userData); // Form state with initial user data

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value }); // Update form state on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData); // Call onSave function passed from parent, passing updated form data
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        <label htmlFor="surname">Surname</label>
        <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} />
      </div>
      <div className="form-row">
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="birthdate">Birthdate</label>
        <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleInputChange} />
        <label htmlFor="panCard">PAN Card</label>
        <input type="text" id="panCard" name="panCard" value={formData.panCard} onChange={handleInputChange} />
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
