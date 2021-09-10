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

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  jwtToken?: string | null;
}

export interface AuthenticateResponseApiResult {
  value?: AuthenticateResponse;
  error?: IError;
}

export interface CategoryDto {
  /** @format int32 */
  id?: number;
  name?: string | null;

  /** @format int32 */
  userId?: number;
}

export interface CategoryDtoApiResult {
  value?: CategoryDto;
  error?: IError;
}

export interface CategoryDtoIEnumerableApiResult {
  value?: CategoryDto[] | null;
  error?: IError;
}

export interface CreateCategoryDto {
  name: string;

  /** @format int32 */
  userId: number;
}

export interface CreateTransactionDto {
  /** @format int32 */
  userId: number;

  /** @format int32 */
  categoryId: number;

  /** @format double */
  amount: number;

  /** @format date-time */
  timestamp: string;
  comment: string;
}

export interface CreateUserDto {
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

export interface IError {
  code?: string | null;
  message?: string | null;
}

export interface RefreshTokenResponse {
  token?: string | null;
}

export interface RefreshTokenResponseApiResult {
  value?: RefreshTokenResponse;
  error?: IError;
}

export interface StringDecimalDictionaryApiResult {
  value?: Record<string, number>;
  error?: IError;
}

export interface SummaryUnit {
  /** @format int32 */
  id?: number;

  /** @format int32 */
  userId?: number;
  categoryName?: string | null;

  /** @format int32 */
  categoryId?: number;

  /** @format double */
  amount?: number;

  /** @format date-time */
  timestamp?: string;
  comment?: string | null;
}

export interface SummaryUnitIEnumerableApiResult {
  value?: SummaryUnit[] | null;
  error?: IError;
}

export interface TransactionDto {
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

export interface TransactionDtoApiResult {
  value?: TransactionDto;
  error?: IError;
}

export interface TransactionDtoIEnumerableApiResult {
  value?: TransactionDto[] | null;
  error?: IError;
}

export interface UpdateCategoryDto {
  name?: string | null;
}

export interface UpdateUserDto {
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

export interface UserDto {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export interface UserDtoApiResult {
  value?: UserDto;
  error?: IError;
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
    authenticateCreate: (data: AuthenticateRequest, params: RequestParams = {}) =>
      this.request<AuthenticateResponseApiResult, any>({
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
      this.request<RefreshTokenResponseApiResult, any>({
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
      this.request<CategoryDtoApiResult, any>({
        path: `/Categories/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesUpdate
     * @request PUT:/Categories/{id}
     */
    categoriesUpdate: (
      id: string,
      data: UpdateCategoryDto,
      query?: { categoryId?: number },
      params: RequestParams = {},
    ) =>
      this.request<CategoryDtoApiResult, any>({
        path: `/Categories/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
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
      this.request<CategoryDtoApiResult, any>({
        path: `/Categories/${id}`,
        method: "DELETE",
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
      this.request<CategoryDtoIEnumerableApiResult, any>({
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
    categoriesCreate: (data: CreateCategoryDto, params: RequestParams = {}) =>
      this.request<CategoryDtoApiResult, any>({
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
      this.request<CategoryDtoApiResult, any>({
        path: `/Categories`,
        method: "DELETE",
        query: query,
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
      this.request<TransactionDtoApiResult, any>({
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
      this.request<TransactionDtoApiResult, any>({
        path: `/Transactions/${id}`,
        method: "DELETE",
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
      query: { from: number; to: number; like?: string; when?: string },
      params: RequestParams = {},
    ) =>
      this.request<TransactionDtoIEnumerableApiResult, any>({
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
     * @name TransactionsCreate
     * @request POST:/Transactions
     */
    transactionsCreate: (data: CreateTransactionDto, params: RequestParams = {}) =>
      this.request<TransactionDtoApiResult, any>({
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
      this.request<UserDtoApiResult, any>({
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
    usersCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserDtoApiResult, any>({
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
    usersUpdate: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UserDtoApiResult, any>({
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
      this.request<UserDtoApiResult, any>({
        path: `/Users`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SummaryList
     * @request GET:/Users/summary
     */
    summaryList: (params: RequestParams = {}) =>
      this.request<SummaryUnitIEnumerableApiResult, any>({
        path: `/Users/summary`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name TotalMonthList
     * @request GET:/Users/total/month
     */
    totalMonthList: (params: RequestParams = {}) =>
      this.request<StringDecimalDictionaryApiResult, any>({
        path: `/Users/total/month`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name TotalYearList
     * @request GET:/Users/total/year
     */
    totalYearList: (params: RequestParams = {}) =>
      this.request<StringDecimalDictionaryApiResult, any>({
        path: `/Users/total/year`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
