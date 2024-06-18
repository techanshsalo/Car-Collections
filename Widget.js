import React, { useState } from "react";
import styles from "../styles";

const sortCars = (cars, key, order) => {
  return [...cars].sort((a, b) => {
    if (order === "asc") {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

export default function Widget() {
  const [newCar, setNewCar] = useState({
    name: "",
    year: "",
    model: "",
    ratings: "",
  });
  const [oldCars, setOldCars] = useState([
    { name: "MUSTANG", year: "2010", model: "ECOBOOST", ratings: "5.0" },
    { name: "BMW", year: "2015", model: "I5", ratings: "4.9" },
    { name: "FIAT", year: "2012", model: "AVVENTURA", ratings: "4.2" },
  ]);
  const [newCars, setNewCars] = useState([]);
  const [sortKey, setSortKey] = useState({ oldCars: "year", newCars: "year" });
  const [sortOrder, setSortOrder] = useState({
    oldCars: "asc",
    newCars: "asc",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editSection, setEditSection] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const addOrModifyCar = () => {
    const year = parseInt(newCar.year, 10);
    if (isEditing) {
      if (editSection === "oldCars") {
        const updatedCars = [...oldCars];
        updatedCars[editIndex] = newCar;
        setOldCars(updatedCars);
      } else {
        const updatedCars = [...newCars];
        updatedCars[editIndex] = newCar;
        setNewCars(updatedCars);
      }
      setIsEditing(false);
      setEditIndex(null);
      setEditSection(null);
    } else {
      if (year < 2020) {
        setOldCars((prevCars) => [...prevCars, newCar]);
      } else {
        setNewCars((prevCars) => [...prevCars, newCar]);
      }
    }
    setNewCar({ name: "", year: "", model: "", ratings: "" });
  };

  const handleSortChange = (section, key) => {
    const order = sortOrder[section] === "asc" ? "desc" : "asc";
    setSortKey((prevState) => ({ ...prevState, [section]: key }));
    setSortOrder((prevState) => ({ ...prevState, [section]: order }));
  };

  const handleEdit = (section, index) => {
    const car = section === "oldCars" ? oldCars[index] : newCars[index];
    setNewCar(car);
    setIsEditing(true);
    setEditIndex(index);
    setEditSection(section);
  };

  const handleDelete = (section, index) => {
    if (section === "oldCars") {
      const updatedCars = oldCars.filter((_, i) => i !== index);
      setOldCars(updatedCars);
    } else {
      const updatedCars = newCars.filter((_, i) => i !== index);
      setNewCars(updatedCars);
    }
  };

  const sortedOldCars = sortCars(oldCars, sortKey.oldCars, sortOrder.oldCars);
  const sortedNewCars = sortCars(newCars, sortKey.newCars, sortOrder.newCars);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Car Collections</h1>
      </div>
      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{ fontWeight: "600" }}>Today's Date: June 12, 2024</p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Old Cars</h2>
          <hr style={styles.divider} />
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>Name</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("oldCars", "name")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Name</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Year</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("oldCars", "year")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Year</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Model</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("oldCars", "model")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Model</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Ratings</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("oldCars", "ratings")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Ratings</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedOldCars.map((car, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>{car.name}</td>
                    <td style={styles.tableCell}>{car.year}</td>
                    <td style={styles.tableCell}>{car.model}</td>
                    <td style={styles.tableCell}>{car.ratings}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.actionButton}
                        onClick={() => handleEdit("oldCars", index)}
                      >
                        Modify
                      </button>
                      <button
                        style={styles.actionButton}
                        onClick={() => handleDelete("oldCars", index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>New Cars</h2>
          <hr style={styles.divider} />
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Enter New Car Name"
              value={newCar.name}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="text"
              name="year"
              placeholder="Enter Car Year"
              value={newCar.year}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="text"
              name="model"
              placeholder="Enter New Car Model"
              value={newCar.model}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="text"
              name="ratings"
              placeholder="Enter Car Ratings"
              value={newCar.ratings}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} /> Can Modify
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} /> Can Delete
            </label>
          </div>
          <div style={styles.buttonGroup}>
            <button onClick={addOrModifyCar} style={styles.addButton}>
              {isEditing ? "Update Car" : "Add New Car"}
            </button>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>Name</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("newCars", "name")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Name</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Year</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("newCars", "year")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Year</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Model</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("newCars", "model")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Model</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Ratings</th>
                  <th style={styles.tableHeaderCell}>
                    <select
                      onChange={() => handleSortChange("newCars", "ratings")}
                      style={{ backgroundColor: "#3b82f6", color: "white" }}
                    >
                      <option>Sort By:</option>
                      <option>Ratings</option>
                    </select>
                  </th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedNewCars.map((car, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>{car.name}</td>
                    <td style={styles.tableCell}>{car.year}</td>
                    <td style={styles.tableCell}>{car.model}</td>
                    <td style={styles.tableCell}>{car.ratings}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.actionButton}
                        onClick={() => handleEdit("newCars", index)}
                      >
                        Modify
                      </button>
                      <button
                        style={styles.actionButton}
                        onClick={() => handleDelete("newCars", index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
