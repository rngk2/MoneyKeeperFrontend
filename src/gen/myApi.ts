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

export interface CategoryDto {
  /** @format int32 */
  id?: number;
  name?: string | null;

  /** @format int32 */
  userId?: number;
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
    headers = {
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')!).jwtToken
    },
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
  categories = {
    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDetail
     * @request GET:/Categories/{id}
     * @secure
     */
    categoriesDetail: (id: number, params: RequestParams = {}) =>
      this.request<CategoryDto, any>({
        path: `/Categories/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesUpdate
     * @request PUT:/Categories/{id}
     * @secure
     */
    categoriesUpdate: (id: number, data: UpdateCategoryDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Categories/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDelete
     * @request DELETE:/Categories/{id}
     * @secure
     */
    categoriesDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Categories/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesList
     * @request GET:/Categories
     * @secure
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<CategoryDto[], any>({
        path: `/Categories`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesCreate
     * @request POST:/Categories
     * @secure
     */
    categoriesCreate: (data: CreateCategoryDto, params: RequestParams = {}) =>
      this.request<CategoryDto, any>({
        path: `/Categories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name BynameDelete
     * @request DELETE:/Categories/byname/{categoryName}
     * @secure
     */
    bynameDelete: (categoryName: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Categories/byname/${categoryName}`,
        method: "DELETE",
        secure: true,
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
     * @secure
     */
    transactionsDetail: (id: number, params: RequestParams = {}) =>
      this.request<TransactionDto, any>({
        path: `/Transactions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsDelete
     * @request DELETE:/Transactions/{id}
     * @secure
     */
    transactionsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Transactions/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsList
     * @request GET:/Transactions
     * @secure
     */
    transactionsList: (params: RequestParams = {}) =>
      this.request<TransactionDto[], any>({
        path: `/Transactions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsCreate
     * @request POST:/Transactions
     * @secure
     */
    transactionsCreate: (data: CreateTransactionDto, params: RequestParams = {}) =>
      this.request<TransactionDto, any>({
        path: `/Transactions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsDetail2
     * @request GET:/Transactions/{from}/{to}/{like}/{when}
     * @originalName transactionsDetail
     * @duplicate
     * @secure
     */
    transactionsDetail2: (from: number, to: number, like: string, when: string, params: RequestParams = {}) =>
      this.request<TransactionDto[], any>({
        path: `/Transactions/${from}/${to}/${like}/${when}`,
        method: "GET",
        secure: true,
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
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/Users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreate
     * @request POST:/Users
     * @secure
     */
    usersCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/Users`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    usersUpdate: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Users`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDelete
     * @request DELETE:/Users
     * @secure
     */
    usersDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Users`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SummaryList
     * @request GET:/Users/summary
     * @secure
     */
    summaryList: (params: RequestParams = {}) =>
      this.request<SummaryUnit[], any>({
        path: `/Users/summary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name TotalMonthList
     * @request GET:/Users/total/month
     * @secure
     */
    totalMonthList: (params: RequestParams = {}) =>
      this.request<Record<string, number>, any>({
        path: `/Users/total/month`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name TotalYearList
     * @request GET:/Users/total/year
     * @secure
     */
    totalYearList: (params: RequestParams = {}) =>
      this.request<Record<string, number>, any>({
        path: `/Users/total/year`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name AuthenticateCreate
     * @request POST:/Users/authenticate
     * @secure
     */
    authenticateCreate: (data: AuthenticateRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Users/authenticate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name RefreshTokenCreate
     * @request POST:/Users/refresh-token
     * @secure
     */
    refreshTokenCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Users/refresh-token`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
