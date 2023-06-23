import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (message: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (message) => set(() => ({ user: message })),
  logout: () => set(() => ({ user: "" })),
}));

export default useAuthStore;
