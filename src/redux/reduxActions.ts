

export type ActionType = { type: string, payload: any }

export const Actions: ActionsInterface = {
  User: {
   UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
   UPDATE_NEWS_CATEGORY: "UPDATE_NEWS_CATEGORY",
   UPDATE_NEWS_PUBLISHER: "UPDATE_NEWS_PUBLISHER",
   UPDATE_LIKED_ARTICLES: "UPDATE_LIKED_ARTICLES",
  }
}

interface ActionsInterface {
  User: {
   UPDATE_USER_PROFILE: string
   UPDATE_NEWS_CATEGORY: string
   UPDATE_NEWS_PUBLISHER: string
   UPDATE_LIKED_ARTICLES: string
  }
}

