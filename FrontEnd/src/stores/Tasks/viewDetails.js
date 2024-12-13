import { defineStore } from 'pinia';
import { useTaskModalStore } from '@/stores/Tasks/taskModals';
import axios from 'axios';

export const useDetailTaskStore = defineStore('viewTaskDetails', {
  state: () => ({
    formData: {
    },
    TaskID: ''
  }),
  actions: {
    async  sendRequest () {
      try {
        const taskModals = useTaskModalStore();
        const TaskID = taskModals.modals.viewTaskModal.data.id;
        const params = {
          TaskID: TaskID,
        };
        console.log("Send Function Recieved Paramenters: "+JSON.stringify(params));
        const token = localStorage.getItem('token');
        const config = {
          headers: {
              Authorization: 'Bearer '+token,
          },
          params,
        };

        const response = await axios.get('http://localhost:5000/api/tasks/', config);
        console.log(response.data.taskReturn.status);
        const dateVariable = new Date(response.data.taskReturn.dueDate).toISOString().split('T')[0]
        this.formData = new FormData();
        this.formData = response.data.taskReturn;
        this.formData.dueDate = dateVariable;
        console.log(this.formData);
      } catch (error) {
          console.error(error);
      }
    },
    async  deleteTask () {
      try {
        const taskModals = useTaskModalStore();
        const TaskID = taskModals.modals.viewTaskModal.data.id;
        const params = {
          TaskID: TaskID,
        };

        console.log("Send Function Recieved Paramenters: "+JSON.stringify(params));
        const token = localStorage.getItem('token');
        const config = {
          headers: {
              Authorization: 'Bearer '+token,
          },
          params,
        };

        const response = await axios.delete('http://localhost:5000/api/tasks/', config);
        console.log(response.data);
        taskModals.closeModal('viewTaskModal');
      } catch (error) {
          console.error(error);
      }
    },
    closeModal() {
      const taskModals = useTaskModalStore();
      taskModals.closeModal('viewTaskModal');
    },
  },
});
