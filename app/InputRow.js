import React from "react";

const InputRow = ({ participantIndex, handleChange }) => {
    return (
        <div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-7 mb-1">
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`full_name${participantIndex}`}>Full Name</label>) : (<></>)}
                    <input
                        type="text"
                        name={`full_name${participantIndex}`}
                        id={`full_name${participantIndex}`}
                        className="h-10 border mt-1  px-4 w-full bg-white"
                        placeholder="Full Name"
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    />
                </div>
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`email${participantIndex}`}>Email Address</label>) : (<></>)}
                    <input
                        type="text"
                        name={`email${participantIndex}`}
                        id={`email${participantIndex}`}
                        className="h-10 border mt-1  px-4 w-full bg-white"
                        placeholder="email@domain.com"
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    />
                </div>
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`phone_number${participantIndex}`}>
                        Phone Number
                    </label>) : (<></>)}
                    <input
                        type="text"
                        name={`phone_number${participantIndex}`}
                        id={`phone_number${participantIndex}`}
                        className="h-10 border mt-1  px-4 w-full bg-white"
                        placeholder="Phone Number"
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    />
                </div>
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`level${participantIndex}`}>Level</label>) : (<></>)}
                    <select
                        className="h-10 border mt-1  px-1 w-full bg-white"
                        name={`level${participantIndex}`}
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    >
                        <optgroup label="Select Your Level">
                            <option value="">Select Your Education</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="Ph.D.">Ph.D.</option>
                        </optgroup>
                    </select>
                </div>
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`department${participantIndex}`}>Department</label>) : (<></>)}
                    <select
                        className="h-10 border mt-1  px-1 w-full bg-white"
                        name={`department${participantIndex}`}
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    >
                        <optgroup label="Select Your Department">
                            <option value="">Select Your Department</option>
                            <option>Virani B.Sc. Microbiology</option>
                            <option>Virani B.Sc. Biochemistry</option>
                            <option>Virani B.Sc. Mathematics</option>
                            <option>Virani B.Sc. Chemistry</option>
                            <option>B.Tech - Computer Engineering</option>
                            <option>B.Tech - Civil Engineering</option>
                            <option>B.Tech - Electronics & Communication Engineering</option>
                            <option>B.Tech - Information Technology</option>
                            <option>B.Tech - Mechanical Engineering</option>
                            <option>B.Tech - Automation & Robotics</option>
                            <option>B.Tech - Artificial Intelligence and Data Science</option>
                            <option>B.Tech - Electrical Engineering</option>
                            <option>M.Tech - Civil Engineering(Transportation)</option>
                            <option>M.Tech - Computer Engineering(Software Engineering)</option>
                            <option>M.Tech - Electrical Engineering(PEED)</option>
                            <option>M.Tech - Mechanical Engineering(CAD/CAM, Production)</option>
                            <option>BBA - FOBC</option>
                            <option>BBA (Honors) - FOBC</option>
                            <option>BBA (Enterpreneurship & family Business) - FOBC</option>
                            <option>B.Com - FOBC</option>
                            <option>B.Com (Logistics) - FOBC</option>
                            <option>B.Sc. Biotechnology - FOS</option>
                            <option>AU B.Sc. Physics - FOS</option>
                            <option>AU B.Sc. Industrial Chemistry - FOS</option>
                            <option>AU B.Sc. Information Technology - FOS</option>
                            <option>AU BCA - FOS</option>
                            <option>AU B.Sc. Mathematics - FOS</option>
                            <option>AU B.Sc. Microbiology - FOS</option>
                            <option>AU B.Sc. Chemistry - FOS</option>
                            <option>AU M.Sc. Biotechnology - FOS</option>
                            <option>AU M.Sc. Chemistry – Organic / Analytical - FOS</option>
                            <option>AU M.Sc. Industrial Chemistry - FOS</option>
                            <option>AU M.Sc. Mathematics - FOS</option>
                            <option>AU M.Sc. Microbiology - FOS</option>
                            <option>AU M.Sc. Information Technology - FOS</option>
                            <option>AU MCA - FOS</option>
                            <option>AU MLT - PG Diploma - FOS</option>
                            <option>B.Pharm - FOHS</option>
                            <option>M.Pharm - Pharmaceutics - FOHS</option>
                            <option>B.A. English - FOHSS</option>
                            <option>Automobile Engineering - SODS</option>
                            <option>Civil Engineering - SODS</option>
                            <option>Computer Engineering - SODS</option>
                            <option>Mechanical Engineering - SODS</option>
                            <option>Electrical Engineering - SODS</option>
                            <option>M. Com -FOBC</option>
                            <option>IMBA</option>
                            <option>B.A. - English/Psychology/Economics</option>
                            <option>Other</option>
                        </optgroup>
                    </select>
                </div>
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`semester${participantIndex}`}>Semester</label>) : (<></>)}
                    <select
                        className="h-10 border mt-1  px-1 w-full bg-white"
                        name={`semester${participantIndex}`}
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    >
                        <optgroup label="Select Your Semester">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </optgroup>
                    </select>
                </div>
                <div className="col-span-1">
                    {participantIndex == 1 ? (<label htmlFor={`enrollment${participantIndex}`}>Enrollment</label>) : (<></>)}
                    <input
                        type="text"
                        name={`enrollment${participantIndex}`}
                        id={`enrollment${participantIndex}`}
                        className="h-10 border mt-1  px-4 w-full bg-white"
                        placeholder="Enrollment"
                        onChange={(e) => handleChange(e, participantIndex)}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default InputRow;