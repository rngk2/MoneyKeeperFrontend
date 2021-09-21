import {
  AuthenticateRequest, CreateCategoryDto, CreateTransactionDto,
  CreateUserDto, OrderType,
  RequestParams, TransactionField,
  UpdateCategoryDto,
  UpdateUserDto
} from './api.generated';

export interface AuthApi {
  authenticateCreate: (data: AuthenticateRequest, params?: RequestParams) => any;
  refreshTokenCreate: (params?: RequestParams) => any;
}

export interface UsersApi {
  usersList: (params?: RequestParams) => any;
  usersCreate: (data: CreateUserDto, params?: RequestParams) => any;
  usersUpdate: (data: UpdateUserDto, params?: RequestParams) => any;
  usersDelete: (params?: RequestParams) => any;
}

export interface CategoriesApi {
  categoriesDetail: (id: number, params?: RequestParams) => any;
  categoriesUpdate: (categoryId: number, data: UpdateCategoryDto, params?: RequestParams) => any
  categoriesDelete: (id: number, params?: RequestParams) => any;
  categoriesList: (params?: RequestParams) => any;
  categoriesCreate: (data: CreateCategoryDto, params?: RequestParams) => any;
  byNameDelete: (categoryName: string, params?: RequestParams) => any;
  overviewList: (query?: { from?: number; to?: number }, params?: RequestParams) => any
}

export interface TransactionsApi {
  transactionsDetail: (id: number, params?: RequestParams) => any;
  transactionsDelete: (id: number, params?: RequestParams) => any;
  categoryTransactionsDetail: (categoryId: number, query: { from: number; to: number }, params?: RequestParams) => any;
  userTransactionsList: (query: { from: number; to: number; orderByField: TransactionField; order: OrderType; searchPattern?: string }, params?: RequestParams) => any;
  summaryList: (params?: RequestParams) => any;
  totalList: (params?: RequestParams) => any;
  totalMonthList: (params?: RequestParams) => any;
  totalYearList: (params?: RequestParams) => any;
  transactionsCreate: (data: CreateTransactionDto, params?: RequestParams) => any;
}

