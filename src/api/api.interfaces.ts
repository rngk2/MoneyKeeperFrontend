import {
  AuthenticateRequest, CreateCategoryDto, CreateTransactionDto,
  CreateUserDto,
  RequestParams,
  UpdateCategoryDto,
  UpdateUserDto
} from './api.generated';

export interface UsersApi {
  usersList: (params?: RequestParams) => any;
  usersDelete: (params?: RequestParams) => any;
  usersCreate: (data: CreateUserDto, params?: RequestParams) => any;
  summaryList: (params?: RequestParams) => any;
  totalYearList: (params?: RequestParams) => any;
  refreshTokenCreate: (params?: RequestParams) => any;
  usersUpdate: (data: UpdateUserDto, params?: RequestParams) => any;
  authenticateCreate: (data: AuthenticateRequest, params?: RequestParams) => any;
  totalMonthList: (params?: RequestParams) => any
}

export interface CategoriesApi {
  categoriesDetail: (id: number, params?: RequestParams) => any;
  categoriesUpdate: (id: string, data: UpdateCategoryDto, query?: { categoryId?: number }, params?: RequestParams) => any;
  categoriesDelete: (id: number, params?: RequestParams) => any;
  categoriesList: (params?: RequestParams) => any;
  categoriesCreate: (data: CreateCategoryDto, params?: RequestParams) => any;
  byNameDelete: (categoryName: string, params?: RequestParams) => any;
}

export interface TransactionsApi {
  transactionsDetail: (id: number, params?: RequestParams) => any;
  transactionsDelete: (id: number, params?: RequestParams) => any;
  ofUserList: (query: { from: number; to: number; like?: string; when?: string }, params?: RequestParams) => any;
  transactionsCreate: (data: CreateTransactionDto, params?: RequestParams) => any;
}

