import {
  ApiContractAuthenticateRequest,
  ApiContractCreateCategory,
  ApiContractCreateTransaction,
  ApiContractCreateUser,
  ApiContractOrderType,
  ApiContractTransactionField,
  ApiContractUpdateCategory,
  ApiContractUpdateUser,
  RequestParams
} from "./api.generated";

export interface AuthApi {
  authenticateCreate: (data: ApiContractAuthenticateRequest, params?: RequestParams) => any;
  refreshTokenCreate: (params?: RequestParams) => any;
}

export interface UsersApi {
  usersList: (params?: RequestParams) => any;
  usersCreate: (data: ApiContractCreateUser, params?: RequestParams) => any;
  usersUpdate: (data: ApiContractUpdateUser, params?: RequestParams) => any;
  usersDelete: (params?: RequestParams) => any;
}

export interface CategoriesApi {
  categoriesDetail: (id: number, params?: RequestParams) => any;
  categoriesUpdate: (categoryId: number, data: ApiContractUpdateCategory, params?: RequestParams) => any;
  categoriesDelete: (id: number, params?: RequestParams) => any;
  categoriesList: (params?: RequestParams) => any;
  categoriesCreate: (data: ApiContractCreateCategory, params?: RequestParams) => any;
  categoriesDelete2: (query?: { categoryName?: string }, params?: RequestParams) => any;
  overviewList: (query?: { from?: number; to?: number }, params?: RequestParams) => any;
  earningsOverviewList: (params?: RequestParams) => any;
  overviewDetail: (categoryId: number, params?: RequestParams) => any;
}

export interface TransactionsApi {
  transactionsDetail: (id: number, params?: RequestParams) => any;
  transactionsDelete: (id: number, params?: RequestParams) => any;
  categoryTransactionsDetail: (categoryId: number, query: { from: number; to: number }, params?: RequestParams) => any;
  userTransactionsList: (query: { from: number; to: number; orderByField: ApiContractTransactionField; order: ApiContractOrderType; searchPattern?: string }, params?: RequestParams) => any;
  summaryList: (params?: RequestParams) => any;
  totalList: (params?: RequestParams) => any;
  totalMonthList: (params?: RequestParams) => any;
  totalYearList: (params?: RequestParams) => any;
  transactionsCreate: (data: ApiContractCreateTransaction, params?: RequestParams) => any;
}

