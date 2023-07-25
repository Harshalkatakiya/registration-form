import React, { useState, useEffect } from "react";
import "./App.css";
import BhavyaTable from "./components/BhavyaTable";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  //const baseURL = "http://localhost:8081/api/participates";
  const postData = JSON.stringify({
      "collection": "participates",
      "database": "avsar",
      "dataSource": "Cluster0"
  });
  var config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-ozyiu/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'D0toIWTaH4GzrkQPSDvTta5kimnTFJqpXZRalaj7RbnUlSMmUsJ6Kdbs4RgdMFsm',
    },
    data: postData
};
  useEffect(() => {
    // axios
    //   .get(baseURL)
    //   .then((response) => {
    //     setData(response.data);
    //     setIsDataFetched(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData(response.data);
        setIsDataFetched(true);
    })
    .catch(function (error) {
        console.log(error);
    });
  }, [config.url]);
  return (
    <>
      <div className="container">
        {isDataFetched === true ? (
          <BhavyaTable data={data}></BhavyaTable>
        ) : (
          <h1>Loading Data...</h1>
        )}
      </div>
    </>
  );
}

export default App;
