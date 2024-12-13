import { defineStore } from 'pinia';
import { useTaskModalStore } from '@/stores/Tasks/taskModals';
import axios from 'axios';

export const useChangeTaskStatusStore = defineStore('changeTaskStatus', {
  state: () => ({
    formData: {
      status: 'Pending'
    },
    TaskID: ''
  }),
  actions: {
    closeModal() {
      console.log('ChangeStatus Starting closeModal')
      const taskModals = useTaskModalStore();
      taskModals.closeModal('statusTaskModal');
      console.log('ChangeStatus Ending closeModal')

    },

    async  sendRequest () {
      console.log('ChangeStatus Starting sendRequest')

      try {
        const taskModals = useTaskModalStore();
        const TaskID = taskModals.modals.statusTaskModal.data.id;
        const params = {
          TaskID: TaskID,
        };

        const token = localStorage.getItem('token');
        const config = {
          headers: {
              Authorization: 'Bearer '+token,
          },
          params,
        };

        const response = await axios.get('http://localhost:5000/api/tasks/', config);
        this.formData = new FormData();
        this.formData = response.data.taskReturn;

        console.log('ChangeStatus Ending sendRequest')

      } catch (error) {
          console.log(error);
      }
    },
    async  sendChangeStatusRequest () {
      console.log('ChangeStatus Starting sendChangeStatusRequest')

      try {
        const taskModals = useTaskModalStore();
        const TaskID = taskModals.modals.statusTaskModal.data.id;
        const taskStatus = this.formData.status;
        const params = {
          TaskID: TaskID,
          Status: taskStatus,
        };

        const token = localStorage.getItem('token');
        const config = {
          headers: {
              Authorization: 'Bearer '+token,
          },
          params,
        };

        const response = await axios.post('http://localhost:5000/api/tasks/ChangeTaskStatus',null, config);
        console.log(response.data);
        taskModals.closeModal('statusTaskModal');
        console.log('ChangeStatus Ending sendChangeStatusRequest')

      } catch (error) {
          console.error(error);
      }
    },
  },
});
