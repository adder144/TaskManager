<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="viewSubordinates" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg  max-h-[80vh] overflow-y-auto relative">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">View Subordinates</h1>
        <div class="flex flex-wrap gap-4">
          <select id="viewType" name="viewType" @change="handleChange" v-model="selectedOption" class="bg-white text-black py-2 max-w-[145px_] px-4 rounded hover:bg-gray-200">
            <option value="all">All Subordinates</option>
            <option value="own">Own Subordinates</option>
            <option value="other">Other Subordinates</option>
          </select>
        </div>

        <table class="w-full mb-6 text-left max-h-[50%] overflow-auto">
          <thead><tr><th>UserName</th><th>Actions</th></tr></thead>
          <tbody v-if="showOwn">
            <tr v-for="(subordinate, index) in ownSubordinateList" :key="index" :value="subordinate.ID">
              <td>{{ subordinate.userName }}</td>
              <td><button @click.prevent="removeSubordinate(subordinate.ID)" class="bg-red-300 w-20 py-1 px-2 rounded-md text-black">Remove</button></td>
            </tr>
          </tbody>
          <tbody v-if="showOther">
            <tr v-for="(subordinate, index) in otherSubordinateList" :key="index" :value="subordinate.ID">
              <td>{{ subordinate.userName }}</td>
              <td><button @click.prevent="addSubordinate(subordinate.ID)" class="bg-green-400 w-20 py-1 px-2 rounded-md text-black">Add</button></td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeViewSubordinatesModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Close</button>
        </div>

    </div>
  </div>

</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useViewSubordinatesStore } from '@/stores/Users/viewSubordinates'
  import { useUserModalStore } from '@/stores/Users/userModals';

  const UserRole = JSON.parse(localStorage.getItem('user')).userRole;

  const viewSubordinatesStore = useViewSubordinatesStore();
  const userModals = useUserModalStore();

  let showOwn = ref(true);
  let showOther = ref(true);
  let selectedOption = ref('all');
  const addSubordinate = async (subordinate) => {
    let result = await viewSubordinatesStore.addSubordinate(subordinate);
    console.log(result);
    getSubordinates();
  }
  const removeSubordinate = async (subordinate) => {
    let result = await viewSubordinatesStore.removeSubordinate(subordinate);
    console.log(result);
    getSubordinates();
  }

  async function handleChange() {
    if(selectedOption.value == 'other'){
      showOwn.value = false;
      showOther.value = true;
    }else if(selectedOption.value == 'own'){
      showOwn.value = true;
      showOther.value = false;
    }else{
      showOwn.value = true;
      showOther.value = true;

    }

}


  let ownSubordinateList = ref(viewSubordinatesStore.ownSubordinateList);
  let allSubordinateList = ref(viewSubordinatesStore.allSubordinateList);
  let otherSubordinateList = ref(viewSubordinatesStore.otherSubordinateList)

  const closeViewSubordinatesModal = () =>{
    userModals.closeModal('viewSubordinates');
  };
  const getSubordinates = async () => {
    if(UserRole == 'Supervisor'){
      await viewSubordinatesStore.getSubordinate();

      ownSubordinateList.value = new Array();
      ownSubordinateList.value = await viewSubordinatesStore.ownSubordinateList;

      allSubordinateList.value = new Array();
      allSubordinateList.value = await viewSubordinatesStore.allSubordinateList;

      otherSubordinateList.value = new Array();
      otherSubordinateList.value = await viewSubordinatesStore.otherSubordinateList;
    }


  }
  onMounted(async () => {
    getSubordinates();
  });

</script>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
