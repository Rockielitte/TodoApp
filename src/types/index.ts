export enum TODOSTATENUM {
  INCOMPLETE = "incomplete",
  COMPLETED = "completed",
  INPROGRESS = "inprogress",
}

export type TodoItem = {
  id: string;
  title: string;
  state: TODOSTATENUM;
  createdAt: string;
  updatedAt?: string;
};
