<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="CreateTask" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">View Task Details</h1>
      <form @submit.prevent="handleSubmit">
        <table class="w-full mb-6 text-left">
          <tbody>
            <tr><th>Task Title</th><td>{{ viewDetails.formData.title }}</td></tr>
            <tr><th>Task Description</th><td>{{ viewDetails.formData.description }}</td></tr>
            <tr><th>Due Date</th><td>{{ viewDetails.formData.dueDate }}</td></tr>
            <tr><th>Category</th><td>{{ viewDetails.formData.category }}</td></tr>
            <tr><th>Dependency</th><td>{{ viewDetails.formData.dependTaskTitle ? viewDetails.formData.dependTaskTitle : 'None' }}</td></tr>
            <tr><th>Status</th><td>{{ viewDetails.formData.status }}</td></tr>
            <tr><th>Owner</th><td>{{ viewDetails.formData.owner }}</td></tr>
            <tr><th>Assigned</th><td>{{ viewDetails.formData.assignedUser }}</td></tr>
          </tbody>
        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeViewTaskDetailsModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Back</button>
          <button @click.prevent="openUpdateTaskStatusModal(viewDetails.formData._id)" v-if="UserID == viewDetails.formData.ownerID" class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600" id="671ebaa1307656c7b07f6707" type="button">Edit</button>
          <button @click.prevent="openChangeTaskStatusModal(viewDetails.formData._id)" v-if="UserID != viewDetails.formData.ownerID" class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600" id="671ebaa1307656c7b07f6707" type="button" >Change Status</button>
          <button @click.prevent="deleteTask" v-if="UserID == viewDetails.formData.ownerID" class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" type="button">Delete</button>
        </div></form>
    </div>
  </div>

</template>
<script setup>
import { useDetailTaskStore } from '@/stores/Tasks/viewDetails';
import { useTaskModalStore } from '@/stores/Tasks/taskModals';
import { onMounted } from 'vue';

const UserID = JSON.parse(localStorage.getItem('user')).userId;

const taskModals = useTaskModalStore();
const viewDetails = useDetailTaskStore();

const closeViewTaskDetailsModal = () =>{
  viewDetails.closeModal();
};

const openChangeTaskStatusModal = (taskID) =>{
  viewDetails.closeModal();
  taskModals.openModal('statusTaskModal', {id: taskID} )
};

const openUpdateTaskStatusModal = (taskID) =>{
  viewDetails.closeModal();
  taskModals.openModal('updateTaskModal', {id: taskID} )
};

const deleteTask = () =>{
  viewDetails.deleteTask();
};


onMounted(async () => {
  try{
    console.log('starting mounted hook')
    await viewDetails.sendRequest();
  }catch(err){
      console.log(err);
    }
  });

</script>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
