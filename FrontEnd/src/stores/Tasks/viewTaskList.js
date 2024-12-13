import { defineStore } from 'pinia';
import { useTaskModalStore } from '@/stores/Tasks/taskModals';
import axios from 'axios';

export const useViewTaskListStore = defineStore('getTaskList', {
  state: () => ({
    taskList : [],
    returnData: [],
    params: {
      Title : "",
      Category : "",
      Status : "",
      DueDateAfter : "",
      DueDateBefore : "",
      SortBy : "dueDate",
      SortOrder : "ascending"
    },
    viewType: 'all',
    viewStatus: 'text',

  }),
  actions: {
    async submitParametes() {
      console.log('Form submitted:', this.params);
      await this.getTasks();
      this.closeModal();

    },
    clearParametes() {
      this.params = {
        Title : "",
        Category : "",
        Status : "",
        DueDateAfter : "",
        DueDateBefore : "",
        SortBy : "dueDate",
        SortOrder : "ascending"
      }

    },
    closeModal() {
      const taskModals = useTaskModalStore();
      taskModals.closeModal('filterTaskModal');
      console.log('Closed Filter Modal')
    },
    async getTasks () {
      try {
        const params = this.params;
        const token = localStorage.getItem('token');

        const config = {
          headers: {
              Authorization: 'Bearer '+token,
          },
          params,
        };

        const response = await axios.get('http://localhost:5000/api/tasks/ViewTasks', config);

        this.returnData = new Array;
        await response.data.TaskReturns.forEach((task)=>{
          this.returnData.push(task);
        })

        this.taskList = new Array;
        if(this.viewType == 'own' ){
          await this.returnData.forEach((task)=>{
            if(task.ownerID == task.assignedUserID) this.taskList.push(task);
          })
        }
        else if(this.viewType == 'assigned' ){
          await this.returnData.forEach((task)=>{
            if(task.ownerID != task.assignedUserID) this.taskList.push(task);
          })
        }
        else{
          await this.returnData.forEach((task)=>{
            this.taskList.push(task);
          })
        }
        console.log(this.taskList);
      } catch (error) {
          console.error(error);
      }
    },
    async viewAllTasks (){
      this.taskList = new Array;
      await this.returnData.forEach((task)=>{
        this.taskList.push(task);
      });
      console.log("Listing All Tasks")
      console.log(this.taskList);
    },
    async viewOwnTasks(){
      this.taskList = new Array;
      await this.returnData.forEach((task)=>{
        if(task.ownerID == task.assignedUserID) this.taskList.push(task);
      });
      console.log("Listing Own Tasks")
      console.log(this.taskList);

    },
    async viewAssignedTasks(){
      this.taskList = new Array;
      await this.returnData.forEach((task)=>{
        if(task.ownerID != task.assignedUserID) this.taskList.push(task);
      });
      console.log("Listing Assigned Tasks")
      console.log(this.taskList);

    }
  },
});
