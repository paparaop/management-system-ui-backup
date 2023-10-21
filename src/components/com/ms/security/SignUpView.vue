<template>
  <div style="min-height: 100vh">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="signUpRequest.firstName"
          label="First Name *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type First Name',
          ]"
        ></q-input>
        <q-input
          filled
          v-model="signUpRequest.lastName"
          label="Last Name *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type Last Name']"
        ></q-input>
        <q-input
          type="email"
          filled
          v-model="signUpRequest.email"
          label="Email *"
          lazy-rules
          :rules="[(val) => validateEmail(val) || 'Please type Email']"
        ></q-input>

        <q-input
          type="password"
          filled
          v-model="signUpRequest.password"
          label="Password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type Password']"
        ></q-input>
        <q-select
          multiple
          v-model="signUpRequest.roles"
          :options="roles"
          option-label="name"
          option-value="id"
          label="Roles *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please Select Roles']"
        />
        <div>
          <q-btn label="Submit" type="submit" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script lang="ts">
import router from 'src/router';
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from './utils/apiClient';
import { Role } from './utils/Role';
import { SignUpRequest } from './utils/SignUpRequest';

export default defineComponent({
  setup() {
    const router = useRouter();
    const signUpRequest = ref<SignUpRequest>({ email: '', password: '' });
    const roles = ref<Role[]>();
    onMounted(async () => {
      apiClient.get('/public/user/roles').then((data) => {
        roles.value = data.data;
      });
    });
    const loginService = async (user: any): Promise<any> => {
      return await apiClient.post('/public/user', signUpRequest.value);
    };
    function onSubmit() {
      loginService(signUpRequest.value).then((response) => {
        /*if (response.data.token) {
          window.localStorage.clear();
          window.localStorage.setItem('jwtToken', response.data.token);
        }*/
        router.push({ path: 'login' });
      });
    }
    function validateEmail(email: string): boolean {
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    }

    return {
      signUpRequest,
      validateEmail,
      onSubmit,
    };
  },
});
</script>

<style scoped>
</style>
