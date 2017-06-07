

export type ActionType = { type: string, payload: any }

export const Actions: ActionsInterface = {
  User: {
   USER_GQL: "USER_GQL",
   IS_UPDATING_MY_PREDICTIONS: "IS_UPDATING_MY_PREDICTIONS",
  }
}

interface ActionsInterface {
  User: {
   USER_GQL: string
   UPDATING_MY_PREDICTIONS: string
  }
}

