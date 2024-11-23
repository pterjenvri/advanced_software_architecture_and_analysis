import { useEffect, useState } from "react";

interface Log {
  ID: string;
  StartTime: string;
  EndTime: string;
  ElapsedTime: bigint;
  Ack: string;
}

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch data from the /api/users API route
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/logs");
      const data = await response.json();
      setLogs(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <style jsx>{`
        .table {
          width: 100%;
        }
        .table th,
        .table td {
          text-align: center;
        }
        .table-bordered {
          border: 1px solid;
        }
        .table-bordered td {
          border: 1px solid;
        }
      `}</style>
      <h1>Log Data</h1>
      <ul>
        {logs.map((log) => (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Elapsed Time</th>
                <th>Ack</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr>
                  <td>{log.id}</td>
                  <td>{log.starttime}</td>
                  <td>{log.endtime}</td>
                  <td>{log.elapsedtime}</td>
                  <td>{log.ack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </ul>
    </div>
  );
}
