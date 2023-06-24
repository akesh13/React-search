import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Image, Badge, Input, Row, Col } from "antd";
import "./Home.css";

const Home = () => {
  // initializing state for storing data from the api
  const [apiData, setApiData] = useState([]);

  // initializing state for storing data from the input(changeHandler)
  const [search, setSearch] = useState("");

  // function to handle the changing state in the input
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  // fetching the API
  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get("https://reqres.in/api/users?page=2");
      // storing the response data to apiData
      setApiData(res.data.data);
    };
    apiCall();
  }, []);
  return (
    <div>
      {/* using row from ant-design to make it responsive */}
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={8}>
          {/* creating the input tag to get the user input data */}
          <Input
            className="input"
            onChange={changeHandler}
            type="text"
            placeholder="Enter a name to search"
          />
        </Col>
      </Row>

      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {apiData
          .filter((data) => data.first_name.toLowerCase().includes(search)) //  performing logic for the search
          .map(
            (
              data // mapping the data stored in the state
            ) => (
              <Col className="card_parent" key={data.id}>
                <Badge className="badge" color="pink" count={data.id}>
                  <div className="card">
                    <Image
                    //   preview={false}
                      className="image"
                      src={data.avatar}
                    />
                    <p>{data.first_name}</p>
                  </div>
                </Badge>
              </Col>
            )
          )}
      </Row>
    </div>
  );
};

export default Home;
