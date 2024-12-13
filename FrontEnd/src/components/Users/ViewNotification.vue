<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="viewSubordinates" class="bg-white shadow-lg rounded-lg p-8  max-w-[80vw]  max-h-[80vh] overflow-y-auto relative">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">View Notification</h1>
        <div class="flex flex-wrap gap-4 ">
          <select id="viewType" name="viewType" @change="handleChange" v-model="selectedOption" class="bg-white text-black py-2 max-w-[200px_] px-4 rounded hover:bg-gray-200">
            <option value="unread">Unread Notifications</option>
            <option value="all">All Notifications</option>
            <option value="read">Read Notifications</option>
          </select>

        </div>

        <br/><br/>
        <br/>
        <!-- <br/><br/> -->

        <table class="w-full mb-6 text-left max-h-[50%] overflow-auto">
          <thead><tr><th>Notification Type</th><th>Notification Message</th><th>Date</th></tr></thead>

          <tbody v-if="showAll">
            <tr v-for="(notification, index) in allNotifications" :key="index" :value="notification._id">
              <td class="lg:p-4">{{ notification.alertType }}</td>
              <td class="lg:p-4">{{ notification.note }}</td>
              <td class="lg:p-4">{{ new Date(notification.createdAt).toISOString().split('T')[0] }}</td>
              <td class="lg:p-4" v-if="notification.readStatus == 'Unread'"><button @click.prevent="markAsRead(notification._id)" class="border-4 w-20 py-1 px-2 rounded-md text-black">Mark Read</button></td>
            </tr>
          </tbody>
          <tbody v-if="showUnread">
            <tr v-for="(notification, index) in unReadNotifications" :key="index" :value="notification._id">
              <td class="lg:p-4">{{ notification.alertType }}</td>
              <td class="lg:p-4">{{ notification.note }}</td>
              <td class="lg:p-4">{{ new Date(notification.createdAt).toISOString().split('T')[0] }}</td>
              <td class="lg:p-4" v-if="notification.readStatus == 'Unread'"><button @click.prevent="markAsRead(notification._id)" class="border-4 w-20 py-1 px-2 rounded-md text-black">Mark Read</button></td>
            </tr>
          </tbody>
          <tbody v-if="showRead">
            <tr v-for="(notification, index) in readNotifications" :key="index" :value="notification._id">
              <td class="lg:p-4">{{ notification.alertType }}</td>
              <td class="lg:p-4">{{ notification.note }}</td>
              <td class="lg:p-4">{{ new Date(notification.createdAt).toISOString().split('T')[0] }}</td>
              <td class="lg:p-4" v-if="notification.readStatus == 'Unread'"><button @click.prevent="markAsRead(notification._id)" class="border-4 w-20 py-1 px-2 rounded-md text-black">Mark Read</button></td>
            </tr>
          </tbody>

        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeViewNotificationssModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Close</button>
          <button @click.prevent="MarkAllAsRead" class="flex-1 bg-gray-100 text-black py-2 px-4  rounded  hover:bg-gray-300" type="button">Mark All As Read</button>

        </div>

    </div>
  </div>

</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useViewNotificationsStore } from '@/stores/Users/viewNotifications'
  import { useUserModalStore } from '@/stores/Users/userModals';

  const viewNotificationsStore = useViewNotificationsStore();
  const userModals = useUserModalStore();

  let showAll = ref(false);
  let showUnread = ref(true);
  let showRead = ref(false);
  let selectedOption = ref('unread');
  const markAsRead = async (notification) => {
    console.log(notification);
    let result = await viewNotificationsStore.markRead(notification);
    console.log(result);
    getNotifications();
  }
  const MarkAllAsRead = async () => {
    let result = await viewNotificationsStore.markAllRead();
    console.log(result);
    getNotifications();
  }

  async function handleChange() {
    if(selectedOption.value == 'unread'){
      showUnread.value = true;
      showRead.value = false;
      showAll.value = false;
    }else if(selectedOption.value == 'read'){
      showUnread.value = false;
      showRead.value = true;
      showAll.value = false;
    }else{
      showUnread.value = false;
      showRead.value = false;
      showAll.value = true;

    }

}


  let allNotifications = ref(viewNotificationsStore.allNotifications);
  let unReadNotifications = ref(viewNotificationsStore.unReadNotifications);
  let readNotifications = ref(viewNotificationsStore.readNotifications)

  const closeViewNotificationssModal = () =>{
    userModals.closeModal('viewNotifictions');
  };
  const getNotifications = async () => {
      await viewNotificationsStore.getNotifications();
      allNotifications.value = new Array();
      unReadNotifications.value = new Array();
      readNotifications.value = new Array();

      allNotifications.value = await viewNotificationsStore.allNotifications;
      unReadNotifications.value = await viewNotificationsStore.unReadNotifications;
      readNotifications.value = await viewNotificationsStore.readNotifications;

  }
  onMounted(async () => {
    getNotifications();
  });

</script>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
