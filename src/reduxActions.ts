

export type ActionType = { type: string, payload: any }

export const Actions: ActionsInterface = {
  User: {
   USER_GQL: "USER_GQL",
   UPDATE_MESSAGES: "UPDATE_MESSAGES",
  }
}

interface ActionsInterface {
  User: {
   USER_GQL: string
   UPDATE_MESSAGES: string
  }
}

