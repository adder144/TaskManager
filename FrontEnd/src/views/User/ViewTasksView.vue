<template>
  <div id="ViewTasks" class="bg-white shadow-lg rounded-lg p-8 absolute top-24 left-0 right-0   w-[calc(100%_-_10px)] m-2 overflow-hidden">
    <h1 class="text-2xl text-center mb-8 font-bold">View Tasks</h1>

    <CreateTaskModal v-if="taskModals.modals.createTaskModal.isOpen" />
    <ViewTaskDetailsModal v-if="taskModals.modals.viewTaskModal.isOpen" />
    <FilterTaskModal v-if="taskModals.modals.filterTaskModal.isOpen" />
    <ChangeTaskStatusModal v-if="taskModals.modals.statusTaskModal.isOpen" />
    <UpdateTaskStatusModal v-if="taskModals.modals.updateTaskModal.isOpen" />
    <ViewSubordinatesModal v-if="userModals.modals.viewSubordinates.isOpen" />
    <ViewSupervisorsModal v-if="userModals.modals.viewSupervisors.isOpen" />
    <ViewNotificationsModal v-if="userModals.modals.viewNotifictions.isOpen" />

    <div class="flex flex-wrap gap-4">
        <select id="viewType" name="viewType" v-model="taskListStore.viewType" @change="handleChange"  class="bg-white text-black py-2 max-w-[145px_] px-4 rounded hover:bg-gray-200">
        <option value="all">All Tasks</option>
        <option value="own">Own Tasks</option>
        <option value="assigned">Assigned Tasks</option>
      </select>
      <button @click.prevent="openFilterTaskModal" class="flex-1 bg-green-100 text-black py-2 px-4 max-w-[145px_] rounded mr-4  shadow-lg  hover:bg-green-200" type="button">Filter Options</button>

      <!-- <button @click.prevent="openCreateTaskModal" class=" bg-green-500 text-white  px-4 max-w-10 rounded   shadow-lg  hover:bg-green-600" type="button">+</button>
      <button class="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button class="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        <font-awesome-icon icon="plus" class="mr-2" />
      </button> -->
      <button
        class="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Create New"
        @click.prevent="openCreateTaskModal"
      >
        <font-awesome-icon icon="plus" class="text-lg" />
      </button>

    </div>
    <br /><br />
    <table class="w-full mb-6 text-left overflow-auto ">
      <thead><tr ><th class="text-xl font-bold">Task Title</th><th class="text-xl font-bold">Due Date</th><th class="text-xl font-bold">Category</th><th v-if="taskListStore.viewStatus == 'text'" class="text-xl font-bold">Status</th></tr></thead>

      <tbody v-if="taskListStore.viewStatus == 'color'">
        <tr v-for="task in taskList" :key="task._id" @click.prevent="openViewTaskDetailsModal(task._id)">
          <td v-if="task.status === 'Pending'" class="cursor-pointer bg-[#f3ff72]" title="View Task">{{ task.title }}</td>
          <td v-if="task.status === 'Pending'" class="cursor-pointer bg-[#f3ff72]" title="Due Date">{{new Date(task.dueDate).toISOString().split('T')[0]}}</td>
          <td v-if="task.status === 'Pending'" class="cursor-pointer bg-[#f3ff72]" title="Category">{{task.category}}</td>

          <td v-if="task.status === 'In Progress'" class="cursor-pointer bg-[#d1ecf1]" title="View Task">{{ task.title }}</td>
          <td v-if="task.status === 'In Progress'" class="cursor-pointer bg-[#d1ecf1]" title="Due Date">{{new Date(task.dueDate).toISOString().split('T')[0]}}</td>
          <td v-if="task.status === 'In Progress'" class="cursor-pointer bg-[#d1ecf1]" title="Category">{{task.category}}</td>

          <td v-if="task.status === 'Complete'" class="cursor-pointer bg-[#86db9a]" title="View Task">{{ task.title }}</td>
          <td v-if="task.status === 'Complete'" class="cursor-pointer bg-[#86db9a]" title="Due Date">{{new Date(task.dueDate).toISOString().split('T')[0]}}</td>
          <td v-if="task.status === 'Complete'" class="cursor-pointer bg-[#86db9a]" title="Category">{{task.category}}</td>

        </tr>
      </tbody>
      <tbody v-if="taskListStore.viewStatus == 'text'">
        <tr v-for="task in taskList" :key="task._id" @click.prevent="openViewTaskDetailsModal(task._id)">
          <td class="cursor-pointer" title="View Task">{{ task.title }}</td>
          <td class="cursor-pointer" title="Due Date">{{new Date(task.dueDate).toISOString().split('T')[0]}}</td>
          <td class="cursor-pointer" title="Category">{{task.category}}</td>
          <td class="cursor-pointer" title="Status">{{task.status}}</td>


        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import CreateTaskModal from '@/components/Tasks/CreateTask.vue';
  import FilterTaskModal from '@/components/Tasks/FilterTask.vue';
  import ViewTaskDetailsModal from '@/components/Tasks/ViewTask.vue';
  import ChangeTaskStatusModal from '@/components/Tasks/ChangeStatus.vue';
  import UpdateTaskStatusModal from '@/components/Tasks/UpdateTask.vue';

  import ViewSubordinatesModal from '@/components/Users/ViewSubordinates.vue';
  import ViewSupervisorsModal from '@/components/Users/ViewSupervisors.vue';
  import ViewNotificationsModal from '@/components/Users/ViewNotification.vue';

  import { useTaskModalStore } from '@/stores/Tasks/taskModals';
  import { useViewTaskListStore } from '@/stores/Tasks/viewTaskList'
  import { useUserModalStore } from '@/stores/Users/userModals';

  const userModals = useUserModalStore();

  const taskModals = useTaskModalStore();

  const openCreateTaskModal = () =>{
    taskModals.openModal('createTaskModal' )
  }

  const openViewTaskDetailsModal = (data) =>{
    console.log("Presend Data: " + data)
    taskModals.openModal('viewTaskModal',{id: data})
  }

  const openFilterTaskModal = () =>{
    taskModals.openModal('filterTaskModal' )
  }

  const taskListStore = useViewTaskListStore();
  let taskList = ref(taskListStore.taskList);

  onMounted(async () => {
    await taskListStore.getTasks(); // Replace with your API endpoint
    taskList.value = new Array();
    taskList.value = taskListStore.taskList;
    });

    watch(
      () => taskModals.modals.filterTaskModal.isOpen,  // Watched value
      async (newValue, oldValue) => {
        console.log(`Filter Modal changed from ${oldValue} to ${newValue}`);
        if(!newValue) {
          await taskListStore.getTasks();
          taskList.value = new Array;
          taskList.value = taskListStore.taskList;
        }

      }
    );
    watch(
      () => taskModals.modals.createTaskModal.isOpen,  // Watched value
      async (newValue, oldValue) => {
        console.log(`Create Modal changed from ${oldValue} to ${newValue}`);
        if(!newValue) {
          await taskListStore.getTasks();
          taskList.value = new Array;
          taskList.value = taskListStore.taskList;
        }

      }
    );
    watch(
      () => taskModals.modals.statusTaskModal.isOpen,  // Watched value
      async (newValue, oldValue) => {
        console.log(`Status Modal changed from ${oldValue} to ${newValue}`);
        if(!newValue) {
          await taskListStore.getTasks();
          taskList.value = new Array;
          taskList.value = taskListStore.taskList;
        }

      }
    );
    watch(
      () => taskModals.modals.updateTaskModal.isOpen,  // Watched value
      async (newValue, oldValue) => {
        console.log(`Update Modal changed from ${oldValue} to ${newValue}`);
        if(!newValue) {
          await taskListStore.getTasks();
          taskList.value = new Array;
          taskList.value = taskListStore.taskList;
        }

      }
    );
    watch(
      () => taskModals.modals.viewTaskModal.isOpen,  // Watched value
      async (newValue, oldValue) => {
        console.log(`View Modal changed from ${oldValue} to ${newValue}`);
        if(!newValue) {
          await taskListStore.getTasks();
          taskList.value = new Array;
          taskList.value = taskListStore.taskList;
        }

      }
    );






async function handleChange() {

  if(taskListStore.viewType == "own"){
    await taskListStore.viewOwnTasks();
  }
  else if(taskListStore.viewType == "assigned"){
    await taskListStore.viewAssignedTasks();
  }
  else{
    await taskListStore.viewAllTasks();
  }
  taskList.value = new Array();
  taskList.value = taskListStore.taskList;

}



</script>
<style>
tr:nth-child(even){
  background-color: #ede8e87e;
}
</style>
<style>
  tr:nth-child(even){
    background-color: #ede8e87e;
  }
</style>
