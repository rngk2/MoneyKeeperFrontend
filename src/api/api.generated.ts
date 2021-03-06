/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiContractAuthenticateRequest {
  email: string;
  password: string;
}

export interface ApiContractAuthenticateResponse {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  jwtToken?: string | null;
}

export interface ApiContractAuthenticateResponseApiResult {
  value?: ApiContractAuthenticateResponse;
  error?: ApiContractIError;
}

export interface ApiContractCategory {
  /** @format int32 */
  id?: number;
  name?: string | null;

  /** @format int32 */
  userId?: number;
}

export interface ApiContractCategoryApiResult {
  value?: ApiContractCategory;
  error?: ApiContractIError;
}

export interface ApiContractCategoryIEnumerableApiResult {
  value?: ApiContractCategory[] | null;
  error?: ApiContractIError;
}

export interface ApiContractCategoryOverview {
  /** @format int32 */
  categoryId?: number;
  categoryName?: string | null;

  /** @format double */
  spentThisMonth?: number;
}

export interface ApiContractCategoryOverviewApiResult {
  value?: ApiContractCategoryOverview;
  error?: ApiContractIError;
}

export interface ApiContractCategoryOverviewIEnumerableApiResult {
  value?: ApiContractCategoryOverview[] | null;
  error?: ApiContractIError;
}

export interface ApiContractCreateCategory {
  name: string;
}

export interface ApiContractCreateTransaction {
  /** @format int32 */
  categoryId: number;

  /** @format double */
  amount: number;

  /** @format date-time */
  timestamp: string;
  comment: string;
}

export interface ApiContractCreateUser {
  firstName: string;
  lastName: string;

  /** @format email */
  email: string;

  /**
   * @format password
   * @pattern ^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,16}$
   */
  password: string;
}

export interface ApiContractIError {
  code?: string | null;
  message?: string | null;
}

export enum ApiContractOrderType {
  ASC = "ASC",
  DESC = "DESC",
}

export interface ApiContractRefreshTokenResponse {
  token?: string | null;
}

export interface ApiContractRefreshTokenResponseApiResult {
  value?: ApiContractRefreshTokenResponse;
  error?: ApiContractIError;
}

export interface ApiContractStringDecimalDictionaryApiResult {
  value?: Record<string, number>;
  error?: ApiContractIError;
}

export interface ApiContractTransaction {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  userId?: number;

  /** @format int32 */
  categoryId?: number;
  categoryName?: string | null;

  /** @format double */
  amount?: number;

  /** @format date-time */
  timestamp?: string;
  comment?: string | null;
}

export interface ApiContractTransactionApiResult {
  value?: ApiContractTransaction;
  error?: ApiContractIError;
}

export enum ApiContractTransactionField {
  CategoryName = "CategoryName",
  Amount = "Amount",
  Timestamp = "Timestamp",
  Comment = "Comment",
}

export interface ApiContractTransactionIEnumerableApiResult {
  value?: ApiContractTransaction[] | null;
  error?: ApiContractIError;
}

export interface ApiContractUpdateCategory {
  name?: string | null;
}

export interface ApiContractUpdateUser {
  firstName?: string | null;
  lastName?: string | null;

  /** @format email */
  email?: string | null;

  /**
   * @format password
   * @pattern ^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,16}$
   */
  password?: string | null;
}

export interface ApiContractUser {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface ApiContractUserApiResult {
  value?: ApiContractUser;
  error?: ApiContractIError;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title MoneyKeeper
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthenticateCreate
     * @request POST:/Auth/authenticate
     */
    authenticateCreate: (data: ApiContractAuthenticateRequest, params: RequestParams = {}) =>
      this.request<ApiContractAuthenticateResponseApiResult, any>({
        path: `/Auth/authenticate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name RefreshTokenCreate
     * @request POST:/Auth/refresh-token
     */
    refreshTokenCreate: (params: RequestParams = {}) =>
      this.request<ApiContractRefreshTokenResponseApiResult, any>({
        path: `/Auth/refresh-token`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDetail
     * @request GET:/Categories/{id}
     */
    categoriesDetail: (id: number, params: RequestParams = {}) =>
      this.request<ApiContractCategoryApiResult, any>({
        path: `/Categories/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDelete
     * @request DELETE:/Categories/{id}
     */
    categoriesDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiContractCategoryApiResult, any>({
        path: `/Categories/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name OverviewList
     * @request GET:/Categories/overview
     */
    overviewList: (query?: { from?: number; to?: number }, params: RequestParams = {}) =>
      this.request<ApiContractCategoryOverviewIEnumerableApiResult, any>({
        path: `/Categories/overview`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name OverviewDetail
     * @request GET:/Categories/overview/{categoryId}
     */
    overviewDetail: (categoryId: number, params: RequestParams = {}) =>
      this.request<ApiContractCategoryOverviewApiResult, any>({
        path: `/Categories/overview/${categoryId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name EarningsOverviewList
     * @request GET:/Categories/earnings/overview
     */
    earningsOverviewList: (params: RequestParams = {}) =>
      this.request<ApiContractCategoryOverviewApiResult, any>({
        path: `/Categories/earnings/overview`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesList
     * @request GET:/Categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<ApiContractCategoryIEnumerableApiResult, any>({
        path: `/Categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesCreate
     * @request POST:/Categories
     */
    categoriesCreate: (data: ApiContractCreateCategory, params: RequestParams = {}) =>
      this.request<ApiContractCategoryApiResult, any>({
        path: `/Categories`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDelete2
     * @request DELETE:/Categories
     * @originalName categoriesDelete
     * @duplicate
     */
    categoriesDelete2: (query?: { categoryName?: string }, params: RequestParams = {}) =>
      this.request<ApiContractCategoryApiResult, any>({
        path: `/Categories`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesUpdate
     * @request PUT:/Categories/{categoryId}
     */
    categoriesUpdate: (categoryId: number, data: ApiContractUpdateCategory, params: RequestParams = {}) =>
      this.request<ApiContractCategoryApiResult, any>({
        path: `/Categories/${categoryId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  transactions = {
    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsDetail
     * @request GET:/Transactions/{id}
     */
    transactionsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ApiContractTransactionApiResult, any>({
        path: `/Transactions/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsDelete
     * @request DELETE:/Transactions/{id}
     */
    transactionsDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiContractTransactionApiResult, any>({
        path: `/Transactions/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name CategoryTransactionsDetail
     * @request GET:/Transactions/category/{categoryId}/transactions
     */
    categoryTransactionsDetail: (categoryId: number, query: { from: number; to: number }, params: RequestParams = {}) =>
      this.request<ApiContractTransactionIEnumerableApiResult, any>({
        path: `/Transactions/category/${categoryId}/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name UserTransactionsList
     * @request GET:/Transactions/user/transactions
     */
    userTransactionsList: (
      query: {
        from: number;
        to: number;
        orderByField: ApiContractTransactionField;
        order: ApiContractOrderType;
        searchPattern?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiContractTransactionIEnumerableApiResult, any>({
        path: `/Transactions/user/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name SummaryList
     * @request GET:/Transactions/summary
     */
    summaryList: (params: RequestParams = {}) =>
      this.request<ApiContractTransactionIEnumerableApiResult, any>({
        path: `/Transactions/summary`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TotalList
     * @request GET:/Transactions/total
     */
    totalList: (params: RequestParams = {}) =>
      this.request<ApiContractStringDecimalDictionaryApiResult, any>({
        path: `/Transactions/total`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TotalMonthList
     * @request GET:/Transactions/total/month
     */
    totalMonthList: (params: RequestParams = {}) =>
      this.request<ApiContractStringDecimalDictionaryApiResult, any>({
        path: `/Transactions/total/month`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TotalYearList
     * @request GET:/Transactions/total/year
     */
    totalYearList: (params: RequestParams = {}) =>
      this.request<ApiContractStringDecimalDictionaryApiResult, any>({
        path: `/Transactions/total/year`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsCreate
     * @request POST:/Transactions
     */
    transactionsCreate: (data: ApiContractCreateTransaction, params: RequestParams = {}) =>
      this.request<ApiContractTransactionApiResult, any>({
        path: `/Transactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersList
     * @request GET:/Users
     */
    usersList: (params: RequestParams = {}) =>
      this.request<ApiContractUserApiResult, any>({
        path: `/Users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreate
     * @request POST:/Users
     */
    usersCreate: (data: ApiContractCreateUser, params: RequestParams = {}) =>
      this.request<ApiContractUserApiResult, any>({
        path: `/Users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersUpdate
     * @request PUT:/Users
     */
    usersUpdate: (data: ApiContractUpdateUser, params: RequestParams = {}) =>
      this.request<ApiContractUserApiResult, any>({
        path: `/Users`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDelete
     * @request DELETE:/Users
     */
    usersDelete: (params: RequestParams = {}) =>
      this.request<ApiContractUserApiResult, any>({
        path: `/Users`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
