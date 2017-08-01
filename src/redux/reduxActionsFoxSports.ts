

export type ActionType = { type: string, payload: any }

export const Actions: ActionsInterface = {
  User: {
   USER_GQL: "USER_GQL",
   UPDATE_MESSAGES: "UPDATE_MESSAGES",
   SWITCH_SESSION: "SWITCH_SESSION",
   VOTE_FOR_TEAM: "VOTE_FOR_TEAM",
  }
}

interface ActionsInterface {
  User: {
   USER_GQL: string
   UPDATE_MESSAGES: string
   SWITCH_SESSION: string
   VOTE_FOR_TEAM: number
  }
}

