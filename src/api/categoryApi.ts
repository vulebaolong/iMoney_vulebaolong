import axios from "axios";
import { I_Category_req } from "../interfaces/categoryInterface";

export const categoryApi = {
    getListCategory: () => {
        return axios.get(`/category`);
    },
    createCategory: (category: I_Category_req) => {
        return axios.post(`/category`, category);
    },
    deleteCategory: (id: string) => {
        return axios.delete(`/category/${id}`);
    },
};
