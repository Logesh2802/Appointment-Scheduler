<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

const ManageAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    date: '',
    start_time: '',
    end_time: '',
    is_booked: '',
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to modify page size

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  // Format date to 'YYYY-MM-DD' when receiving from the API
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/availabilities', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // Format the date for each availability before setting it in state
        const formattedData = data.map(avail => ({
          ...avail,
          date: formatDate(avail.date),
        }));
        setAvailabilities(formattedData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleCreate = () => {
    fetch('http://127.0.0.1:8000/api/admin/availabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(newAvailability),
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          const formattedData = {
            ...data,
            date: formatDate(data.date), // 👈 format the date before setting state
          };
          setAvailabilities([...availabilities, formattedData]);
          setNewAvailability({ date: '', start_time: '', end_time: '', is_booked: '' });
          setMessage('Availability added successfully!');
        }
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    fetch(`http://127.0.0.1:8000/api/admin/availabilities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(editing),
    })
      .then(res => res.json())
      .then(data => {
        setEditing(null);
        setMessage('Availability updated successfully!');
        // Refetch list and format the dates
        fetch('http://127.0.0.1:8000/api/admin/availabilities', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            const formattedData = data.map(avail => ({
              ...avail,
              date: formatDate(avail.date),
            }));
            setAvailabilities(formattedData);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/admin/availabilities/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then(() => {
        const filteredAvailabilities = availabilities.filter((avail) => avail.id !== id);
        setAvailabilities(filteredAvailabilities);
        setMessage('Availability deleted successfully.');
      })
      .catch(err => console.error(err));
  };

  // Get current page data for the table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = availabilities.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid justify-content-between">
          <span className="navbar-brand fw-bold fs-4">Admin Dashboard</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div className="container mt-5">
        <h3 className="text-center mb-4 text-primary">Manage Availability</h3>

        {/* Success Message */}
        {message && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        {/* New Availability Form */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Availability</h5>

            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="date">Select Date</label>
              <input
                type="date"
                className="form-control mb-2"
                value={newAvailability.date}
                onChange={(e) => setNewAvailability({ ...newAvailability, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="start_time">Select Start Time</label>
              <input
                type="time"
                className="form-control mb-2"
                value={newAvailability.start_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, start_time: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="end_time">Select End Time</label>
              <input
                type="time"
                className="form-control mb-2"
                value={newAvailability.end_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, end_time: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="is_booked">Select Status</label>
              <select
                className="form-control mb-2"
                value={newAvailability.is_booked}
                onChange={(e) => setNewAvailability({ ...newAvailability, is_booked: e.target.value })}
              >
                <option value="0">Available</option>
                <option value="1">Booked</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Availability
            </button>
          </div>
        </div>

        {/* Availability Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((avail) => (
                  <tr key={avail.id}>
                    <td>{avail.date}</td>
                    <td>{avail.start_time}</td>
                    <td>{avail.end_time}</td>
                    <td>{avail.is_booked ? 'Booked' : 'Available'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => setEditing(avail)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          if (window.confirm('Delete this availability?')) {
                            handleDelete(avail.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No availability found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(availabilities.length / itemsPerPage) }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Edit Availability */}
        {editing && (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Edit Availability</h5>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="date">Select Date</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                />
              </div>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="start_time">Select Start Time</label>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={editing.start_time}
                  onChange={(e) => setEditing({ ...editing, start_time: e.target.value })}
                />
              </div>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="end_time">Select End Time</label>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={editing.end_time}
                  onChange={(e) => setEditing({ ...editing, end_time: e.target.value })}
                />
              </div>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="is_booked">Select Status</label>
                <select
                  className="form-control mb-2"
                  value={editing.is_booked ? '1' : '0'}
                  onChange={(e) => setEditing({ ...editing, is_booked: e.target.value === '1' })}
                >
                  <option value="0">Available</option>
                  <option value="1">Booked</option>
                </select>
              </div>
              <button className="btn btn-warning" onClick={() => handleEdit(editing.id)}>
                Save Changes
              </button>
              <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-2 mt-auto">
        <small>© {new Date().getFullYear()} Appointment Scheduler Admin</small>
      </footer>
    </div>
  );
};

export default ManageAvailability;
=======
import React, { useState, useEffect } from 'react';

const ManageAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    date: '',
    start_time: '',
    end_time: '',
    is_booked: '',
  });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to modify page size

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  // Format date to 'YYYY-MM-DD' when receiving from the API
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/availabilities', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        // Format the date for each availability before setting it in state
        const formattedData = data.map(avail => ({
          ...avail,
          date: formatDate(avail.date),
        }));
        setAvailabilities(formattedData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleCreate = () => {
    fetch('http://127.0.0.1:8000/api/admin/availabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(newAvailability),
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          const formattedData = {
            ...data,
            date: formatDate(data.date), // 👈 format the date before setting state
          };
          setAvailabilities([...availabilities, formattedData]);
          setNewAvailability({ date: '', start_time: '', end_time: '', is_booked: '' });
          setMessage('Availability added successfully!');
        }
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    fetch(`http://127.0.0.1:8000/api/admin/availabilities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(editing),
    })
      .then(res => res.json())
      .then(data => {
        setEditing(null);
        setMessage('Availability updated successfully!');
        // Refetch list and format the dates
        fetch('http://127.0.0.1:8000/api/admin/availabilities', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            const formattedData = data.map(avail => ({
              ...avail,
              date: formatDate(avail.date),
            }));
            setAvailabilities(formattedData);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/admin/availabilities/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then(() => {
        const filteredAvailabilities = availabilities.filter((avail) => avail.id !== id);
        setAvailabilities(filteredAvailabilities);
        setMessage('Availability deleted successfully.');
      })
      .catch(err => console.error(err));
  };

  // Get current page data for the table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = availabilities.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid justify-content-between">
          <span className="navbar-brand fw-bold fs-4">Admin Dashboard</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div className="container mt-5">
        <h3 className="text-center mb-4 text-primary">Manage Availability</h3>

        {/* Success Message */}
        {message && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        {/* New Availability Form */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Availability</h5>

            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="date">Select Date</label>
              <input
                type="date"
                className="form-control mb-2"
                value={newAvailability.date}
                onChange={(e) => setNewAvailability({ ...newAvailability, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="start_time">Select Start Time</label>
              <input
                type="time"
                className="form-control mb-2"
                value={newAvailability.start_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, start_time: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="end_time">Select End Time</label>
              <input
                type="time"
                className="form-control mb-2"
                value={newAvailability.end_time}
                onChange={(e) => setNewAvailability({ ...newAvailability, end_time: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-2 text-start">
              <label className="mb-2" htmlFor="is_booked">Select Status</label>
              <select
                className="form-control mb-2"
                value={newAvailability.is_booked}
                onChange={(e) => setNewAvailability({ ...newAvailability, is_booked: e.target.value })}
              >
                <option value="0">Available</option>
                <option value="1">Booked</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create Availability
            </button>
          </div>
        </div>

        {/* Availability Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((avail) => (
                  <tr key={avail.id}>
                    <td>{avail.date}</td>
                    <td>{avail.start_time}</td>
                    <td>{avail.end_time}</td>
                    <td>{avail.is_booked ? 'Booked' : 'Available'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => setEditing(avail)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          if (window.confirm('Delete this availability?')) {
                            handleDelete(avail.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No availability found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(availabilities.length / itemsPerPage) }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Edit Availability */}
        {editing && (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Edit Availability</h5>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="date">Select Date</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                />
              </div>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="start_time">Select Start Time</label>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={editing.start_time}
                  onChange={(e) => setEditing({ ...editing, start_time: e.target.value })}
                />
              </div>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="end_time">Select End Time</label>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={editing.end_time}
                  onChange={(e) => setEditing({ ...editing, end_time: e.target.value })}
                />
              </div>
              <div className="form-group mb-2 text-start">
                <label className="mb-2" htmlFor="is_booked">Select Status</label>
                <select
                  className="form-control mb-2"
                  value={editing.is_booked ? '1' : '0'}
                  onChange={(e) => setEditing({ ...editing, is_booked: e.target.value === '1' })}
                >
                  <option value="0">Available</option>
                  <option value="1">Booked</option>
                </select>
              </div>
              <button className="btn btn-warning" onClick={() => handleEdit(editing.id)}>
                Save Changes
              </button>
              <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-2 mt-auto">
        <small>© {new Date().getFullYear()} Appointment Scheduler Admin</small>
      </footer>
    </div>
  );
};

export default ManageAvailability;
>>>>>>> 18fc00155739646002e3b9450692c8122992d2a7
