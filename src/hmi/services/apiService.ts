import axios, { AxiosResponse } from "axios";

export const postMq = async (
    message: Message
  ): Promise<AxiosResponse<Message>> => {
    return axios.post<Message>(`http://localhost:3000/api/mqhandler`, message);
  }
    