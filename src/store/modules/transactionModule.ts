import { Module, MutationTree, ActionTree, Commit, Dispatch } from "vuex";
import { error, success } from "./../../helpers/messageHelper";
import { I_transaction_req, I_transaction_res } from "../../interfaces/transactionInterface";
import { transactionApi } from "../../api/transactionApi";

// Định nghĩa kiểu cho state
interface TransactionState {
    listTransaction: I_transaction_res[] | null;
    listFillterTransaction: I_transaction_res[] | null;
    categorySelect: string | null;
    total: number;
}

// Định nghĩa kiểu cho mutations
interface TransactionMutations extends MutationTree<TransactionState> {
    setListTransaction(state: TransactionState, transaction: I_transaction_res[]): void;
    fillterListTransaction(state: TransactionState, categoryId: string): void;
    logout(state: TransactionState): void;
}

// Định nghĩa kiểu cho actions
interface TransactionActions extends ActionTree<TransactionState, any> {
    getListTransaction(context: { commit: Commit }): void;
    createTransaction(context: { commit: Commit }, transaction: I_transaction_req): void;
    deleteTransaction(context: { state: TransactionState; commit: Commit; dispatch: Dispatch }, id: string): void;
}

const transactionState: TransactionState = {
    listTransaction: null,
    listFillterTransaction: null,
    categorySelect: null,
    total: 0,
};

const transactionMutations: TransactionMutations = {
    setListTransaction(state, transaction) {
        state.listTransaction = transaction;
        state.listFillterTransaction = transaction;

        let total = 0;
        state.listFillterTransaction.forEach((transaction) => (total += transaction.total));

        state.total = total;
    },
    fillterListTransaction(state, categoryId) {
        if (!state.listFillterTransaction) return;
        if (!state.listTransaction) return;

        state.categorySelect = categoryId;

        if (categoryId === "All transaction") {
            state.listFillterTransaction = state.listTransaction;

            let total = 0;
            state.listFillterTransaction.forEach((transaction) => (total += transaction.total));

            state.total = total;

            return;
        }
        state.listFillterTransaction = state.listTransaction?.filter((transaction) => {
            return transaction.category_Id._id === categoryId;
        });

        let total = 0;
        state.listFillterTransaction.forEach((transaction) => (total += transaction.total));

        state.total = total;
    },
    logout(state) {
        state.categorySelect = null;
        state.listFillterTransaction = null;
        state.categorySelect = null;
    },
};

const transactionActions: TransactionActions = {
    async getListTransaction({ commit }) {
        try {
            commit("loadingModule/setLoadingPage", true, { root: true });

            const { data } = await transactionApi.getListTransaction();

            console.log(data);

            commit("setListTransaction", data);
        } catch (err) {
            console.log(err);
        } finally {
            commit("loadingModule/setLoadingPage", false, { root: true });
        }
    },

    async createTransaction({}, transaction) {
        try {
            const { data } = await transactionApi.createTransaction(transaction);
            console.log(data);
            success("Create transaction success");
        } catch (err) {
            console.log(err);
            error("Create transaction faild");
        }
    },

    async deleteTransaction({ state, commit, dispatch }, id) {
        try {
            await transactionApi.deleteTransaction(id);

            success("Delete transaction success!");

            await dispatch("getListTransaction");

            commit("fillterListTransaction", state.categorySelect);
            return true;
        } catch (err) {
            error("Delete transaction failed");
            console.log(err);
            return false;
        }
    },
};

const transactionModule: Module<TransactionState, any> = {
    namespaced: true,
    state: transactionState,
    mutations: transactionMutations,
    actions: transactionActions,
};

export default transactionModule;
