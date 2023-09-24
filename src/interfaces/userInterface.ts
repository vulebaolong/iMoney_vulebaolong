export interface I_register_req {
    name: string;
    email: string;
    password: string;
}

export interface I_login_req {
    email: string;
    password: string;
}

export interface I_login_res {
    _id: string
    name: string
    email: string
    type: string
    createdAt: string
    updatedAt: string
    __v: number
    token: string
  }
