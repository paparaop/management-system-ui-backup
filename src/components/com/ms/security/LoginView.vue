<template>
  <div>
    <input type="email" v-model="signUpRequest.email" placeholder="Username" />
    <input
      type="password"
      v-model="signUpRequest.password"
      placeholder="Password"
    />
    <button @click="login">Login</button>
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
      return await apiClient.post('/auth/login', {
        username: user.email,
        password: user.password,
      });
    };
    function login() {
      loginService(signUpRequest.value).then((response) => {
        if (response.data.token) {
          window.localStorage.clear();
          window.localStorage.setItem('jwtToken', response.data.token);
        }
        window.location.href = '/api/v1/resource';
      });
    }

    return {
      login,
      signUpRequest,
    };
  },
});
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

button {
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #0d8bf2;
}
</style>
