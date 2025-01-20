import { create } from "zustand";

const loadingStore = create((set) => ({
    loadingMessage: 'Loading...',
    isShowLoading: false,
    handleConfigLoading: (loadingMessage) => {
        set({ isShowLoading: true, loadingMessage })
        setTimeout(() => {
            set({ isShowLoading: false, loadingMessage: 'Loading...' })
        }, 3000)
    }
}))

export default loadingStore