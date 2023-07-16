'use client';
import React, { useState } from "react";
import InputRow from "./InputRow";
import axios from 'axios';

const page = () => {
  const [formData, setFormData] = useState({
    full_name1: "",
    email1: "",
    phone_number1: "",
    level1: "",
    department1: "",
    semester1: "",
    enrollment1: "",
    institute: "",
    eventtype: "",
    groupEvent: "",
  });
  const [typeofevent, setTypeOfEvent] = useState("solo");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/post', formData);
      if(response.status===200){
        alert(`Thank you for submitting the form!`);
        handleReset();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleReset = () => {
    setFormData({
      full_name1: "",
      email1: "",
      phone_number1: "",
      level1: "",
      department1: "",
      semester1: "",
      enrollment1: "",
      institute: "",
      eventtype: "",
      groupEvent: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "eventtype" && value == "solo") {
      setTypeOfEvent("solo")
    }
    if (name == "eventtype" && value == "group") {
      setTypeOfEvent("group")
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const renderInputRows = () => {
    const { groupEvent } = formData;
    if (!groupEvent) {
      return null;
    }
    const participantCount = parseInt(groupEvent.split(" ").pop());
    //console.log(participantCount)
    const inputRows = [];
    // for (let i = 1; i <= participantCount; i++) {
    //   inputRows.push(
    //     <InputRow
    //       key={i}
    //       formData={formData}
    //       participantIndex={i}
    //       handleChange={handleChange}
    //     />
    //   );
    // }
    let i = 1
    do {
      inputRows.push(
        <InputRow
          key={i}
          formData={formData}
          participantIndex={i}
          handleChange={handleChange}
        />
      );
      i++
    } while (i <= participantCount)
    return inputRows;
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleRadioButtonChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container mx-auto min-h-[1000px]">
            <div>
              <div className="bg-white text-black  shadow-lg p-4 px-4 md:p-8 mb-2">
                <div className="text-4xl font-bold">
                  Atmiya Avsar Group Event Registration
                </div>
                <div className="text-md font-medium mt-3">
                  Atmiya Avsar Art & Cultural Fest Event Registration
                </div>
                <hr />
              </div>
              <div className="bg-white text-black  shadow-lg p-3 px-3 md:p-6 mb-6">
                Read / Download Event Rules -
                <a href="/AtmiyaAvsarRulesEnglish.pdf" style={{ color: "blue" }}> English</a> |
                <a href="/AtmiyaAvsarRulesGujarati.pdf" style={{ color: "blue" }}> Gujarati</a>
                <div className="text-sm mb-4 mt-2">
                  <input
                  id="default-radio-1"
                    type="radio"
                    name="concent"
                    value="yes"
                    className="w-10"
                    checked={isChecked}
                    onChange={handleRadioButtonChange}
                  />{" "}
                  <label htmlFor="default-radio-1" className="text-lg font-normal">
                    I have read the above rules and regulation of the events and I agree to the terms above
                  </label>
                </div>
                <hr />
                {isChecked ? (<div className="grid grid-cols-3 gap-4 mb-2 mt-2">
                  <div>
                    <select
                      className="h-10 border mt-1  px-4 w-full bg-white text-black"
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                    >
                      <optgroup label="Select Your Institute">
                        <option value="">Select Your Institute</option>
                        <option value="Atmiya University">
                          Atmiya University
                        </option>
                        <option value="Shree M. & N. Virani Science College">
                          Shree M. & N. Virani Science College
                        </option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <select
                      className="h-10 border mt-1  px-4 w-full bg-white text-black"
                      name="eventtype"
                      value={formData.eventtype}
                      onChange={handleChange}
                    >
                      <optgroup label="Select Event Types">
                        <option value="">Select Event Types</option>
                        <option value="solo">Solo Events</option>
                        <option value="group">Group Events</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <select
                      className="h-10 border mt-1  px-4 w-full bg-white text-black"
                      name="groupEvent"
                      value={formData.groupEvent}
                      onChange={handleChange}
                    >
                      {
                        typeofevent == "solo" ? (<optgroup label="Select Group Event you want to participate">
                          <option value="">Select Solo Event</option>
                          <option value="Debet">Debet</option>
                          <option value="Elocution">Elocution</option>
                          <option value="Gazal-Shayari Kaavya writing">Gazal-Shayari Kaavya writing</option>
                          <option value="Pad-purti">Pad-purti</option>
                          <option value="Quiz">Quiz</option>
                          <option value="Rangoli">Rangoli</option>
                          <option value="Painting">Painting</option>
                          <option value="Poster-making">Poster-making</option>
                          <option value="Collage">Collage</option>
                          <option value="Cartooning">Cartooning</option>
                          <option value="Mehndi">Mehndi</option>
                          <option value="Clay Modeling">Clay Modeling</option>
                          <option value="Sarjanatmak Karigiri">Sarjanatmak Karigiri</option>
                          <option value="Hastakala Hobby">Hastakala Hobby</option>
                          <option value="Spot Photography">Spot Photography</option>
                          <option value="Shastriya Kanthya Sangeet (Hindustani / Karnatak)">Shastriya Kanthya Sangeet (Hindustani / Karnatak)</option>
                          <option value="Shastriya Vadhya Sangeet (Swar Vadya)">Shastriya Vadhya Sangeet (Swar Vadya)</option>
                          <option value="Shastriya Vadhya Sangeet (Tal Vadya)">Shastriya Vadhya Sangeet (Tal Vadya)</option>
                          <option value="Halvu Kanthya Sangeet">Halvu Kanthya Sangeet</option>
                          <option value="Lokgeet">Lokgeet</option>
                          <option value="Bhajan">Bhajan/Prayer</option>
                          <option value="Duha Chhand">Duha Chhand</option>
                          <option value="Western Vocal Solo">Western Vocal Solo</option>
                          <option value="Mono Acting">Mono Acting</option>
                          <option value="Mimicry">Mimicry</option>
                          <option value="Classical Dance">Classical Dance</option>
                          <option value="Story - Telling">Story - Telling</option>
                        </optgroup>) : (<optgroup label="Select Group Event you want to participate">
                          <option value="">Select Group Event</option>
                          <option value="Samuh Geet --Minimum 3 - Max Participant 6">
                            Samuh Geet --Minimum 3 - Max Participant 6
                          </option>
                          <option value="Western Vocal Group-- Minimum 3 - Max Participant 6">
                            Western Vocal Group-- Minimum 3 - Max Participant 6
                          </option>
                          <option value="Mime -- Minimum 3 -Max Participant 6">
                            Mime -- Minimum 3 -Max Participant 6
                          </option>
                          <option value="Skit -- Minimum 3 -Max Participant 6">
                            Skit -- Minimum 3 -Max Participant 6
                          </option>
                          <option value="Folk Dance -- Minimum 8-Max Participant 12">
                            Folk Dance -- Minimum 8-Max Participant 12
                          </option>
                          <option value="Pracheen Raas-- Minimum 8-Max Participant 12">
                            Pracheen Raas-- Minimum 8-Max Participant 12
                          </option>
                          <option value="Installation -- Max Participant 4">
                            Installation -- Max Participant 4
                          </option>
                        </optgroup>)
                      }
                    </select>
                  </div>
                </div>) : <></>}
                <hr className="mt-3 mb-3" />
                {renderInputRows()}
                <hr className="mt-3" />
                {/* Add more students here */}
                <div className="text-right mt-5">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mr-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 "
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;