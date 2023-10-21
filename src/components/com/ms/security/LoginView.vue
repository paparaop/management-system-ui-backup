<template>
  <div style="min-height: 100vh">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          type="email"
          filled
          v-model="signUpRequest.email"
          label="Email *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type Email']"
        ></q-input>

        <q-input
          type="password"
          filled
          v-model="signUpRequest.password"
          label="Password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type Password']"
        ></q-input>

        <div>
          <q-btn label="Submit" type="submit" color="primary"></q-btn>
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          ></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import apiClient from './utils/apiClient';
import { SignUpRequest } from './utils/SignUpRequest';

export default defineComponent({
  setup() {
    const signUpRequest = ref<SignUpRequest>({ email: '', password: '' });
    const loginService = async (user: any): Promise<any> => {
      return await apiClient.post('/api/v1/auth/token', signUpRequest.value);
    };
    function onSubmit() {
      loginService(signUpRequest.value).then((response) => {
        if (response.data.token) {
          window.localStorage.clear();
          window.localStorage.setItem('jwtToken', response.data.token);
        }
        window.location.href = '/api/v1/resource';
      });
    }
    function onReset() {
      signUpRequest.value = { email: '', password: '' };
    }

    return {
      signUpRequest,
      onSubmit,
      onReset,
    };
  },
});
</script>

<style scoped>
</style>
