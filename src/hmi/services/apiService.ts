import axios, { AxiosResponse } from "axios";

export const crash = async (): Promise<AxiosResponse<string>> => {
  return axios.post<string>(`http://localhost:3000/api/crash`);
}

export const postMq = async (
    message: Message
  ): Promise<AxiosResponse<Message>> => {
    return axios.post<Message>(`http://localhost:3000/api/mqhandler`, message);
  }
    