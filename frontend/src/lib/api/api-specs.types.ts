/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/auth/sign-up": {
    /** Create User */
    post: operations["create_user_auth_sign_up_post"];
  };
  "/auth/sign-in": {
    /** Authenticate User */
    post: operations["authenticate_user_auth_sign_in_post"];
  };
  "/users/": {
    /** Get Authenticated User */
    get: operations["get_authenticated_user_users__get"];
    /** Delete Authenticated User */
    delete: operations["delete_authenticated_user_users__delete"];
  };
  "/users/{user_id}/posts": {
    /** Get User Posts */
    get: operations["get_user_posts_users__user_id__posts_get"];
  };
  "/posts/{post_id}": {
    /** Get Post */
    get: operations["get_post_posts__post_id__get"];
    /** Edit Post */
    put: operations["edit_post_posts__post_id__put"];
    /** Delete Post */
    delete: operations["delete_post_posts__post_id__delete"];
  };
  "/posts/{post_id}/likes": {
    /** Get Likes On Post */
    get: operations["get_likes_on_post_posts__post_id__likes_get"];
  };
  "/posts/{post_id}/comments": {
    /** Get Comments On Post */
    get: operations["get_comments_on_post_posts__post_id__comments_get"];
  };
  "/posts": {
    /** Create Post */
    post: operations["create_post_posts_post"];
  };
  "/posts/{post_id}/like": {
    /** Like A Post */
    post: operations["like_a_post_posts__post_id__like_post"];
    /** Remove Like From A Post */
    delete: operations["remove_like_from_a_post_posts__post_id__like_delete"];
  };
  "/comments": {
    /** Create Comment */
    post: operations["create_comment_comments_post"];
  };
  "/comments/{comment_id}": {
    /** Edit Comment */
    put: operations["edit_comment_comments__comment_id__put"];
  };
  "/": {
    /** Ping */
    get: operations["ping__get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** AuthToken */
    AuthToken: {
      /** Access Token */
      access_token: string;
      /**
       * Token Type
       * @default bearer
       */
      token_type?: string;
    };
    /** Body_authenticate_user_auth_sign_in_post */
    Body_authenticate_user_auth_sign_in_post: {
      /** Grant Type */
      grant_type?: string | null;
      /** Username */
      username: string;
      /** Password */
      password: string;
      /**
       * Scope
       * @default
       */
      scope?: string;
      /** Client Id */
      client_id?: string | null;
      /** Client Secret */
      client_secret?: string | null;
    };
    /** Comment */
    Comment: {
      /** Content */
      content: string;
      /** Commenter Id */
      commenter_id: number;
      /** Post Id */
      post_id: number;
      /** Id */
      id: number;
      /**
       * Posted On
       * Format: date-time
       */
      posted_on: string;
      /** Edited */
      edited: boolean;
      /** Commenter */
      commenter: string;
    };
    /** CommentCreate */
    CommentCreate: {
      /** Content */
      content: string;
      /** Commenter Id */
      commenter_id: number;
      /** Post Id */
      post_id: number;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** Like */
    Like: {
      /** User Id */
      user_id: number;
      /** Post Id */
      post_id: number;
      /** Id */
      id: number;
      /**
       * Liked On
       * Format: date-time
       */
      liked_on: string;
      /** User */
      user: string;
    };
    /** Post */
    Post: {
      /** Content */
      content: string;
      /** Poster Id */
      poster_id: number;
      /** Id */
      id: number;
      /**
       * Posted On
       * Format: date-time
       */
      posted_on: string;
      /** Edited */
      edited: boolean;
      /** Comments */
      comments?: components["schemas"]["Comment"][] | null;
      /** Likes */
      likes?: components["schemas"]["Like"][] | null;
    };
    /** PostCreate */
    PostCreate: {
      /** Content */
      content: string;
      /** Poster Id */
      poster_id: number;
    };
    /** User */
    User: {
      /** Username */
      username: string;
      /** Id */
      id: number;
      /** Signed Up On */
      signed_up_on?: string | null;
      /** Posts */
      posts?: components["schemas"]["Post"][] | null;
      /** Comments */
      comments?: components["schemas"]["Comment"][] | null;
      /** Likes */
      likes?: components["schemas"]["Like"][] | null;
    };
    /** UserCreate */
    UserCreate: {
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Create User */
  create_user_auth_sign_up_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Authenticate User */
  authenticate_user_auth_sign_in_post: {
    requestBody: {
      content: {
        "application/x-www-form-urlencoded": components["schemas"]["Body_authenticate_user_auth_sign_in_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["AuthToken"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Authenticated User */
  get_authenticated_user_users__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
  };
  /** Delete Authenticated User */
  delete_authenticated_user_users__delete: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /** Get User Posts */
  get_user_posts_users__user_id__posts_get: {
    parameters: {
      path: {
        user_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Post"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Post */
  get_post_posts__post_id__get: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Edit Post */
  edit_post_posts__post_id__put: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete Post */
  delete_post_posts__post_id__delete: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Likes On Post */
  get_likes_on_post_posts__post_id__likes_get: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Like"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Comments On Post */
  get_comments_on_post_posts__post_id__comments_get: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Comment"][];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Create Post */
  create_post_posts_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PostCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Like A Post */
  like_a_post_posts__post_id__like_post: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Like"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Remove Like From A Post */
  remove_like_from_a_post_posts__post_id__like_delete: {
    parameters: {
      path: {
        post_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Create Comment */
  create_comment_comments_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CommentCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Comment"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Edit Comment */
  edit_comment_comments__comment_id__put: {
    parameters: {
      path: {
        comment_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CommentCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Comment"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Ping */
  ping__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
}
