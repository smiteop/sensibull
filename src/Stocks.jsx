
import { useEffect, useState } from "react";
import Axios from "axios";
export default function Stocks() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  var count = 1;
  useEffect(() => {
    if (count === 1) {
      Axios.get("https://prototype.sbulltech.com/api/v2/instruments").then(
        (res) => {
          let response = res.data;
          response = response.split(",");
          let data = response.slice(3, response.length);
          // data = [response[3].split("\n")[1], ...data];
          // console.log(data);
          let newData = [];
          for (let i = 0; i < data.length; i++) {
            if (i % 3 === 0 || i === 0) {
              newData.push(data[i].split("\n")[0]);
              newData.push(data[i].split("\n")[1]);
            } else {
              newData.push(data[i]);
            }
          }
          data = newData.slice(1, newData.length);
          var rowData = [];
          var row = [];
          for (let i = 0; i < data.length; i++) {
            row.push(data[i]);
            if (row.length === 4) {
              rowData.push(row);
              row = [];
            }
          }
          console.log(response);
          setColumns([...response.splice(0, 3), response[0].split("\n")[0]]);
          setRows(rowData);
        }
      );
      count = count + 1;
    }
  }, []);
  return (
    <table>
      {console.log(columns)}
      {columns && columns.map((col) => <td key={col}>{col}</td>)}
      {rows.map((r) => (
        <tr>
          {r.map((rItem) => (
            <td>{rItem}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

