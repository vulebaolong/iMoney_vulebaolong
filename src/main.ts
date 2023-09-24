import { createApp } from "vue";
import App from "./App.vue";
import "./api/configApi";
import store from "./store";
import router from "./router";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import "./assets/styles/tailwind.css";
import "./assets/styles/font.css";
import "./assets/styles/global.css";

import { registerGlobalComponents } from "./helpers/import";

const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
}

const app = createApp(App);

registerGlobalComponents(app);
app.use(Antd);
app.use(store);
app.use(router);

app.mount("#app");
