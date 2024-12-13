import { defineStore } from 'pinia';

export const useUserModalStore = defineStore('userModalManagement', {
  state: () => ({
    modals: {
      viewSubordinates: { isOpen: false, data: null },
      viewSupervisors: { isOpen: false, data: null },
      viewNotifictions: { isOpen: false, data: null },
    },
  }),
  actions: {
    openModal(modalName, data = null) {
      console.log("opening Modal Now: "+modalName)
      if (this.modals[modalName]) {
        this.modals[modalName].data = data;
        this.modals[modalName].isOpen = true;
        console.log("Modal Opened: "+modalName+"\nSent Data: "+JSON.stringify(this.modals[modalName].data)+ "\nOpened Status: "+JSON.stringify(this.modals[modalName].isOpen));
      }
    },
    closeModal(modalName) {
      if (this.modals[modalName]) {
        this.modals[modalName].isOpen = false;
        this.modals[modalName].data = null;
      }
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((key) => {
        this.modals[key] = false;
      });
    },
  },
});
