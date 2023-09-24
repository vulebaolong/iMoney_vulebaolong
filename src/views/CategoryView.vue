<template>
    <!-- ADD CATEGORY -->
    <div class="container px-8 mb-2">
        <div class="flex items-center gap-5 p-4 bg-white rounded-lg">
            <!-- MÀU -->
            <label for="category" class="flex items-center mb-14 h-[38px]">
                <div class="flex items-center justify-center w-6 h-6 leading-10 text-right rounded-md" :style="{ background: color }">
                    <a-popover trigger="click" placement="rightTop">
                        <template #content>
                            <ColorPicker theme="light" :color="color" :sucker-hide="true" :sucker-canvas="suckerCanvas" :sucker-area="suckerArea" @changeColor="changeColor" />
                        </template>
                        <BgColorsOutlined class="text-white" />
                    </a-popover>
                </div>
            </label>

            <!-- FORM -->
            <a-form class="w-full" :model="formState" layout="vertical" @finish="onFinish">
                <!-- INPUT TITLE CATEGORY-->
                <a-form-item class="flex-1 border-b border-gray-100" name="title" :rules="[{ required: true, message: 'Please input your category!' }]">
                    <a-input class="px-0" v-model:value="formState.title" size="small" :bordered="false" placeholder="Add new category" />
                </a-form-item>

                <!-- BUTTON ADD -->
                <a-form-item class="m-0">
                    <a-button class="w-full" size="small" type="primary" html-type="submit">Add category</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>

    <!-- LIST CATEGORY -->
    <div class="container px-8 space-y-2">
        <!-- CATEGORY ITEM -->
        <div v-for="category in listCategory" :key="category._id" class="flex items-center gap-5 p-4 bg-white rounded-lg">
            <!-- COLOR -->
            <div class="flex-shrink-0 w-6 h-6 rounded-md" :style="{ background: category.color }"></div>

            <!-- TITLE &  BUTTON-->
            <div class="flex items-center justify-between w-full truncate">
                <!-- TITLE -->
                <span class="text-base font-semibold truncate">{{ category.title }}</span>

                <!-- BUTTON DELETE -->
                <a-popconfirm placement="topRight" title="Are you sure delete this category?" @confirm="confirm(category)">
                    <a-button class="flex-shrink-0" danger size="small">
                        <template #icon>
                            <DeleteOutlined />
                        </template>
                    </a-button>
                </a-popconfirm>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, reactive, ref } from "vue";
import { useStore } from "vuex";
import "../assets/styles/vue-color-kit.css";
import { ColorPicker } from "vue-color-kit";
import { BgColorsOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { RouteLocationRaw } from "vue-router";
import { lcStorage } from "../helpers/lcStorage";
import { USER_LOGIN } from "../constant";
import { I_Category_res } from "../interfaces/categoryInterface";

export default {
    beforeRouteEnter(to: RouteLocationRaw, from: RouteLocationRaw, next: any) {
        to;
        from;
        if (!lcStorage.get(USER_LOGIN)) {
            // Chuyển hướng nếu người dùng chưa đăng nhập
            next("/login");
        } else {
            // Nếu đã đăng nhập, tiếp tục hiển thị component
            next();
        }
    },
    setup() {
        const store = useStore();

        store.dispatch("categoryModule/getListCategory");

        const listCategory: ComputedRef<I_Category_res[]> = computed(() => store.state.categoryModule.listCategory);

        const color = ref("#1668dc");
        const suckerCanvas = ref(null);
        const suckerArea = ref([]);
        const isSucking = ref(false);

        const formState = reactive({
            title: "",
        });

        const resetForm = () => {
            formState.title = "";
        };

        const onFinish = (values: any) => {
            values.color = color.value;

            store.dispatch("categoryModule/createCategory", values).then((result) => {
                if (result) resetForm();
            });
        };

        const changeColor = (colorPram: any) => {
            const { r, g, b, a } = colorPram.rgba;
            color.value = `rgba(${r}, ${g}, ${b}, ${a})`;
        };

        const confirm = (category: I_Category_res) => {
            return new Promise((resolve) => {
                store.dispatch("categoryModule/deleteCategory", category._id).then(() => {
                    resolve(true);
                });
            });
        };

        return {
            listCategory,
            formState,
            onFinish,
            changeColor,
            color,
            suckerCanvas,
            suckerArea,
            isSucking,
            confirm,
        };
    },
    components: { ColorPicker, BgColorsOutlined, DeleteOutlined },
};
</script>
