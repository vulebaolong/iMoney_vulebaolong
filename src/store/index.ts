import { createStore } from "vuex";
import userModule from "./modules/userModule";
import categoryModule from "./modules/categoryModule";
import transactionModule from "./modules/transactionModule";
import loadingModule from "./modules/loadingModule";

export default createStore({
    modules: {
        userModule,
        categoryModule,
        transactionModule,
        loadingModule,
    },
});
