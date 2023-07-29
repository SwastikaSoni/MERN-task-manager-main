import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then((response) => {
        console.log('Users:', response.data); // Log the users data fetched from the API
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    axios.get('/api/tasks')
      .then((response) => {
        console.log('Tasks:', response.data); // Log the tasks data fetched from the API
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md flex-grow"
        />

        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
      </div>

      {/* Task List */}
      <div>
        {searchedTasks.map((task) => (
          <div key={task._id} className="border border-gray-300 rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{task.description}</h2>
            <p className="text-gray-500">Assigned to: {task.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
