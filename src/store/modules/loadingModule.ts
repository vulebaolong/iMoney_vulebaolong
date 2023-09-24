import { Module, MutationTree, ActionTree } from "vuex";

// Định nghĩa kiểu cho state
interface LoadingState {
    loadingPage: boolean;
}

// Định nghĩa kiểu cho mutations
interface LoadingMutations extends MutationTree<LoadingState> {
    setLoadingPage(state: LoadingState, data: boolean): void;
}

// Định nghĩa kiểu cho actions
interface LoadingActions extends ActionTree<LoadingState, any> {}

const loadingState: LoadingState = {
    loadingPage: false,
};

const loadingMutations: LoadingMutations = {
    setLoadingPage(state, data) {
        state.loadingPage = data;
    },
};

const loadingActions: LoadingActions = {};

const loadingModule: Module<LoadingState, any> = {
    namespaced: true,
    state: loadingState,
    mutations: loadingMutations,
    actions: loadingActions,
};

export default loadingModule;
