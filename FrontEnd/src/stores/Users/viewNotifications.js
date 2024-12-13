import { defineStore } from 'pinia';
import { useUserModalStore } from '@/stores/Users/userModals';
import axios from 'axios';

export const useViewNotificationsStore = defineStore('viewNotificationsStore', {
  state: () => ({
    allNotifications: [],
    unReadNotifications: [],
    readNotifications: [],

  }),
  actions: {
    async getNotifications() {
      console.log("Getting Notifications")
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
        };

        const response = await axios.get('http://localhost:5000/api/notification/', config);
        this.allNotifications = new Array;
        await response.data.notifications.forEach((notification)=>{
          this.allNotifications.push(notification);
        })

        const response2 = await axios.post('http://localhost:5000/api/notification/',null, config);
        this.unReadNotifications = new Array;
        const unReadNotificationID = new Array;
        await response2.data.notifications.forEach((notification)=>{
          this.unReadNotifications.push(notification);
          unReadNotificationID.push(notification._id);
        })




        this.readNotifications = new Array;
        this.allNotifications.forEach(notification => {
          if (!unReadNotificationID.includes(notification._id)) {
            this.readNotifications.push(notification);
          }
        });


      }catch(err){console.log(err)}
    },
    async markRead(notification) {
      try{
        const token = localStorage.getItem('token');
        const params = {NotificationID: notification};
        console.log('Sending Params: ', params, token);

        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
          params
        };
        const response = await axios.post('http://localhost:5000/api/notification/MarkRead',null, config);
        console.log(response);
        this.getNotifications();
        return 1;
      }catch(err){console.log(err)}

    },
    async markAllRead() {
      try{
        const token = localStorage.getItem('token');

        const config = {
          headers: {
            Authorization: 'Bearer '+token,
          },
        };
        const response = await axios.get('http://localhost:5000/api/notification/MarkRead', config);
        console.log(response);
        this.getNotifications();
        return 1;
      }catch(err){console.log(err)}

    },
    closeModal(){
      const userModals = useUserModalStore();
      userModals.closeModal('viewSubordinates')

    }
  },
});
