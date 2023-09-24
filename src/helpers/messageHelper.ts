import { message } from "ant-design-vue";

export const success = (content: string) => {
    message.open({
        type: "success",
        content,
    });
};

export const error = (content: string) => {
    message.open({
        type: "error",
        content,
    });
};

export const warning = (content: string) => {
    message.open({
        type: "warning",
        content,
    });
};
