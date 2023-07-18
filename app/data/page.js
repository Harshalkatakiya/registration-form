'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/post');
        setData(response.data.data);
        console.log(data)
        setIsDataFetched(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isDataFetched ? (
        <table>
          <thead>
            <tr>
              <th>Full Name 1</th>
              <th>Email 1</th>
              <th>Phone Number 1</th>
              <th>Level 1</th>
              <th>Department 1</th>
              <th>Semester 1</th>
              <th>Enrollment 1</th>
              <th>Institute</th>
              <th>Event Type</th>
              <th>Group Event</th>
              {/* Add more column headings as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.full_name1}</td>
                <td>{item.email1}</td>
                <td>{item.phone_number1}</td>
                <td>{item.level1}</td>
                <td>{item.department1}</td>
                <td>{item.semester1}</td>
                <td>{item.enrollment1}</td>
                <td>{item.institute}</td>
                <td>{item.eventtype}</td>
                <td>{item.groupEvent}</td>
                {/* Add more table cells with item properties corresponding to column headings */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default page;
