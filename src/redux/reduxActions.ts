

export type ActionType = { type: string, payload: any }

export const Actions: ActionsInterface = {
  User: {
   UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
  }
}

interface ActionsInterface {
  User: {
   UPDATE_USER_GQL: string
  }
}

