import { Module, MutationTree, ActionTree, Commit } from "vuex";
import { userApi } from "./../../api/userApi";
import router from "./../../router/index";
import { I_login_req, I_login_res } from "../../interfaces/userInterface";
import { lcStorage } from "../../helpers/lcStorage";
import { TOKEN, USER_LOGIN } from "../../constant";
import { error, success } from "../../helpers/messageHelper";

// Định nghĩa kiểu cho state
interface UserState {
    userLogin: I_login_res | null;
    autoFill: I_login_req | null;
    loadingBtn: boolean;
}

// Định nghĩa kiểu cho mutations
interface UserMutations extends MutationTree<UserState> {
    setUserLogin(state: UserState, data: I_login_res): void;
    setAutoFill(state: UserState, data: I_login_req): void;
    logout(state: UserState): void;
}

// Định nghĩa kiểu cho actions
interface UserActions extends ActionTree<UserState, any> {
    login(context: { commit: Commit; state: UserState }, payloadLogin: I_login_req): void;
}

const userState: UserState = {
    userLogin: lcStorage.get(USER_LOGIN),
    autoFill: null,
    loadingBtn: false,
};

const userMutations: UserMutations = {
    setUserLogin(state, data) {
        state.userLogin = data;
        state.autoFill = null;
    },
    setAutoFill(state, data) {
        state.autoFill = data;
    },
    logout(state) {
        lcStorage.remove(USER_LOGIN);
        lcStorage.remove(TOKEN);
        state.userLogin = null;
        state.autoFill = null;
        router.push("/login");
    },
};

const userActions: UserActions = {
    async login({ commit, state }, reqData) {
        try {
            state.loadingBtn = true;

            const { data } = await userApi.login(reqData);

            lcStorage.set(USER_LOGIN, data);

            lcStorage.set(TOKEN, data.token);

            commit("setUserLogin", data);

            router.push("/profile");

            success("Logged in successfully");
        } catch (err) {
            console.log(err);
            error("Login unsuccessful");
        } finally {
            state.loadingBtn = false;
        }
    },
};

const userModule: Module<UserState, any> = {
    namespaced: true,
    state: userState,
    mutations: userMutations,
    actions: userActions,
};

export default userModule;
