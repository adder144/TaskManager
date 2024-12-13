import { defineStore } from 'pinia';
import { useUserModalStore } from '@/stores/Users/userModals';
import axios from 'axios';

export const useViewSupervisorsStore = defineStore('viewSupervisorsStore', {
  state: () => ({
    ownSupervisorList: [],
  }),
  actions: {
    async getSupervisors() {
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
        };

        const response = await axios.post('http://localhost:5000/api/users/List',null, config);
        this.ownSupervisorList = new Array;
        await response.data.forEach((supervisor)=>{
          this.ownSupervisorList.push(supervisor);
        })
        console.log(response.data);
        return 1;

      }catch(err){console.log(err)}
    },
    closeModal(){
      const userModals = useUserModalStore();
      userModals.closeModal('viewSupervisors')

    }
  },
});
