<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

    <!-- Login Card Container -->
    <div class="bg-white shadow-lg rounded-lg p-6 md:w-96">
      <h2 class="text-2xl font-bold text-center mb-4 text-gray-700">Welcome Back</h2>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4 flex-col items-center justify-between">

        <!-- Username Input -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            required
            class="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            v-model="loginStore.formData.username"
            placeholder="Enter your username"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            class="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            v-model="loginStore.formData.password"
            placeholder="Enter your password"
          />
        </div>
        <div class="flex items-center justify-center w-full">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mx-4"
          >
            Login
          </button>
          <button @click.prevent="goToRegister" class="p-2 mt-2 rounded-lg text-4 cursor-pointer bg-gray-500 text-white hover:bg-gray-300 hover:text-black mx-4" type="button">Register</button>

        </div>
      </form>
    </div>

  </div>

</template>

<script setup>

  import { onMounted } from 'vue';
  import { useLoginStore } from '@/stores/login';
  import { useRouter } from 'vue-router';

  const loginStore = useLoginStore();
  const router = useRouter();

  const goToRegister = () =>{
    router.push('/register');
  }


  const handleSubmit = async () => {
    let response = await loginStore.submitLoginForm();
    console.log('Login Response: '+(response));
    if(response) router.push('/userViewTask');

  };

  onMounted(() => {
    loginStore.formData.username = "";
    loginStore.formData.password = "";

  });

</script>
