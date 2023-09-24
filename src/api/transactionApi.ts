import axios from "axios";
import { I_transaction_req } from "../interfaces/transactionInterface";

export const transactionApi = {
    getListTransaction: () => {
        return axios.get(`/transaction`);
    },
    createTransaction: (transaction: I_transaction_req) => {
        return axios.post(`/transaction`, transaction);
    },
    deleteTransaction: (id: string) => {
        return axios.delete(`/transaction/${id}`);
    },
};
