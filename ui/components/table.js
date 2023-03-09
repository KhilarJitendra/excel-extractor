import React, { useState, useEffect } from "react";
import styles from "./table.module.scss";

const TableExample = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("Started...");
    async function fetchData() {
      const res = await fetch("http://localhost:3001/data");
      const json = await res.json();
      console.log("actual data...", json);
      setData(json);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table class={styles.table}>
        <thead>
          <tr>
            <th>Story</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cell) => {
            return (
              <tr>
                <td data-label="Story">{cell.Story}</td>
                <td data-label="Owner">{cell.Owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableExample;
