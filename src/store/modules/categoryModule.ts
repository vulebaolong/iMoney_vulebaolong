import { Module, MutationTree, ActionTree, Commit, Dispatch } from "vuex";
import { I_Category_req, I_Category_res } from "../../interfaces/categoryInterface";
import { categoryApi } from "../../api/categoryApi";
import { error, success } from "../../helpers/messageHelper";

// Định nghĩa kiểu cho state
interface CategoryState {
    listCategory: I_Category_res[] | null;
}

// Định nghĩa kiểu cho mutations
interface CategoryMutations extends MutationTree<CategoryState> {
    setListCategory(state: CategoryState, data: I_Category_res[]): void;
    logout(state: CategoryState): void;
}

// Định nghĩa kiểu cho actions
interface CategoryActions extends ActionTree<CategoryState, any> {
    getListCategory(context: { commit: Commit }): void;
    createCategory(context: { dispatch: Dispatch }, category: I_Category_req): void;
    deleteCategory(context: { dispatch: Dispatch }, id: string): void;
}

const categoryState: CategoryState = {
    listCategory: null,
};

const categoryMutations: CategoryMutations = {
    setListCategory(state, data) {
        state.listCategory = data;
    },
    logout(state) {
        state.listCategory = null;
    },
};

const categoryActions: CategoryActions = {
    async getListCategory({ commit }) {
        try {
            commit("loadingModule/setLoadingPage", true, { root: true });

            const { data } = await categoryApi.getListCategory();

            commit("setListCategory", data);
        } catch (err) {
            console.log(err);
        } finally {
            commit("loadingModule/setLoadingPage", false, { root: true });
        }
    },

    async createCategory({ dispatch }, category) {
        try {
            await categoryApi.createCategory(category);

            success("Add new category success!");

            dispatch("getListCategory");

            return true;
        } catch (err) {
            error("Add category failed");
            console.log(err);
            return false;
        }
    },

    async deleteCategory({ dispatch }, id) {
        try {
            await categoryApi.deleteCategory(id);

            success("Delete category success!");

            dispatch("getListCategory");

            return true;
        } catch (err) {
            error("Delete category failed");
            console.log(err);
            return false;
        }
    },
};

const categoryGetters = {
    categoryIntransaction(state: CategoryState) {
        if (state.listCategory !== null) {
            const modifiedList = [...state.listCategory]; // Tạo một bản sao của listCategory để thay đổi

            modifiedList.unshift({
                _id: "All transaction",
                __v: 0,
                color: "#1668dc",
                createdAt: "",
                title: "All transaction",
                updatedAt: "",
                user_Id: "",
            });

            return modifiedList; // Trả về giá trị đã thay đổi
        }
    },
};

const categoryModule: Module<CategoryState, any> = {
    namespaced: true,
    state: categoryState,
    mutations: categoryMutations,
    actions: categoryActions,
    getters: categoryGetters,
};

export default categoryModule;
