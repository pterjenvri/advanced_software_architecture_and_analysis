
import DatabaseService from "./databaseService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
      // Query to get all users from the 'users' table
      const result = await new DatabaseService().setup().query("SELECT 	l.id AS ID 	, to_char(TO_TIMESTAMP(l.message_sent::double precision / 1000), 'YYYY-MM-DD HH24:MI:SS.MS') AS StartTime 	, to_char(TO_TIMESTAMP(l.message_received::double precision / 1000), 'YYYY-MM-DD HH24:MI:SS.MS') AS EndTime 	, l.elapsed_time AS ElapsedTime 	, CASE WHEN l.elapsed_time IS NOT NULL THEN 'Success' ELSE 'Fail' END Ack FROM logs l ORDER BY message_sent");
      const users = result.rows;
  
      // Return the users data as a JSON response
      res.status(200).json(users);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the database connection
        res.statusCode = 500;
        res.end();
    }
  }