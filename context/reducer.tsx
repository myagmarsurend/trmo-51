export interface IState {
  loading: boolean;
  user: string;
}

interface ILogout {
  type: "LOGOUT";
  value: boolean;
}

interface ILogin {
  type: "LOGIN";
  value: boolean;
}

type Actions = ILogin | ILogout;

export const initialState: IState = {
  loading: true,
  user: "",
};

export const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "LOGOUT":
      return { ...state, loading: false, user: "No one" };
    case "LOGIN":
      return { ...state, loading: true, user: "Mike" };
  }
};
