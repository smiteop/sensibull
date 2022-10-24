import { useEffect, useState } from "react";
import Axios from "axios";
import './App.css';
import DataTable from 'react-data-table-component';
import { First } from "./First";
export default function App() {
//   const columns =[
//     {name :'Symbol',
//   selector:row=>row.title,
// sortable:true,
// },
// {name : 'Name',
// selector:row=>row.sector,
// sortable:true,
// },
// {name : 'Sector',
// selector:row=>row.sector,
// sortable:true,
// },
// {name : 'ValidTill',
// selector:row=>row.sector,
// sortable:true,
// },
//   ]





  const [column, setColumn] = useState([]);
  const [rows, setRows] = useState([]);
  var count = 1;
  useEffect(() => {
    if (count === 1) {
      Axios.get("https://prototype.sbulltech.com/api/v2/instruments").then(
        (res) => {
          let response = res.data;
          response = response.split(",");
          let data = response.slice(3, response.length);
          // console.log(data);
          // data = [response[3].split("\n")[1], ...data];
          // console.log(data);
          let newData = [];
          for (let i = 0; i < data.length; i++) {
            if (i % 3 === 0 || i === 0) {
              newData.push(data[i].split("\n")[0]);
              newData.push(data[i].split("\n")[1]);
            } else {
              newData.push(data[i]);
              // console.log(newData);
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
          //  console.log(response);
          setColumn([...response.splice(0, 3), response[0].split("\n")[0]]);
          setRows(rowData);
          //  console.log(rowData)
          // console.log(setColumn)
          // console.log(response.splice(0,3))
 
        }
      );
      count = count + 1;
      <First/>
    
    }

  }, []);
 
  return (
   
      <table className="tab"> 
  
     {column && column.map((col) => <td key={col}>{col}</td>)}      
       {rows.map((r) => ( 
                <tr>
            {r.map((rItem) => ( 
           <td>{rItem} 
             {console.log(rItem)} 
  </td> 
           ))}
         </tr> 
       ))}
   </table> 

  );
}