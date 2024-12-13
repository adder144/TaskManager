import { defineStore } from 'pinia';

export const useTaskModalStore = defineStore('taskModalManagement', {
  state: () => ({
    modals: {
      createTaskModal: { isOpen: false, data: null },
      viewTaskModal: { isOpen: false, data: null },
      filterTaskModal: { isOpen: false, data: null },
      statusTaskModal: { isOpen: false, data: null },
      updateTaskModal: { isOpen: false, data: null },
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
