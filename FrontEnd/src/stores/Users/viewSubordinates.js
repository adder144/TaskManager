import { defineStore } from 'pinia';
import { useUserModalStore } from '@/stores/Users/userModals';
import axios from 'axios';

export const useViewSubordinatesStore = defineStore('viewSubordinatesStore', {
  state: () => ({
    allSubordinateList: [],
    ownSubordinateList: [],
    otherSubordinateList: [],
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

        const response = await axios.get('http://localhost:5000/api/users/', config);
        this.allSubordinateList = new Array;
        const allSubordinateID = new Array;
        await response.data.forEach((subordinate)=>{
          this.allSubordinateList.push(subordinate);
          allSubordinateID.push(subordinate.ID);
        })
        console.log('All Subordiante ID: ',allSubordinateID);

        const response2 = await axios.get('http://localhost:5000/api/users/List', config);
        this.ownSubordinateList = new Array;
        const ownSubordinateID = new Array;
        await response2.data.forEach((subordinate)=>{
          this.ownSubordinateList.push(subordinate);
          ownSubordinateID.push(subordinate.ID);
        })
        console.log('Own Subordiante ID: ',ownSubordinateID);


        this.otherSubordinateList = new Array;
        this.allSubordinateList.forEach(item => {
          if (!ownSubordinateID.includes(item.ID)) {
            console.log("NOT IN OWN",item);
            this.otherSubordinateList.push(item);
          }else{
            console.log("IS IN OWN",item);

          }
        });
        console.log('other Subordiante List: ',this.otherSubordinateList);



      }catch(err){console.log(err)}
    },
    async addSubordinate(subordinate) {
      try{
        const token = localStorage.getItem('token');
        const params = {SubordinateID: subordinate}
        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
          params
        };
        const response = await axios.post('http://localhost:5000/api/users/',null, config);
        console.log(response);
        this.getSubordinate();
        return 1;
      }catch(err){console.log(err)}

    },
    async removeSubordinate(subordinate) {
      try{
        const token = localStorage.getItem('token');
        const params = {SubordinateID: subordinate}
        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
          params
        };
        const response = await axios.delete('http://localhost:5000/api/users/', config);
        console.log(response);
        this.getSubordinate();
        return 1;
      }catch(err){console.log(err)}

    },
    closeModal(){
      const userModals = useUserModalStore();
      userModals.closeModal('viewSubordinates')

    }
  },
});
