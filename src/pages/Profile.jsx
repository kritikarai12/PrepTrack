import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const BASE_URL = 'http://localhost:5000/api';

function Profile() {
  const { student, token, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeName, setResumeName] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [newOffer, setNewOffer] = useState({ company: '', role: '', package: '' });
  const [addingOffer, setAddingOffer] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: student ? student.name : '',
    email: student ? student.email : '',
    branch: student ? student.branch : '',
    year: student ? student.year : '',
    college: student ? student.college : '',
    cgpa: student ? student.cgpa || '' : '',
    skills: student ? student.skills || [] : [],
    offers: student ? student.offers || [] : [],
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`${BASE_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          branch: formData.branch,
          year: formData.year,
          college: formData.college,
          cgpa: formData.cgpa,
          skills: formData.skills,
          offers: formData.offers
        })
      });
      const data = await response.json();
      if (data.student) {
        login(data.student, token);
        setEditing(false);
      } else {
        setError('Failed to save. Try again.');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    }
    setSaving(false);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResumeName(file.name);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const addOffer = () => {
    if (newOffer.company && newOffer.package) {
      setFormData(prev => ({ ...prev, offers: [...prev.offers, { ...newOffer }] }));
      setNewOffer({ company: '', role: '', package: '' });
      setAddingOffer(false);
    }
  };

  const removeOffer = (index) => {
    setFormData(prev => ({ ...prev, offers: prev.offers.filter((_, i) => i !== index) }));
  };

  const getInitial = () => {
    return formData.name ? formData.name.charAt(0).toUpperCase() : 'S';
  };

  return (
    <div className="profile-page">
      <div className="profile-header-card">
        <div className="profile-avatar">{getInitial()}</div>
        <div className="profile-info">
          <h1>{formData.name}</h1>
          <p>{formData.branch} — Year {formData.year}</p>
          <p>{formData.college}</p>
        </div>
        {editing ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="edit-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              className="edit-btn"
              onClick={() => setEditing(false)}
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button className="edit-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {error ? (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', padding: '12px 16px', borderRadius: 8, fontSize: 14 }}>
          {error}
        </div>
      ) : null}

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Personal Details</h3>
          {editing ? (
            <div className="edit-form">
              <div className="edit-field">
                <label>Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="edit-field">
                <label>Email</label>
                <input name="email" value={formData.email} disabled style={{ background: '#F8FAFF', color: '#94A3B8' }} />
              </div>
              <div className="edit-field">
                <label>Branch</label>
                <select name="branch" value={formData.branch} onChange={handleChange}>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">Mechanical</option>
                  <option value="CE">Civil</option>
                </select>
              </div>
              <div className="edit-field">
                <label>Year</label>
                <select name="year" value={formData.year} onChange={handleChange}>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="edit-field">
                <label>College</label>
                <input name="college" value={formData.college} onChange={handleChange} />
              </div>
              <div className="edit-field">
                <label>CGPA</label>
                <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="e.g. 8.5" />
              </div>
            </div>
          ) : (
            <>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span>{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Branch</span>
                <span>{formData.branch}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Year</span>
                <span>Year {formData.year}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">CGPA</span>
                <span>{formData.cgpa || 'Not set'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">College</span>
                <span>{formData.college}</span>
              </div>
            </>
          )}
        </div>

        <div className="profile-card">
          <h3>Skills</h3>
          <div className="skills-list">
            {formData.skills.length === 0 && !editing ? (
              <p style={{ color: '#94A3B8', fontSize: 14 }}>No skills added yet. Click Edit Profile to add.</p>
            ) : (
              formData.skills.map(skill => (
                <span key={skill} className="skill-badge">
                  {skill}
                  {editing ? (
                    <button className="remove-skill" onClick={() => removeSkill(skill)}>×</button>
                  ) : null}
                </span>
              ))
            )}
          </div>
          {editing ? (
            <div className="add-skill">
              <input
                placeholder="Add a skill e.g. Java"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? addSkill() : null}
              />
              <button className="add-btn" onClick={addSkill}>Add</button>
            </div>
          ) : null}
        </div>

        <div className="profile-card">
          <h3>Resume</h3>
          <div className="resume-section">
            {resumeName ? (
              <div className="resume-uploaded">
                <span>📄 {resumeName}</span>
                <button
                  className="upload-btn"
                  onClick={() => document.getElementById('resume-input').click()}
                >
                  Change Resume
                </button>
              </div>
            ) : (
              <>
                <p>No resume uploaded yet</p>
                <button
                  className="upload-btn"
                  onClick={() => document.getElementById('resume-input').click()}
                >
                  📎 Upload Resume
                </button>
              </>
            )}
            <input
              id="resume-input"
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={handleResumeUpload}
            />
          </div>
        </div>

        <div className="profile-card">
          <h3>Placement Offers</h3>
          <div className="offers-list">
            {formData.offers.length === 0 && !addingOffer ? (
              <p style={{ color: '#94A3B8', fontSize: 14 }}>No offers added yet.</p>
            ) : (
              formData.offers.map((offer, index) => (
                <div key={index} className="offer-item">
                  <div>
                    <h4>{offer.company}</h4>
                    <p>{offer.role}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="package-badge">{offer.package}</span>
                    {editing ? (
                      <button className="remove-skill" onClick={() => removeOffer(index)}>×</button>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
          {addingOffer ? (
            <div className="add-offer">
              <input
                placeholder="Company name"
                value={newOffer.company}
                onChange={(e) => setNewOffer(prev => ({ ...prev, company: e.target.value }))}
              />
              <input
                placeholder="Role e.g. Software Engineer"
                value={newOffer.role}
                onChange={(e) => setNewOffer(prev => ({ ...prev, role: e.target.value }))}
              />
              <input
                placeholder="Package e.g. 7 LPA"
                value={newOffer.package}
                onChange={(e) => setNewOffer(prev => ({ ...prev, package: e.target.value }))}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="add-btn" onClick={addOffer}>Add Offer</button>
                <button className="cancel-btn" onClick={() => setAddingOffer(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="add-offer-btn" onClick={() => setAddingOffer(true)}>
              + Add Offer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;