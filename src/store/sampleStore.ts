import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface USER_STATE {
  firstName: string | null;
  setFirstName: (payload: string | null) => void;
}

export const userStore = createStore<USER_STATE>()(
  devtools(
    persist(
      (set) => ({
        firstName: null,

        setFirstName: (payload) => set(() => ({ firstName: payload })),
      }),
      // make sure to give unique name to store
      { name: "UserStore" }
    )
  )
);

// to use from store
// const { firstName, setFirstName } = userStore.getState();
