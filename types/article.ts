export interface ICreateArtcile {
  title: string;
  isPublished: boolean;
  content: string;
}

export interface iArticleDetailResponse {
  isSuccess: boolean;
  message: string;
  article: {
    id: number;
    title: string;
    content: string;
    is_published: boolean;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    user: {
      fullname: string;
      email: string;
      profilePhoto: string;
    };
  };
}
