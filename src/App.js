import React, { useState ,useEffect} from "react";
import "./App.css";
import Table from "./components/table/Table";
import { Users } from "./components/users/users";

function App() {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("");

  const keys = ["first_name", "last_name", "email"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const filter = (data) => {
    return data.filter((item) =>
      item.gender.includes(gender)
    );
  };


  const handleGenderFilterChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="App">
      <div className="header">
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="filterContainer">
          <div className="filterText">Filter By Gender: </div>
          <select className="dropdown" value={gender} onChange={handleGenderFilterChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        </div>
      </div>
      <Table data={search(filter(Users))} />
    </div>
  );
}

export default App;