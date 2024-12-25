import axios from "axios";
import { Data, Response } from "./components/types";
const key = 'Ntb7ulS5phjdxl1cvjDHbMhqQB2gD795DPpovtLfED8';
axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchData = async (query: string, page: number = 1): Promise<Data[]> => {
    const params = new URLSearchParams({
        query: query,
        per_page: '12',
        page: page.toString(),
    })
    const response = await axios.get<Response>(`/search/photos?client_id=${key}&${params}`)
    return response.data.results
}