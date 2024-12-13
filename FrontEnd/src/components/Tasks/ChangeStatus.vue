<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="ChangeTaskStatus" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Change Task Status</h1>
      <form @submit.prevent="handleSubmit">
        <table class="w-full mb-6 text-left">
          <tbody>
            <tr><th>Task Title</th><td class="p-3">{{ viewDetails.formData.title }}</td></tr>
            <tr><th>Task Description</th><td class="p-3">{{ viewDetails.formData.description }}</td></tr>
            <tr><th>Due Date</th><td class="p-3">{{ taskDueDate  }}</td></tr>
            <tr><th>Category</th><td class="p-3">{{ viewDetails.formData.category }}</td></tr>
            <tr><th>Dependency</th><td class="p-3">{{ viewDetails.formData.dependTaskTitle ? viewDetails.formData.dependTaskTitle : 'None' }}</td></tr>
            <tr><th>Status</th><td><select v-model="viewDetails.formData.status"  class="p-2 rounded-md text-4 bg-white-600 w-full" id="taskStatus" name="taskStatus" required=""><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Complete">Complete</option></select></td></tr>
            <tr><th>Owner</th><td class="p-3">{{ viewDetails.formData.owner }}</td></tr>
            <tr><th>Assigned</th><td class="p-3">{{ viewDetails.formData.assignedUser }}</td></tr>
          </tbody>
        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeChangeTaskStatusModal" class="flex-1 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600" type="button">Back</button>
          <button class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" id="671ebaa1307656c7b07f6707" type="submit">Save</button>
        </div></form>
    </div>
  </div>

</template>
<script setup>
  import { useChangeTaskStatusStore } from '@/stores/Tasks/changeStatus';
  import { ref, onMounted } from 'vue';

  const viewDetails = useChangeTaskStatusStore();

  const closeChangeTaskStatusModal = () =>{
    viewDetails.closeModal();
  };
  const handleSubmit = () => {
    viewDetails.sendChangeStatusRequest();
  };
  let taskDueDate = ref(new Date());

  onMounted(async () => {
    try{
      console.log('starting mounted hook in changeStatus')
      await viewDetails.sendRequest();
      taskDueDate.value = new Date(viewDetails.formData.dueDate).toISOString().split('T')[0];
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
