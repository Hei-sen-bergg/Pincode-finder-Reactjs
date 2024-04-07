import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function Post() {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("pincode");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (searchType === "pincode" && !/^\d{6}$/.test(input)) {
      setError("Invalid PIN code. Please enter a 6-digit PIN code.");
      return;
    }

    try {
      let apiUrl = "";
      if (searchType === "pincode") {
        apiUrl = `https://api.postalpincode.in/pincode/${input}`;
      } else {
        apiUrl = `https://api.postalpincode.in/pincode/${input}`;
      }
      console.log(result.PostOffice)
      const response = await axios.get(apiUrl);
      if (response.data && response.data.length > 0) {
        setResult(response.data[0]);
      } else {
        setError("No data found");
        setResult(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setResult(null);
    }
  };

  return (
    <div className="container">
      <div className="choose">
        <p className="typeHeading">How would you like to search by ?</p>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="pincode">Pincode</option>
          <option value="location">Location</option>
        </select>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {result && (
        <div>
          {result && result.PostOffice.map((office) => (
            <div className="result" key={office.Name}>
              <h2>{office.Name}</h2>
              <p>{office.Pincode}</p>
              <p>District : {office.District}</p>
              <p>State : {office.State}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
