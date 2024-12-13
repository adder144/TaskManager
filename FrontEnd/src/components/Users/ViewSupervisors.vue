<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="viewSubordinates" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg  max-h-[80vh] overflow-y-auto relative">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">View Supervisors</h1>
        <table class="w-full mb-6 text-left max-h-[50%] overflow-auto">
          <thead><tr><th>UserName</th></tr></thead>
          <tbody>
            <tr v-for="(supervisor, index) in ownSupervisorList" :key="index" :value="supervisor.ID">
              <td>{{ supervisor.userName }}</td>
            </tr>
          </tbody>

        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeViewSupervisorsModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Close</button>
        </div>

    </div>
  </div>

</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useViewSupervisorsStore } from '@/stores/Users/viewSupervisors'
  import { useUserModalStore } from '@/stores/Users/userModals';

  const viewSupervisorsStore = useViewSupervisorsStore();
  const userModals = useUserModalStore();

  let ownSupervisorList = ref(viewSupervisorsStore.ownSupervisorList);

  const closeViewSupervisorsModal = () =>{
    userModals.closeModal('viewSupervisors');
  };
  onMounted(async () => {
    await viewSupervisorsStore.getSupervisors();
    ownSupervisorList.value = new Array();
    ownSupervisorList.value = await viewSupervisorsStore.ownSupervisorList;
    console.log('Supervisor List');
    console.log(ownSupervisorList)
});

</script>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
