<template>
  <nav class="fixed top-0 left-0 right-0 w-full bg-purple-100 text-white shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <h1  class="text-xl font-bold text-green-500">Task Manager</h1>
        </div>
        <div class="hidden md:flex space-x-4">
          <button
            v-if="((userName.length > 0)) "
            @click.prevent="showNotifications"
            class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <font-awesome-icon icon="bell" />
          </button>
          <span
            v-if="((notifications > 0) && (userName.length > 0))"
            class=" flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full shadow"
          >
            {{ notifications }}
          </span>
          <button v-if="((userName.length > 0) && (userRole == 'Supervisor'))" @click.prevent="showSubordinates" class="text-green-500 px-5 w-10 h-10"><font-awesome-icon icon="users" /></button>
          <button v-if="((userName.length > 0) && (userRole == 'Subordinate'))" @click.prevent="showSupervisors" class="text-green-500 px-5 w-10 h-10"><font-awesome-icon icon="users" /></button>
          <button @click.prevent="logout" v-if="(userName.length > 0)" class="bg-green-400 py-1 px-2 mx-5 rounded-md text-black">Logout</button>
          <h2 v-if="userName.length > 0" class="text-xl font-bold text-green-500 px-5"><font-awesome-icon icon="user" /> {{userName}}</h2>
        </div>

        <div class="md:hidden flex space-x-4">
          <button
            v-if="((userName.length > 0)) "
            @click.prevent="showNotifications"
            class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <font-awesome-icon icon="bell" />
          </button>

          <span
            v-if="((notifications > 0) && (userName.length > 0))"
            class=" flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full shadow"
          >
            {{ notifications }}
          </span>

          <button @click="toggleMobileMenu" class="text-green-600 font-bold focus:outline-none hover:outline-1 px-3">
            ☰
          </button>
          <h2 v-if="userName.length > 0" class="text-xl font-bold text-green-500">  <font-awesome-icon icon="user" /> {{userName}}</h2>

        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden bg-white-600 flex flex-col justify-center items-center">
      <br/>
      <button v-if="((userName.length > 0) && (userRole == 'Supervisor'))" @click.prevent="showSubordinates" class="text-green-500"><font-awesome-icon icon="users" /> Subordinates</button><br v-if="((userName.length > 0) && (userRole == 'Supervisor'))"/><br v-if="((userName.length > 0) && (userRole == 'Supervisor'))"/>
      <button v-if="((userName.length > 0) && (userRole == 'Subordinate'))" @click.prevent="showSupervisors" class="text-green-500"><font-awesome-icon icon="users" /> Supervisors</button><br v-if="((userName.length > 0) && (userRole == 'Subordinate'))"/><br v-if="((userName.length > 0) && (userRole == 'Subordinate'))"/>
      <button @click.prevent="logout" v-if="(userName.length > 0)" class="bg-green-400 py-1 px-2 rounded-md text-black">Logout</button><br v-if="(userName.length > 0)"/>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserModalStore } from '@/stores/Users/userModals';
import { useViewNotificationsStore } from '@/stores/Users/viewNotifications'
const userModals = useUserModalStore();

const router = useRouter();

let isMobileMenuOpen = ref(false);
let user = localStorage.getItem('user') ? localStorage.getItem('user') : '';
let userName = ref('');
let userRole = ref('');

const viewNotificationsStore = useViewNotificationsStore();
let unReadNotifications = ref(viewNotificationsStore.unReadNotifications);


if(user.length > 0){
  userName.value = JSON.parse(user).userName;
  userRole.value = JSON.parse(user).userRole;
}
const showSubordinates = () =>{
  userModals.openModal('viewSubordinates');
  isMobileMenuOpen.value = false;

}
let notifications = ref(1);

const showSupervisors = () =>{
  userModals.openModal('viewSupervisors');
  isMobileMenuOpen.value = false;

}

const showNotifications = () =>{
  userModals.openModal('viewNotifictions');
  isMobileMenuOpen.value = false;

}

onMounted(()=>{
  setInterval(() => {
    let currentValueRaw = localStorage.getItem('user') ? localStorage.getItem('user') : '';
    let currentName = "";
    let currentRole = "";
    if(currentValueRaw.length > 0){
      currentName = JSON.parse(currentValueRaw).userName ? JSON.parse(currentValueRaw).userName : '';
      currentRole = JSON.parse(currentValueRaw).userRole ? JSON.parse(currentValueRaw).userRole : '';
    }
    if (currentName !== userName.value) {
      userName.value = currentName;
      userRole.value = currentRole;
    }
  }, 500);

  setInterval(async () => {
    let currentValueRaw = localStorage.getItem('user') ? localStorage.getItem('user') : '';
    if(currentValueRaw.length > 0){
      unReadNotifications.value = new Array();
      await viewNotificationsStore.getNotifications();
      unReadNotifications.value = await viewNotificationsStore.unReadNotifications;
      if(unReadNotifications.value){
        if(unReadNotifications.value.length > 0){
          notifications.value = unReadNotifications.value.length;
        }else notifications.value = 0;
      }else notifications.value = 0;
    }
  }, 500);
})

const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    isMobileMenuOpen.value = false;
    router.push('/');
  }
</script>

<style>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a:first-of-type {
  border: 0;
}
/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
} */

</style>
