const isProduction = process.env.NODE_ENV === "production";
export const BASE_URL = isProduction ? "https://imonkey.onrender.com/api/v1" : "http://localhost:3001/api/v1";
// export const BASE_URL = "http://localhost:3001/api/v1";

export const USER_LOGIN = "USER_LOGIN";

export const TOKEN = "TOKEN";

export const PUBLIC_LAYOUT = "default";

export const PROFILE_OPTION = [
    {
        name: "My Wallet",
        icon: "t2ico-wallet",
        route: "/",
    },
    {
        name: "Tools",
        icon: "t2ico-ticket-star",
        route: "/",
    },
    {
        name: "About",
        icon: "t2ico-info-square",
        route: "/",
    },
    {
        name: "Logout",
        icon: "t2ico-logout",
        route: "/logout",
    },
];

export const NAV_ITEMS = [
    {
        icon: "t2ico-home",
        router: "/",
    },
    {
        icon: "t2ico-chart",
        router: "/list-transaction",
    },
    {
        icon: "t2ico-plus",
        router: "/add-transaction",
    },
    {
        icon: "t2ico-category",
        router: "/category",
    },
    {
        icon: "t2ico-profile",
        router: "/profile",
    },
];
