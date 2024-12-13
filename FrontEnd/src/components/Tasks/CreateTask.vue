<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="CreateTask" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Create New Task</h1>
      <form @submit.prevent="handleSubmit">
        <table class="w-full mb-6 text-left">
          <tr><th>Task Title</th><td><input v-model="createTaskStore.formData.title" class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskTitle" name="taskTitle" placeholder="Enter the Task Title" required=""></td></tr>
          <tr><th>Task Description</th><td><input v-model="createTaskStore.formData.description"  class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskDescription" name="taskDescription" placeholder="Enter the Task Description" required=""></td></tr>
          <tr><th>Due Date</th><td><input v-model="createTaskStore.formData.dueDate"  class="p-2 rounded-md text-4 bg-white-600" type="date" id="taskDueDate" name="taskDueDate" required=""></td></tr>
          <tr><th>Category</th><td><input v-model="createTaskStore.formData.category"  class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskCategory" name="taskCategory" placeholder="Enter the Task Category" required=""></td></tr>
          <tr><th>Dependency</th><td><select v-model="createTaskStore.formData.dependency"  class="p-2 rounded-md text-4 bg-white-600 w-full" id="taskDependency" name="taskDependency">
            <option value="">None</option>
            <option v-for="(task, index) in taskList" :key="index" :value="task._id">{{ task.title }}</option>
          </select></td></tr>
          <tr><th>Status</th><td><select v-model="createTaskStore.formData.status"  class="p-2 rounded-md text-4 bg-white-600 w-full" id="taskStatus" name="taskStatus" required=""><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Complete">Complete</option></select></td></tr>
          <tr v-if="UserRole == 'Supervisor'"><th>Assigned User</th><td><select v-model="createTaskStore.formData.AssignedID" class="p-2 rounded-md text-4 bg-white-600 w-full" id="assignedUser" name="assignedUser" required="">
            <option :value="UserID">{{ UserName }}</option>
            <option v-for="(subordiante, index) in subordianteList" :key="index" :value="subordiante.ID">{{ subordiante.userName }}</option>
          </select></td></tr>
        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeCreateTaskModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Back</button>
          <button @click.prevent="randomFill" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" type="button">Fill Random</button>
          <button class="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Save</button>
        </div></form>
    </div>
  </div>

</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useCreateTaskStore } from '@/stores/Tasks/createTask'
  import { useTaskModalStore } from '@/stores/Tasks/taskModals';

  const UserID = JSON.parse(localStorage.getItem('user')).userId;
  const UserName = JSON.parse(localStorage.getItem('user')).userName;
  const UserRole = JSON.parse(localStorage.getItem('user')).userRole;

  const createTaskStore = useCreateTaskStore();
  const taskModals = useTaskModalStore();

  let subordianteList = ref(createTaskStore.subordinateList);
  let taskList = ref(createTaskStore.taskList);

  const handleSubmit = () => {
    createTaskStore.submitForm();
  };
  const closeCreateTaskModal = () =>{
    taskModals.closeModal('createTaskModal');
  };
  const randomFill = () => {
    createTaskStore.formData.title = 'Unoriginal Task Title';
    createTaskStore.formData.description = 'Unoriginal Task Description';
    createTaskStore.formData.dueDate = "2024-12-12";
    createTaskStore.formData.category = 'Unoriginal Task Category';
    createTaskStore.formData.AssignedID = UserID;
    createTaskStore.formData.status = 'Pending';
  }

  onMounted(async () => {
    if(UserRole == 'Supervisor'){
      await createTaskStore.getSubordinate();
      subordianteList.value = new Array();
      subordianteList.value = await createTaskStore.subordinateList;
      console.log(subordianteList.value);
    }
    await createTaskStore.getTaskList();
    taskList.value = new Array();
    taskList.value = await createTaskStore.taskList;
    console.log(taskList.value);
  });

</script>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
