import React, { useEffect, useState } from 'react';
import './Form.css';
import axios from 'axios';

function EditForm({ userDetail, setEmployee, setUserDetail, employee, fetchData, setEditMode }) {
  // console.log({userDetail})
  const [formData, setFormData] = useState(
    {
      profile_picture: '',
      name: '',
      email: '',
      gender: '',
      hobbies: [],
      education: [{ school: '', graduationYear: '' }],
      skills: [{ name: '', experienceMonths: '' }],
      experience: [{ company: '', project: '', role: '', startDate: '', endDate: '' }]
    });

  useEffect(() => {
    userDetail ?
      setFormData({ ...userDetail }) : setFormData({
        profile_picture: '',
        name: '',
        email: '',
        gender: '',
        hobbies: [],
        education: [{ school: '', graduationYear: '' }],
        skills: [{ name: '', experienceMonths: '' }],
        experience: [{ company: '', project: '', role: '', startDate: '', endDate: '' }]
      })

  }, [userDetail])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleProfilePicChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_picture: event.target.files[0]
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedHobbies = [...formData.hobbies];

    if (checked) {
      updatedHobbies.push(value);
    } else {
      updatedHobbies = updatedHobbies.filter((hobby) => hobby !== value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      hobbies: updatedHobbies
    }));
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...formData.education];
    list[index][name] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: list
    }));
  };

  const handleAddEducation = () => {
    if (formData.education.length < 10) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        education: [...prevFormData.education, { school: '', graduationYear: '' }]
      }));
    }
  };

  const handleSkillsChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...formData.skills];
    list[index][name] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: list
    }));
  };

  const handleAddSkill = () => {
    if (formData.skills.length < 10) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, { name: '', experienceMonths: '' }]
      }));
    }
  };

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...formData.experience];
    list[index][name] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: list
    }));
  };

  const handleAddExperience = () => {
    if (formData.experience.length < 10) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        experience: [
          ...prevFormData.experience,
          { company: '', project: '', role: '', startDate: '', endDate: '' }
        ]
      }));
    }
  };

  const handleRemoveEducation = (index) => {
    const list = [...formData.education];
    list.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: list
    }));
  };

  const handleRemoveSkill = (index) => {
    const list = [...formData.skills];
    list.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: list
    }));
  };

  const handleRemoveExperience = (index) => {
    const list = [...formData.experience];
    list.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: list
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (userDetail) {
        console.log(userDetail.id)
        const putResponse = await axios.put(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${userDetail.id}`, formData);

        setUserDetail(putResponse.data);
        const updatedData = employee.filter((item) => item.id !== userDetail.id)
        fetchData()
        setEditMode(false)
        // setEmployee([...updatedData, formData])
      } else {
        const postResponse = await axios.post("https://60d5a2c2943aa60017768b01.mockapi.io/candidate", formData);
        window.location.href = "/";
        // setEmployee((prev) => [...prev, formData]);
      }

      setFormData({
        profile_picture: '',
        name: '',
        email: '',
        gender: '',
        hobbies: [],
        education: [{ school: '', graduationYear: '' }],
        skills: [{ name: '', experienceMonths: '' }],
        experience: [{ company: '', project: '', role: '', startDate: '', endDate: '' }]
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  return (

    <div className="container">
      <h1>Step 1: Personal Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div className="form-group-photo">
          <label htmlFor="profile-pic">Profile Picture:</label>
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            onChange={handleProfilePicChange}

          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hobbies:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="reading"
                checked={formData.hobbies.includes("reading")}
                onChange={handleCheckboxChange}
              />
              Reading
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="writing"
                checked={formData.hobbies.includes("writing")}
                onChange={handleCheckboxChange}
              />
              Writing
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="drawing"
                checked={formData.hobbies.includes("drawing")}
                onChange={handleCheckboxChange}
              />
              Drawing
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="painting"
                checked={formData.hobbies.includes("painting")}
                onChange={handleCheckboxChange}
              />
              Painting
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="music"
                checked={formData.hobbies.includes("music")}
                onChange={handleCheckboxChange}
              />
              Music
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobbies"
                value="sports"
                checked={formData.hobbies.includes("sports")}
                onChange={handleCheckboxChange}
              />
              Sports
            </label>
          </div>
        </div>
        {/* Education */}
        <h2> Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <div className="form-group">
              <label>Name of School/College/Institute:</label>
              <input
                type="text"
                name="school"
                value={edu.school}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Year of Graduation:</label>
              <input
                type="text"
                name="graduationYear"
                value={edu.graduationYear}
                onChange={(e) => handleEducationChange(index, e)}
                required
              />
            </div>
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveEducation(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddEducation}>
          Add Education
        </button>
        {/* Skills */}
        <h2> Skills</h2>
        {formData.skills.map((skill, index) => (
          <div key={index}>
            <div className="form-group">
              <label>Name of Skill:</label>
              <input
                type="text"
                name="name"
                value={skill.name}
                onChange={(e) => handleSkillsChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Experience in months:</label>
              <input
                type="text"
                name="experienceMonths"
                value={skill.experienceMonths}
                onChange={(e) => handleSkillsChange(index, e)}
                required
              />
            </div>
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveSkill(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddSkill}>
          Add Skill
        </button>
        {/* Experience */}
        <h2> Experience</h2>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            <div className="form-group">
              <label>Name of Company:</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Name of Project:</label>
              <input
                type="text"
                name="project"
                value={exp.project}
                onChange={(e) => handleExperienceChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <input
                type="text"
                name="role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, e)}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration:</label>
              <input
                type="text"
                name="startDate"
                placeholder="Start Date (e.g., Jan 2021)"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, e)}
                required
              />
              <input
                type="text"
                name="endDate"
                placeholder="End Date (e.g., Nov 2021)"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, e)}
                required
              />
            </div>
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveExperience(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>
          Add Experience
        </button>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditForm;
