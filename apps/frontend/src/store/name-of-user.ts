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

      // допустим, в data есть поле data.name
      runInAction(() => {
        this.setName(data.name); // или data[0].name — в зависимости от API
      });
    } catch (err) {
      console.error("Ошибка при загрузке пользователей:", err);
    }
  },
};

makeAutoObservable(userStore);

export default userStore;
