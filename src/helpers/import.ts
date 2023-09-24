import { App, defineAsyncComponent } from "vue";

export const registerGlobalComponents = (app: App) => {
    app.component(
        "auth-layout",
        defineAsyncComponent(() => import("../layouts/auth.vue"))
    );

    app.component(
        "default-layout",
        defineAsyncComponent(() => import("../layouts/default.vue"))
    );
};
