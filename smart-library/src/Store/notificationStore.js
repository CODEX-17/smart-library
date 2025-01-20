import { create } from 'zustand'

const notificationStore = create((set) => ({
    message: '',
    notifStatus: true,
    isShowNotification: false,
    notificationConfig: (message, notifStatus) => {
        set({ 
            message, 
            notifStatus,
            isShowNotification: true,
        })
        setTimeout(() => {
            set({ isShowNotification: false })
        }, 3000);
    },
}))

export default notificationStore;