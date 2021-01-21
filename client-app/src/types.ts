export interface User {
  username: string;
  id: number;
  token: string;
}

export interface Recipe {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  username: string;
  imgUrl: string;
  ingredients: Ingredients[];
  tags: Tags[];
  vote: number;
  userVote: number;
}

export interface RecipePaginated {
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  recipes: Recipe[];
}

export interface Tags {
  id: number;
  name: string;
}

export interface Ingredients {
  name: string;
  amount: number;
  suffix: string;
}
