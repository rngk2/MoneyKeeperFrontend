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
  categoriesDelete: (id: number, params?: RequestParams) => any;
  categoriesDetail: (id: number, params?: RequestParams) => any;
  categoriesList: (params?: RequestParams) => any;
  bynameDelete: (categoryName: string, params?: RequestParams) => any;
  categoriesUpdate: (id: number, data: UpdateCategoryDto, params?: RequestParams) => any;
  categoriesCreate: (data: CreateCategoryDto, params?: RequestParams) => any
}

export interface TransactionsApi {
  ofUserList: (query: { from: number; to: number; like?: string; when?: string }, params?: RequestParams) => any;
  transactionsDetail: (id: number, params?: RequestParams) => any;
  transactionsCreate: (data: CreateTransactionDto, params?: RequestParams) => any;
  transactionsDelete: (id: number, params?: RequestParams) => any;
  transactionsList: (params?: RequestParams) => any
}

