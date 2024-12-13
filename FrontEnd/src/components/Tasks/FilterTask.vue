<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div id="CreateTask" class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Input Task Filters</h1>
      <form @submit.prevent="handleSubmit">
        <table class="w-full mb-6 text-left">
          <tr><th>Task Title</th><td><input v-model="taskListStore.params.Title" class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskTitle" name="taskTitle" placeholder="Enter the Task Title" ></td></tr>
          <tr><th>Category</th><td><input v-model="taskListStore.params.Category" class="p-2 rounded-md text-4 bg-white-600" type="text" id="taskCategory" name="taskCategory" placeholder="Enter the Task Category" ></td></tr>
          <tr><th>Status</th><td><select v-model="taskListStore.params.Status" class="p-2 rounded-md text-4 bg-white-600 w-full" id="taskStatus" name="taskStatus"><option value="">All</option><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Complete">Complete</option></select></td></tr>
          <tr><th>Due Date Before</th><td><input v-model="taskListStore.params.DueDateBefore" class="p-2 rounded-md text-4 bg-white-600" type="date" id="taskDueDate" name="taskDueDate" ></td></tr>
          <tr><th>Due Date After</th><td><input v-model="taskListStore.params.DueDateAfter" class="p-2 rounded-md text-4 bg-white-600" type="date" id="taskDueDate" name="taskDueDate"></td></tr>
          <tr><th>Sort By</th>
            <td>
              <select v-model="taskListStore.params.SortBy" class="p-2 rounded-md text-4 bg-white-600 w-full" id="sortBy" name="sortBy">
                <option value="title">Title</option>
                <option value="dueDate">Due Date</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select></td></tr>
          <tr><th>Sort Order</th><td><select v-model="taskListStore.params.SortOrder" class="p-2 rounded-md text-4 bg-white-600 w-full" id="sortOrder" name="sortOrder"><option value="ascending">Ascending</option><option value="descending">Descending</option></select></td></tr>
          <tr><th>View Status By</th><td><select v-model="taskListStore.viewStatus" class="p-2 rounded-md text-4 bg-white-600 w-full" id="sortOrder" name="sortOrder"><option value="color">Color</option><option value="text">Text</option></select></td></tr>

        </table>
        <div class="flex flex-wrap gap-4">
          <button @click.prevent="closeModal" class="flex-1 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600" type="button">Back</button>
          <button @click.prevent="clearFilters" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" type="button">Clear</button>
          <button  class="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>

</template>
<script setup>
  import { useViewTaskListStore } from '@/stores/Tasks/viewTaskList'

  const taskListStore = useViewTaskListStore();

  const handleSubmit = () => {
    taskListStore.submitParametes();
  }
  const clearFilters = () => {
    taskListStore.clearParametes();
  }
  const closeModal = () => {
    taskListStore.closeModal();
  }

</script>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
