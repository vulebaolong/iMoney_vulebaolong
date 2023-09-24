import { I_Category_res } from "./categoryInterface";

export interface I_transaction_req {
    total: number;
    note: string;
    createDay: string;
    category_Id: string;
}

export interface I_transaction_res {
    total: number;
    note: string;
    createDay: string;
    location: string;
    withPerson: string;
    category_Id: I_Category_res;
    user_Id: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
