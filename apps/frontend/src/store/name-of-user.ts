import { makeAutoObservable, runInAction } from "mobx";

const userStore = {
  name: "",

  setName(name: string) {
    this.name = name;
  },

  async fetchUsers() {
    try {
      const res = await fetch("http://localhost:3000/api");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

    
      runInAction(() => {
        this.setName(data.name); 
      });
    } catch (err) {
      console.error("Ошибка при загрузке пользователей:", err);
    }
  },
};

makeAutoObservable(userStore);

export default userStore;
