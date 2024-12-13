<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="UpdateTask" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Update Task</h1>
      <form @submit.prevent="handleSubmit">
        <table class="w-full mb-6 text-left">
          <tbody>
          <tr><th>Task Title</th><td><input v-model="updateTaskStore.formData.title" class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskTitle" name="taskTitle" placeholder="Enter the Task Title" required=""></td></tr>
          <tr><th>Task Description</th><td><input v-model="updateTaskStore.formData.description"  class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskDescription" name="taskDescription" placeholder="Enter the Task Description" required=""></td></tr>
          <tr><th>Due Date</th><td><input v-model="updateTaskStore.formData.dueDate"  class="p-2 rounded-md text-4 bg-white-600" type="date" id="taskDueDate" name="taskDueDate" required=""></td></tr>
          <tr><th>Category</th><td><input v-model="updateTaskStore.formData.category"  class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskCategory" name="taskCategory" placeholder="Enter the Task Category" required=""></td></tr>
          <tr><th>Dependency</th><td><select v-model="updateTaskStore.formData.dependencyOnAnotherTask"  class="p-2 rounded-md text-4 bg-white-600 w-full" id="taskDependency" name="taskDependency">
            <option value="">None</option>
            <option v-for="(task, index) in taskList" :key="index" :value="task._id">{{ task.title }}</option>
          </select></td></tr>
          <tr><th>Status</th><td><select v-model="updateTaskStore.formData.status"  class="p-2 rounded-md text-4 bg-white-600 w-full" id="taskStatus" name="taskStatus" required=""><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Complete">Complete</option></select></td></tr>
          <tr v-if="UserRole == 'Supervisor'"><th>Assigned User</th><td><select v-model="updateTaskStore.formData.assignedUserID" class="p-2 rounded-md text-4 bg-white-600 w-full" id="assignedUser" name="assignedUser" required="">
            <option :value="UserID">{{ UserName }}</option>
            <option v-for="(subordiante, index) in subordianteList" :key="index" :value="subordiante.ID">{{ subordiante.userName }}</option>
          </select></td></tr>
        </tbody>
        </table>

        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeUpdateTaskModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Back</button>
          <button class="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Update</button>
        </div></form>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useUpdateTaskStore } from '@/stores/Tasks/updateTask'
import { useTaskModalStore } from '@/stores/Tasks/taskModals';

const UserID = JSON.parse(localStorage.getItem('user')).userId;
const UserName = JSON.parse(localStorage.getItem('user')).userName;
const UserRole = JSON.parse(localStorage.getItem('user')).userRole;

const updateTaskStore = useUpdateTaskStore();
const taskModals = useTaskModalStore();

let subordianteList = ref(updateTaskStore.subordinateList);
let taskList = ref(updateTaskStore.taskList);

const handleSubmit = () => {
  updateTaskStore.submitForm();
};

const closeUpdateTaskModal = () =>{
  taskModals.closeModal('updateTaskModal');
};

onMounted(async () => {
    if(UserRole == 'Supervisor'){
      await updateTaskStore.getSubordinate();
      subordianteList.value = new Array();
      subordianteList.value = await updateTaskStore.subordinateList;
      console.log(subordianteList.value);
    }
    await updateTaskStore.getTaskList();
    taskList.value = new Array();
    taskList.value = await updateTaskStore.taskList;
    console.log(taskList.value);
    try{
      await updateTaskStore.sendRequest();
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
