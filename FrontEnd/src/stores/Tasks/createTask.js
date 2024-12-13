import { defineStore } from 'pinia';
import { useTaskModalStore } from '@/stores/Tasks/taskModals';
import axios from 'axios';

export const useCreateTaskStore = defineStore('createTaskform', {
  state: () => ({
    formData: {
      title: '',
      description: '',
      dueDate: '',
      category: '',
      dependency: '',
      status: '',
      AssignedID: '',
    },
    subordinateList: [],
    taskList:[],
  }),
  actions: {
    async getSubordinate() {
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
        };
        const response = await axios.get('http://localhost:5000/api/users/List', config);
        this.subordinateList = new Array;
        await response.data.forEach((subordinate)=>{
          this.subordinateList.push(subordinate);
        })

      }catch(err){console.log(err)}
    },
    async getTaskList() {
      try{
        const token = localStorage.getItem('token');
        const config2 = {
          headers: {
            Authorization: 'Bearer '+token,
          },
        };
        const response = await axios.post('http://localhost:5000/api/tasks/ViewTasks',null, config2);
        this.taskList = new Array;
        await response.data.TaskReturns.forEach((task)=>{
          this.taskList.push(task);
        })

      }catch(err){console.log(err)}
    },

    async submitForm() {
      const taskModals = useTaskModalStore();
      const UserRole = JSON.parse(localStorage.getItem('user')).userRole;
        try{
          const token = localStorage.getItem('token');

          const params = {
            title: this.formData.title,
            description: this.formData.description,
            dueDate: this.formData.dueDate,
            category: this.formData.category,
            dependencyOnAnotherTask: this.formData.dependency,
            status: this.formData.status,
            AssignedID: this.formData.AssignedID,

          }
          const config2 = {
            headers: {
              Authorization: 'Bearer '+token,
            },
          params, // Add query parameters here
          };
          if(UserRole == 'Supervisor'){

          const response = await axios.post('http://localhost:5000/api/tasks/',null, config2);
          console.log(response.data);
          }else{
            const response = await axios.put('http://localhost:5000/api/tasks/',null, config2);
            console.log(response.data);

          }

          taskModals.closeModal('createTaskModal');


        }catch(err){console.log(err)}




      this.formData = {title: '',description: '', dueDate: '', category: '', dependency: '', status: '', assignedUser: '',},
      this.submitted = false;

    },
  },
});
