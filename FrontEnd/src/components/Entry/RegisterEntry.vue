<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

    <!-- Register Card Container -->
    <div class="bg-white shadow-lg rounded-lg p-6 md:w-96">
      <h1 class="text-2xl text-center mb-8 font-bold">Create a New Account</h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col items-center">
        <label class="mb-2 font-bold" for="username">Username</label>
        <input v-model="registerStore.formData.username" class="p-2 mb-6 rounded-md text-4 bg-white-600" type="text" id="username" name="username" placeholder="Enter your username" required="">
        <label class="mb-2 font-bold" for="password">Password</label>
        <input v-model="registerStore.formData.password"  class="p-2 mb-6 rounded-md text-4 bg-white-600" type="password" id="password" name="password" placeholder="Enter your password" required="">
        <label class="mb-2 font-bold" for="confirmPassword">Confirm Password</label>
        <input v-model="registerStore.formData.confirmPassword"  class="p-2 mb-6 rounded-md text-4 bg-white-600" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required="">
        <label class="mb-2 font-bold" for="accountType">Account Type</label>
        <select v-model="registerStore.formData.userRole"  id="accountType" name="accountType" class="p-2 mb-6 rounded-md text-4 bg-white-600" required="">
          <option value="Supervisor">Supervisor</option>
          <option value="Subordinate">Subordinate</option>
        </select>
        <div>
          <button class="p-2 mt-2 rounded-lg text-4 cursor-pointer bg-green-500 text-white hover:bg-green-300 hover:text-black mx-4" type="submit">Register</button>
          <button @click.prevent="goToLogin" class="p-2 mt-2 rounded-lg text-4 cursor-pointer bg-gray-500 text-white hover:bg-gray-300 hover:text-black mx-4" type="button">Login</button>
        </div>
      </form>

    </div>

  </div>

</template>
<script setup>
  import { onMounted } from 'vue';
  import { useRegisterStore } from '@/stores/register';
  import { useRouter } from 'vue-router';

  const registerStore = useRegisterStore();
  const router = useRouter();

  const goToLogin = () =>{
    router.push('/login');
  }

  const handleSubmit = async () => {

    let response = await registerStore.submitRegistrationForm();
    if(response) {
      alert('Successful Registration!');
      router.push('/login');
    }
  };

  onMounted(() => {
    registerStore.formData.username = "";
    registerStore.formData.password = "";
    registerStore.formData.confirmPassword = "";

  });

</script>
