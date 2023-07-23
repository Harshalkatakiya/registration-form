'use client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import PropTypes from 'prop-types';
import "bootstrap-icons/font/bootstrap-icons.css";


const page = () => {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/post');
        setData(response.data.data);
        //console.log(response.data.data)
        setIsDataFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const csvData = data.map(item => ({
    "Registration ID": item.registrationID,
    "Full Name 1": item.full_name1,
    "Email 1": item.email1,
    "Phone Number 1": item.phone_number1,
    "Level 1": item.level1,
    "Department 1": item.department1,
    "Semester 1": item.semester1,
    "Enrollment 1 ": item.enrollment1,
    "Event Type": item.eventtype,
    "Event Name": item.eventName,
    "Group Event": item.groupEvent,
    "Institute 1": item.institute1,
    "Institute 2": item.institute2,
    "Institute 3": item.institute3,
    "Institute 4": item.institute4,
    "Institute 5": item.institute5,
    "Institute 6": item.institute6,
    "Full Name 2": item.full_name2,
    "Full Name 3": item.full_name3,
    "Full Name 4": item.full_name4,
    "Full Name 5": item.full_name5,
    "Full Name 6": item.full_name6,
    "Phone Number 2": item.phone_number2,
    "Phone Number 3": item.phone_number3,
    "Phone Number 4": item.phone_number4,
    "Phone Number 5": item.phone_number5,
    "Phone Number 6": item.phone_number6,
    "Email 2": item.email2,
    "Email 3": item.email3,
    "Email 4": item.email4,
    "Email 5": item.email5,
    "Email 6": item.email6,
    "Level 2": item.level2,
    "Level 3": item.level3,
    "Level 4": item.level4,
    "Level 5": item.level5,
    "Level 6": item.level6,
    "Department 2": item.department2,
    "Department 3": item.department3,
    "Department 4": item.department4,
    "Department 5": item.department5,
    "Department 6": item.department6,
    "Semester 2": item.semester2,
    "Semester 3": item.semester3,
    "Semester 4": item.semester4,
    "Semester 5": item.semester5,
    "Semester 6": item.semester6,
    "Enrollment 2": item.enrollment2,
    "Enrollment 3": item.enrollment3,
    "Enrollment 4": item.enrollment4,
    "Enrollment 5": item.enrollment5,
    "Enrollment 6": item.enrollment6,

  }));
  const [user, setUser] = useState({
    email: "", password: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  useEffect(() => {
    // Filter data based on search query
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  const submitUser = (e) => {
    e.preventDefault();
    if (user.email === '' && user.password === '') {
      //if (user.email === 'imbuesoft@gmail.com' && user.password === 'PGAdmin@') {
      setLoggedIn(true);
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
  return (
    <> {loggedIn ? <div className="container p-1">
      {isDataFetched ? (<>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search anything..."
            className="w-96 px-4 py-2 m-auto border-2 border-black"
          />
        </div>
        <div className="flex items-center mt-2">
          <CSVLink data={csvData} filename="data.csv" className="flex-col ms-10">
            <button className="px-4 py-2 bg-green-500 text-white rounded m-auto">Export CSV <i className="bi bi-filetype-csv"></i></button>
          </CSVLink>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded m-auto ms-5"
            onClick={() => window.print()}
          >
            Print&nbsp;&nbsp;<i className="bi bi-printer-fill"></i>
          </button>
        </div>
        <table className="w-full bg-white border-2 border-gray-500 mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Registration ID</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Full Name 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Email 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Phone Number 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Level 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Department 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Semester 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Enrollment 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Event Type</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Event Name</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Group Event</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Institute 1</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Institute 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Institute 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Institute 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Institute 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Institute 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Full Name 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Full Name 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Full Name 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Full Name 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Full Name 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Phone Number 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Phone Number 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Phone Number 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Phone Number 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Phone Number 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Email 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Email 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Email 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Email 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Email 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Level 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Level 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Level 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Level 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Level 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Department 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Department 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Department 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Department 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Department 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Semester 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Semester 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Semester 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Semester 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Semester 6</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Enrollment 2</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Enrollment 3</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Enrollment 4</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Enrollment 5</th>
              <th className="px-4 py-2 border-2 border-gray-500 font-bold">Enrollment 6</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-2 border-gray-500">{item.registrationID}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.full_name1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.email1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.phone_number1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.level1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.department1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.semester1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.enrollment1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.eventtype}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.eventName}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.groupEvent}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.institute1}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.institute2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.institute3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.institute4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.institute5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.institute6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.full_name2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.full_name3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.full_name4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.full_name5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.full_name6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.phone_number2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.phone_number3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.phone_number4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.phone_number5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.phone_number6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.email2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.email3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.email4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.email5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.email6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.level2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.level3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.level4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.level5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.level6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.department2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.department3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.department4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.department5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.department6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.semester2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.semester3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.semester4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.semester5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.semester6}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.enrollment2}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.enrollment3}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.enrollment4}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.enrollment5}</td>
                <td className="px-4 py-2 border-2 border-gray-500">{item.enrollment6}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>) : (
        <p>Loading data...</p>
      )}
    </div> : <>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your Account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="false"
                  required
                  value={user.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="false"
                  required
                  value={user.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={submitUser}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Go to HomePage
            </Link>
          </p>
        </div>
      </div></>}
    </>
  )
}

export default page;