import { defineStore } from 'pinia';
import { useTaskModalStore } from '@/stores/Tasks/taskModals';
import axios from 'axios';

export const useUpdateTaskStore = defineStore('updateTaskform', {
  state: () => ({
    formData: {

      title: '',
      description: '',
      dueDate: '',
      category: '',
      dependency: '',
      status: '',
      AssignedID: '',
      assignedUserID: "",
      dependencyOnAnotherTask: "",
      dependTaskTitle: "",
    },
    subordinateList: [],
    taskList:[],
    TaskID: '',
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
        console.log(response.data);

        this.subordinateList = new Array;
        await response.data.forEach((subordinate)=>{
          this.subordinateList.push(subordinate);
        })

      }catch(err){console.log(err)}
    },
    async getTaskList() {
      try{
        const token = localStorage.getItem('token');
        console.log(token);
        const config2 = {
          headers: {
            Authorization: 'Bearer '+token,
          },
        };
        const response = await axios.post('http://localhost:5000/api/tasks/ViewTasks',null, config2);
        console.log(response.data.TaskReturns);

        this.taskList = new Array;
        await response.data.TaskReturns.forEach((task)=>{
          this.taskList.push(task);
        })

      }catch(err){console.log(err)}
    },
    async  sendRequest () {
      try {
        const taskModals = useTaskModalStore();
        const TaskID = taskModals.modals.updateTaskModal.data.id;
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
        console.log(response.data.taskReturn);
        const dateVariable = new Date(response.data.taskReturn.dueDate).toISOString().split('T')[0]
        this.formData = new FormData();
        this.formData = {
          title: response.data.taskReturn.title,
          description: response.data.taskReturn.description,
          dueDate: dateVariable,
          category: response.data.taskReturn.category,
          dependency: response.data.taskReturn.dependencyOnAnotherTask,
          status: response.data.taskReturn.status,
          AssignedID: response.data.taskReturn.assignedUserID,
          assignedUserID: response.data.taskReturn.assignedUserID,
          dependencyOnAnotherTask: response.data.taskReturn.dependencyOnAnotherTask,
          dependTaskTitle: response.data.taskReturn.dependTaskTitle,

        }
        console.log(this.formData);
      } catch (error) {
          console.error(error);
      }
    },
    async submitForm() {

        try{
          const token = localStorage.getItem('token');
          const taskModals = useTaskModalStore();
          const TaskID = taskModals.modals.updateTaskModal.data.id;

          const params = {
            TaskID: TaskID,
            title: this.formData.title,
            description: this.formData.description,
            dueDate: this.formData.dueDate,
            category: this.formData.category,
            dependencyOnAnotherTask: this.formData.dependencyOnAnotherTask,
            status: this.formData.status,
            assignedUser: this.formData.assignedUserID,
          }

          const config2 = {
            headers: {
              Authorization: 'Bearer '+token,
            },
          params,
          };

          const response = await axios.patch('http://localhost:5000/api/tasks/',null, config2);
          console.log(response.data);
          taskModals.closeModal('updateTaskModal');


        }catch(err){console.log(err)}




      this.formData = {title: '',description: '', dueDate: '', category: '', dependency: '', status: '', assignedUser: '',},
      this.submitted = false;

    },
  },
});
