<template>
    <div class="mt-8">
        <div class="container">
            <!-- FROM -->
            <a-form :model="formState" layout="vertical" @finish="onFinish" @finishFailed="onFinishFailed">
                <!-- EMAIL -->
                <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input v-model:value="formState.email" size="large" autocomplete="email" />
                </a-form-item>

                <!-- PASSWORD -->
                <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" size="large" autocomplete="current-password" />
                </a-form-item>

                <!-- BUTTON -->
                <a-form-item>
                    <a-button :loading="loadingBtn" class="w-full" size="large" type="primary" html-type="submit">Log In</a-button>
                </a-form-item>
            </a-form>

            <!-- DIRECTION -->
            <div class="w-full mt-6 text-center">
                <span class="font-semibold">I am a new user.</span>
                <span class="ml-1 font-bold text-primary">
                    <router-link to="/register">Sign In</router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loadingBtn = computed(() => store.state.userModule.loadingBtn);

const formState = reactive({
    email: store.state.userModule.autoFill?.email || "example@gmail.com",
    password: store.state.userModule.autoFill?.password || "123456",
});

const onFinish = (values: any) => {
    store.dispatch("userModule/login", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};
</script>
