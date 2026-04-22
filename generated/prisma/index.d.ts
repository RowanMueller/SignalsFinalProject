
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CompressionRun
 * One block-transform compression run. `pipelineMode` separates grayscale DCT vs RGB FFT+IFFT.
 */
export type CompressionRun = $Result.DefaultSelection<Prisma.$CompressionRunPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CompressionRuns
 * const compressionRuns = await prisma.compressionRun.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CompressionRuns
   * const compressionRuns = await prisma.compressionRun.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.compressionRun`: Exposes CRUD operations for the **CompressionRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompressionRuns
    * const compressionRuns = await prisma.compressionRun.findMany()
    * ```
    */
  get compressionRun(): Prisma.CompressionRunDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CompressionRun: 'CompressionRun'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "compressionRun"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CompressionRun: {
        payload: Prisma.$CompressionRunPayload<ExtArgs>
        fields: Prisma.CompressionRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompressionRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompressionRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>
          }
          findFirst: {
            args: Prisma.CompressionRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompressionRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>
          }
          findMany: {
            args: Prisma.CompressionRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>[]
          }
          create: {
            args: Prisma.CompressionRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>
          }
          createMany: {
            args: Prisma.CompressionRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompressionRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>[]
          }
          delete: {
            args: Prisma.CompressionRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>
          }
          update: {
            args: Prisma.CompressionRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>
          }
          deleteMany: {
            args: Prisma.CompressionRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompressionRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompressionRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>[]
          }
          upsert: {
            args: Prisma.CompressionRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompressionRunPayload>
          }
          aggregate: {
            args: Prisma.CompressionRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompressionRun>
          }
          groupBy: {
            args: Prisma.CompressionRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompressionRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompressionRunCountArgs<ExtArgs>
            result: $Utils.Optional<CompressionRunCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    compressionRun?: CompressionRunOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model CompressionRun
   */

  export type AggregateCompressionRun = {
    _count: CompressionRunCountAggregateOutputType | null
    _avg: CompressionRunAvgAggregateOutputType | null
    _sum: CompressionRunSumAggregateOutputType | null
    _min: CompressionRunMinAggregateOutputType | null
    _max: CompressionRunMaxAggregateOutputType | null
  }

  export type CompressionRunAvgAggregateOutputType = {
    quality: number | null
    sparsity: number | null
    threshold: number | null
    mse: number | null
    psnr: number | null
    originalUploadBytes: number | null
    reconstructedPngBytes: number | null
    estimatedTransformBytes: number | null
    imageWidth: number | null
    imageHeight: number | null
    originalPreviewPngBytes: number | null
    compressionRatio: number | null
    retainedCoefficients: number | null
    bppEstimate: number | null
  }

  export type CompressionRunSumAggregateOutputType = {
    quality: number | null
    sparsity: number | null
    threshold: number | null
    mse: number | null
    psnr: number | null
    originalUploadBytes: number | null
    reconstructedPngBytes: number | null
    estimatedTransformBytes: number | null
    imageWidth: number | null
    imageHeight: number | null
    originalPreviewPngBytes: number | null
    compressionRatio: number | null
    retainedCoefficients: number | null
    bppEstimate: number | null
  }

  export type CompressionRunMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    pipelineMode: string | null
    originalFilename: string | null
    transformType: string | null
    quality: number | null
    sparsity: number | null
    threshold: number | null
    mse: number | null
    psnr: number | null
    originalUploadBytes: number | null
    reconstructedPngBytes: number | null
    estimatedTransformBytes: number | null
    imageWidth: number | null
    imageHeight: number | null
    originalPreviewPngBytes: number | null
    compressionRatio: number | null
    retainedCoefficients: number | null
    bppEstimate: number | null
    quantizationLabel: string | null
    originalImagePath: string | null
    reconstructedImagePath: string | null
    dctPreviewPath: string | null
    quantPreviewPath: string | null
  }

  export type CompressionRunMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    pipelineMode: string | null
    originalFilename: string | null
    transformType: string | null
    quality: number | null
    sparsity: number | null
    threshold: number | null
    mse: number | null
    psnr: number | null
    originalUploadBytes: number | null
    reconstructedPngBytes: number | null
    estimatedTransformBytes: number | null
    imageWidth: number | null
    imageHeight: number | null
    originalPreviewPngBytes: number | null
    compressionRatio: number | null
    retainedCoefficients: number | null
    bppEstimate: number | null
    quantizationLabel: string | null
    originalImagePath: string | null
    reconstructedImagePath: string | null
    dctPreviewPath: string | null
    quantPreviewPath: string | null
  }

  export type CompressionRunCountAggregateOutputType = {
    id: number
    createdAt: number
    pipelineMode: number
    originalFilename: number
    transformType: number
    quality: number
    sparsity: number
    threshold: number
    mse: number
    psnr: number
    originalUploadBytes: number
    reconstructedPngBytes: number
    estimatedTransformBytes: number
    imageWidth: number
    imageHeight: number
    originalPreviewPngBytes: number
    compressionRatio: number
    retainedCoefficients: number
    bppEstimate: number
    quantizationLabel: number
    originalImagePath: number
    reconstructedImagePath: number
    dctPreviewPath: number
    quantPreviewPath: number
    _all: number
  }


  export type CompressionRunAvgAggregateInputType = {
    quality?: true
    sparsity?: true
    threshold?: true
    mse?: true
    psnr?: true
    originalUploadBytes?: true
    reconstructedPngBytes?: true
    estimatedTransformBytes?: true
    imageWidth?: true
    imageHeight?: true
    originalPreviewPngBytes?: true
    compressionRatio?: true
    retainedCoefficients?: true
    bppEstimate?: true
  }

  export type CompressionRunSumAggregateInputType = {
    quality?: true
    sparsity?: true
    threshold?: true
    mse?: true
    psnr?: true
    originalUploadBytes?: true
    reconstructedPngBytes?: true
    estimatedTransformBytes?: true
    imageWidth?: true
    imageHeight?: true
    originalPreviewPngBytes?: true
    compressionRatio?: true
    retainedCoefficients?: true
    bppEstimate?: true
  }

  export type CompressionRunMinAggregateInputType = {
    id?: true
    createdAt?: true
    pipelineMode?: true
    originalFilename?: true
    transformType?: true
    quality?: true
    sparsity?: true
    threshold?: true
    mse?: true
    psnr?: true
    originalUploadBytes?: true
    reconstructedPngBytes?: true
    estimatedTransformBytes?: true
    imageWidth?: true
    imageHeight?: true
    originalPreviewPngBytes?: true
    compressionRatio?: true
    retainedCoefficients?: true
    bppEstimate?: true
    quantizationLabel?: true
    originalImagePath?: true
    reconstructedImagePath?: true
    dctPreviewPath?: true
    quantPreviewPath?: true
  }

  export type CompressionRunMaxAggregateInputType = {
    id?: true
    createdAt?: true
    pipelineMode?: true
    originalFilename?: true
    transformType?: true
    quality?: true
    sparsity?: true
    threshold?: true
    mse?: true
    psnr?: true
    originalUploadBytes?: true
    reconstructedPngBytes?: true
    estimatedTransformBytes?: true
    imageWidth?: true
    imageHeight?: true
    originalPreviewPngBytes?: true
    compressionRatio?: true
    retainedCoefficients?: true
    bppEstimate?: true
    quantizationLabel?: true
    originalImagePath?: true
    reconstructedImagePath?: true
    dctPreviewPath?: true
    quantPreviewPath?: true
  }

  export type CompressionRunCountAggregateInputType = {
    id?: true
    createdAt?: true
    pipelineMode?: true
    originalFilename?: true
    transformType?: true
    quality?: true
    sparsity?: true
    threshold?: true
    mse?: true
    psnr?: true
    originalUploadBytes?: true
    reconstructedPngBytes?: true
    estimatedTransformBytes?: true
    imageWidth?: true
    imageHeight?: true
    originalPreviewPngBytes?: true
    compressionRatio?: true
    retainedCoefficients?: true
    bppEstimate?: true
    quantizationLabel?: true
    originalImagePath?: true
    reconstructedImagePath?: true
    dctPreviewPath?: true
    quantPreviewPath?: true
    _all?: true
  }

  export type CompressionRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompressionRun to aggregate.
     */
    where?: CompressionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompressionRuns to fetch.
     */
    orderBy?: CompressionRunOrderByWithRelationInput | CompressionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompressionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompressionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompressionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompressionRuns
    **/
    _count?: true | CompressionRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompressionRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompressionRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompressionRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompressionRunMaxAggregateInputType
  }

  export type GetCompressionRunAggregateType<T extends CompressionRunAggregateArgs> = {
        [P in keyof T & keyof AggregateCompressionRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompressionRun[P]>
      : GetScalarType<T[P], AggregateCompressionRun[P]>
  }




  export type CompressionRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompressionRunWhereInput
    orderBy?: CompressionRunOrderByWithAggregationInput | CompressionRunOrderByWithAggregationInput[]
    by: CompressionRunScalarFieldEnum[] | CompressionRunScalarFieldEnum
    having?: CompressionRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompressionRunCountAggregateInputType | true
    _avg?: CompressionRunAvgAggregateInputType
    _sum?: CompressionRunSumAggregateInputType
    _min?: CompressionRunMinAggregateInputType
    _max?: CompressionRunMaxAggregateInputType
  }

  export type CompressionRunGroupByOutputType = {
    id: string
    createdAt: Date
    pipelineMode: string
    originalFilename: string
    transformType: string
    quality: number
    sparsity: number
    threshold: number
    mse: number
    psnr: number
    originalUploadBytes: number
    reconstructedPngBytes: number
    estimatedTransformBytes: number
    imageWidth: number
    imageHeight: number
    originalPreviewPngBytes: number
    compressionRatio: number
    retainedCoefficients: number
    bppEstimate: number
    quantizationLabel: string
    originalImagePath: string
    reconstructedImagePath: string
    dctPreviewPath: string | null
    quantPreviewPath: string | null
    _count: CompressionRunCountAggregateOutputType | null
    _avg: CompressionRunAvgAggregateOutputType | null
    _sum: CompressionRunSumAggregateOutputType | null
    _min: CompressionRunMinAggregateOutputType | null
    _max: CompressionRunMaxAggregateOutputType | null
  }

  type GetCompressionRunGroupByPayload<T extends CompressionRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompressionRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompressionRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompressionRunGroupByOutputType[P]>
            : GetScalarType<T[P], CompressionRunGroupByOutputType[P]>
        }
      >
    >


  export type CompressionRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    pipelineMode?: boolean
    originalFilename?: boolean
    transformType?: boolean
    quality?: boolean
    sparsity?: boolean
    threshold?: boolean
    mse?: boolean
    psnr?: boolean
    originalUploadBytes?: boolean
    reconstructedPngBytes?: boolean
    estimatedTransformBytes?: boolean
    imageWidth?: boolean
    imageHeight?: boolean
    originalPreviewPngBytes?: boolean
    compressionRatio?: boolean
    retainedCoefficients?: boolean
    bppEstimate?: boolean
    quantizationLabel?: boolean
    originalImagePath?: boolean
    reconstructedImagePath?: boolean
    dctPreviewPath?: boolean
    quantPreviewPath?: boolean
  }, ExtArgs["result"]["compressionRun"]>

  export type CompressionRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    pipelineMode?: boolean
    originalFilename?: boolean
    transformType?: boolean
    quality?: boolean
    sparsity?: boolean
    threshold?: boolean
    mse?: boolean
    psnr?: boolean
    originalUploadBytes?: boolean
    reconstructedPngBytes?: boolean
    estimatedTransformBytes?: boolean
    imageWidth?: boolean
    imageHeight?: boolean
    originalPreviewPngBytes?: boolean
    compressionRatio?: boolean
    retainedCoefficients?: boolean
    bppEstimate?: boolean
    quantizationLabel?: boolean
    originalImagePath?: boolean
    reconstructedImagePath?: boolean
    dctPreviewPath?: boolean
    quantPreviewPath?: boolean
  }, ExtArgs["result"]["compressionRun"]>

  export type CompressionRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    pipelineMode?: boolean
    originalFilename?: boolean
    transformType?: boolean
    quality?: boolean
    sparsity?: boolean
    threshold?: boolean
    mse?: boolean
    psnr?: boolean
    originalUploadBytes?: boolean
    reconstructedPngBytes?: boolean
    estimatedTransformBytes?: boolean
    imageWidth?: boolean
    imageHeight?: boolean
    originalPreviewPngBytes?: boolean
    compressionRatio?: boolean
    retainedCoefficients?: boolean
    bppEstimate?: boolean
    quantizationLabel?: boolean
    originalImagePath?: boolean
    reconstructedImagePath?: boolean
    dctPreviewPath?: boolean
    quantPreviewPath?: boolean
  }, ExtArgs["result"]["compressionRun"]>

  export type CompressionRunSelectScalar = {
    id?: boolean
    createdAt?: boolean
    pipelineMode?: boolean
    originalFilename?: boolean
    transformType?: boolean
    quality?: boolean
    sparsity?: boolean
    threshold?: boolean
    mse?: boolean
    psnr?: boolean
    originalUploadBytes?: boolean
    reconstructedPngBytes?: boolean
    estimatedTransformBytes?: boolean
    imageWidth?: boolean
    imageHeight?: boolean
    originalPreviewPngBytes?: boolean
    compressionRatio?: boolean
    retainedCoefficients?: boolean
    bppEstimate?: boolean
    quantizationLabel?: boolean
    originalImagePath?: boolean
    reconstructedImagePath?: boolean
    dctPreviewPath?: boolean
    quantPreviewPath?: boolean
  }

  export type CompressionRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "pipelineMode" | "originalFilename" | "transformType" | "quality" | "sparsity" | "threshold" | "mse" | "psnr" | "originalUploadBytes" | "reconstructedPngBytes" | "estimatedTransformBytes" | "imageWidth" | "imageHeight" | "originalPreviewPngBytes" | "compressionRatio" | "retainedCoefficients" | "bppEstimate" | "quantizationLabel" | "originalImagePath" | "reconstructedImagePath" | "dctPreviewPath" | "quantPreviewPath", ExtArgs["result"]["compressionRun"]>

  export type $CompressionRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompressionRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      /**
       * "GRAY_DCT" (grayscale, DCT) or "RGB_FFT" (RGB, 2D complex FFT+IFFT per channel).
       */
      pipelineMode: string
      originalFilename: string
      /**
       * Legacy display: "DCT" for grayscale, "Fourier" for RGB/FFT.
       */
      transformType: string
      /**
       * JPEG-style quality 1–100
       */
      quality: number
      /**
       * Fraction of DCT coefficients kept per block before quantization (0–1)
       */
      sparsity: number
      /**
       * Optional extra magnitude threshold on DCT coefficients (before quant), 0 = off
       */
      threshold: number
      mse: number
      psnr: number
      /**
       * Decoded upload size (bytes)
       */
      originalUploadBytes: number
      /**
       * On-disk size of reconstructed PNG we emit (bytes)
       */
      reconstructedPngBytes: number
      /**
       * Naive transform estimate: retained coeffs × (10 or 20 bits) / 8 — not a real file size
       */
      estimatedTransformBytes: number
      /**
       * Pixel dimensions after resize (used for “raw uncompressed” size)
       */
      imageWidth: number
      imageHeight: number
      /**
       * Size of the left preview PNG we generate (re-encoded, often larger than a tiny JPEG)
       */
      originalPreviewPngBytes: number
      /**
       * Original bits / estimated stored bits
       */
      compressionRatio: number
      retainedCoefficients: number
      bppEstimate: number
      quantizationLabel: string
      originalImagePath: string
      reconstructedImagePath: string
      dctPreviewPath: string | null
      quantPreviewPath: string | null
    }, ExtArgs["result"]["compressionRun"]>
    composites: {}
  }

  type CompressionRunGetPayload<S extends boolean | null | undefined | CompressionRunDefaultArgs> = $Result.GetResult<Prisma.$CompressionRunPayload, S>

  type CompressionRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompressionRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompressionRunCountAggregateInputType | true
    }

  export interface CompressionRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompressionRun'], meta: { name: 'CompressionRun' } }
    /**
     * Find zero or one CompressionRun that matches the filter.
     * @param {CompressionRunFindUniqueArgs} args - Arguments to find a CompressionRun
     * @example
     * // Get one CompressionRun
     * const compressionRun = await prisma.compressionRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompressionRunFindUniqueArgs>(args: SelectSubset<T, CompressionRunFindUniqueArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompressionRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompressionRunFindUniqueOrThrowArgs} args - Arguments to find a CompressionRun
     * @example
     * // Get one CompressionRun
     * const compressionRun = await prisma.compressionRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompressionRunFindUniqueOrThrowArgs>(args: SelectSubset<T, CompressionRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompressionRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunFindFirstArgs} args - Arguments to find a CompressionRun
     * @example
     * // Get one CompressionRun
     * const compressionRun = await prisma.compressionRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompressionRunFindFirstArgs>(args?: SelectSubset<T, CompressionRunFindFirstArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompressionRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunFindFirstOrThrowArgs} args - Arguments to find a CompressionRun
     * @example
     * // Get one CompressionRun
     * const compressionRun = await prisma.compressionRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompressionRunFindFirstOrThrowArgs>(args?: SelectSubset<T, CompressionRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompressionRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompressionRuns
     * const compressionRuns = await prisma.compressionRun.findMany()
     * 
     * // Get first 10 CompressionRuns
     * const compressionRuns = await prisma.compressionRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const compressionRunWithIdOnly = await prisma.compressionRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompressionRunFindManyArgs>(args?: SelectSubset<T, CompressionRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompressionRun.
     * @param {CompressionRunCreateArgs} args - Arguments to create a CompressionRun.
     * @example
     * // Create one CompressionRun
     * const CompressionRun = await prisma.compressionRun.create({
     *   data: {
     *     // ... data to create a CompressionRun
     *   }
     * })
     * 
     */
    create<T extends CompressionRunCreateArgs>(args: SelectSubset<T, CompressionRunCreateArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompressionRuns.
     * @param {CompressionRunCreateManyArgs} args - Arguments to create many CompressionRuns.
     * @example
     * // Create many CompressionRuns
     * const compressionRun = await prisma.compressionRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompressionRunCreateManyArgs>(args?: SelectSubset<T, CompressionRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompressionRuns and returns the data saved in the database.
     * @param {CompressionRunCreateManyAndReturnArgs} args - Arguments to create many CompressionRuns.
     * @example
     * // Create many CompressionRuns
     * const compressionRun = await prisma.compressionRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompressionRuns and only return the `id`
     * const compressionRunWithIdOnly = await prisma.compressionRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompressionRunCreateManyAndReturnArgs>(args?: SelectSubset<T, CompressionRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompressionRun.
     * @param {CompressionRunDeleteArgs} args - Arguments to delete one CompressionRun.
     * @example
     * // Delete one CompressionRun
     * const CompressionRun = await prisma.compressionRun.delete({
     *   where: {
     *     // ... filter to delete one CompressionRun
     *   }
     * })
     * 
     */
    delete<T extends CompressionRunDeleteArgs>(args: SelectSubset<T, CompressionRunDeleteArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompressionRun.
     * @param {CompressionRunUpdateArgs} args - Arguments to update one CompressionRun.
     * @example
     * // Update one CompressionRun
     * const compressionRun = await prisma.compressionRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompressionRunUpdateArgs>(args: SelectSubset<T, CompressionRunUpdateArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompressionRuns.
     * @param {CompressionRunDeleteManyArgs} args - Arguments to filter CompressionRuns to delete.
     * @example
     * // Delete a few CompressionRuns
     * const { count } = await prisma.compressionRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompressionRunDeleteManyArgs>(args?: SelectSubset<T, CompressionRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompressionRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompressionRuns
     * const compressionRun = await prisma.compressionRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompressionRunUpdateManyArgs>(args: SelectSubset<T, CompressionRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompressionRuns and returns the data updated in the database.
     * @param {CompressionRunUpdateManyAndReturnArgs} args - Arguments to update many CompressionRuns.
     * @example
     * // Update many CompressionRuns
     * const compressionRun = await prisma.compressionRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompressionRuns and only return the `id`
     * const compressionRunWithIdOnly = await prisma.compressionRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompressionRunUpdateManyAndReturnArgs>(args: SelectSubset<T, CompressionRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompressionRun.
     * @param {CompressionRunUpsertArgs} args - Arguments to update or create a CompressionRun.
     * @example
     * // Update or create a CompressionRun
     * const compressionRun = await prisma.compressionRun.upsert({
     *   create: {
     *     // ... data to create a CompressionRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompressionRun we want to update
     *   }
     * })
     */
    upsert<T extends CompressionRunUpsertArgs>(args: SelectSubset<T, CompressionRunUpsertArgs<ExtArgs>>): Prisma__CompressionRunClient<$Result.GetResult<Prisma.$CompressionRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompressionRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunCountArgs} args - Arguments to filter CompressionRuns to count.
     * @example
     * // Count the number of CompressionRuns
     * const count = await prisma.compressionRun.count({
     *   where: {
     *     // ... the filter for the CompressionRuns we want to count
     *   }
     * })
    **/
    count<T extends CompressionRunCountArgs>(
      args?: Subset<T, CompressionRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompressionRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompressionRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompressionRunAggregateArgs>(args: Subset<T, CompressionRunAggregateArgs>): Prisma.PrismaPromise<GetCompressionRunAggregateType<T>>

    /**
     * Group by CompressionRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompressionRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompressionRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompressionRunGroupByArgs['orderBy'] }
        : { orderBy?: CompressionRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompressionRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompressionRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompressionRun model
   */
  readonly fields: CompressionRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompressionRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompressionRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompressionRun model
   */
  interface CompressionRunFieldRefs {
    readonly id: FieldRef<"CompressionRun", 'String'>
    readonly createdAt: FieldRef<"CompressionRun", 'DateTime'>
    readonly pipelineMode: FieldRef<"CompressionRun", 'String'>
    readonly originalFilename: FieldRef<"CompressionRun", 'String'>
    readonly transformType: FieldRef<"CompressionRun", 'String'>
    readonly quality: FieldRef<"CompressionRun", 'Int'>
    readonly sparsity: FieldRef<"CompressionRun", 'Float'>
    readonly threshold: FieldRef<"CompressionRun", 'Float'>
    readonly mse: FieldRef<"CompressionRun", 'Float'>
    readonly psnr: FieldRef<"CompressionRun", 'Float'>
    readonly originalUploadBytes: FieldRef<"CompressionRun", 'Int'>
    readonly reconstructedPngBytes: FieldRef<"CompressionRun", 'Int'>
    readonly estimatedTransformBytes: FieldRef<"CompressionRun", 'Int'>
    readonly imageWidth: FieldRef<"CompressionRun", 'Int'>
    readonly imageHeight: FieldRef<"CompressionRun", 'Int'>
    readonly originalPreviewPngBytes: FieldRef<"CompressionRun", 'Int'>
    readonly compressionRatio: FieldRef<"CompressionRun", 'Float'>
    readonly retainedCoefficients: FieldRef<"CompressionRun", 'Int'>
    readonly bppEstimate: FieldRef<"CompressionRun", 'Float'>
    readonly quantizationLabel: FieldRef<"CompressionRun", 'String'>
    readonly originalImagePath: FieldRef<"CompressionRun", 'String'>
    readonly reconstructedImagePath: FieldRef<"CompressionRun", 'String'>
    readonly dctPreviewPath: FieldRef<"CompressionRun", 'String'>
    readonly quantPreviewPath: FieldRef<"CompressionRun", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompressionRun findUnique
   */
  export type CompressionRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * Filter, which CompressionRun to fetch.
     */
    where: CompressionRunWhereUniqueInput
  }

  /**
   * CompressionRun findUniqueOrThrow
   */
  export type CompressionRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * Filter, which CompressionRun to fetch.
     */
    where: CompressionRunWhereUniqueInput
  }

  /**
   * CompressionRun findFirst
   */
  export type CompressionRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * Filter, which CompressionRun to fetch.
     */
    where?: CompressionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompressionRuns to fetch.
     */
    orderBy?: CompressionRunOrderByWithRelationInput | CompressionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompressionRuns.
     */
    cursor?: CompressionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompressionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompressionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompressionRuns.
     */
    distinct?: CompressionRunScalarFieldEnum | CompressionRunScalarFieldEnum[]
  }

  /**
   * CompressionRun findFirstOrThrow
   */
  export type CompressionRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * Filter, which CompressionRun to fetch.
     */
    where?: CompressionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompressionRuns to fetch.
     */
    orderBy?: CompressionRunOrderByWithRelationInput | CompressionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompressionRuns.
     */
    cursor?: CompressionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompressionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompressionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompressionRuns.
     */
    distinct?: CompressionRunScalarFieldEnum | CompressionRunScalarFieldEnum[]
  }

  /**
   * CompressionRun findMany
   */
  export type CompressionRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * Filter, which CompressionRuns to fetch.
     */
    where?: CompressionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompressionRuns to fetch.
     */
    orderBy?: CompressionRunOrderByWithRelationInput | CompressionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompressionRuns.
     */
    cursor?: CompressionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompressionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompressionRuns.
     */
    skip?: number
    distinct?: CompressionRunScalarFieldEnum | CompressionRunScalarFieldEnum[]
  }

  /**
   * CompressionRun create
   */
  export type CompressionRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * The data needed to create a CompressionRun.
     */
    data: XOR<CompressionRunCreateInput, CompressionRunUncheckedCreateInput>
  }

  /**
   * CompressionRun createMany
   */
  export type CompressionRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompressionRuns.
     */
    data: CompressionRunCreateManyInput | CompressionRunCreateManyInput[]
  }

  /**
   * CompressionRun createManyAndReturn
   */
  export type CompressionRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * The data used to create many CompressionRuns.
     */
    data: CompressionRunCreateManyInput | CompressionRunCreateManyInput[]
  }

  /**
   * CompressionRun update
   */
  export type CompressionRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * The data needed to update a CompressionRun.
     */
    data: XOR<CompressionRunUpdateInput, CompressionRunUncheckedUpdateInput>
    /**
     * Choose, which CompressionRun to update.
     */
    where: CompressionRunWhereUniqueInput
  }

  /**
   * CompressionRun updateMany
   */
  export type CompressionRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompressionRuns.
     */
    data: XOR<CompressionRunUpdateManyMutationInput, CompressionRunUncheckedUpdateManyInput>
    /**
     * Filter which CompressionRuns to update
     */
    where?: CompressionRunWhereInput
    /**
     * Limit how many CompressionRuns to update.
     */
    limit?: number
  }

  /**
   * CompressionRun updateManyAndReturn
   */
  export type CompressionRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * The data used to update CompressionRuns.
     */
    data: XOR<CompressionRunUpdateManyMutationInput, CompressionRunUncheckedUpdateManyInput>
    /**
     * Filter which CompressionRuns to update
     */
    where?: CompressionRunWhereInput
    /**
     * Limit how many CompressionRuns to update.
     */
    limit?: number
  }

  /**
   * CompressionRun upsert
   */
  export type CompressionRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * The filter to search for the CompressionRun to update in case it exists.
     */
    where: CompressionRunWhereUniqueInput
    /**
     * In case the CompressionRun found by the `where` argument doesn't exist, create a new CompressionRun with this data.
     */
    create: XOR<CompressionRunCreateInput, CompressionRunUncheckedCreateInput>
    /**
     * In case the CompressionRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompressionRunUpdateInput, CompressionRunUncheckedUpdateInput>
  }

  /**
   * CompressionRun delete
   */
  export type CompressionRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
    /**
     * Filter which CompressionRun to delete.
     */
    where: CompressionRunWhereUniqueInput
  }

  /**
   * CompressionRun deleteMany
   */
  export type CompressionRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompressionRuns to delete
     */
    where?: CompressionRunWhereInput
    /**
     * Limit how many CompressionRuns to delete.
     */
    limit?: number
  }

  /**
   * CompressionRun without action
   */
  export type CompressionRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompressionRun
     */
    select?: CompressionRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompressionRun
     */
    omit?: CompressionRunOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompressionRunScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    pipelineMode: 'pipelineMode',
    originalFilename: 'originalFilename',
    transformType: 'transformType',
    quality: 'quality',
    sparsity: 'sparsity',
    threshold: 'threshold',
    mse: 'mse',
    psnr: 'psnr',
    originalUploadBytes: 'originalUploadBytes',
    reconstructedPngBytes: 'reconstructedPngBytes',
    estimatedTransformBytes: 'estimatedTransformBytes',
    imageWidth: 'imageWidth',
    imageHeight: 'imageHeight',
    originalPreviewPngBytes: 'originalPreviewPngBytes',
    compressionRatio: 'compressionRatio',
    retainedCoefficients: 'retainedCoefficients',
    bppEstimate: 'bppEstimate',
    quantizationLabel: 'quantizationLabel',
    originalImagePath: 'originalImagePath',
    reconstructedImagePath: 'reconstructedImagePath',
    dctPreviewPath: 'dctPreviewPath',
    quantPreviewPath: 'quantPreviewPath'
  };

  export type CompressionRunScalarFieldEnum = (typeof CompressionRunScalarFieldEnum)[keyof typeof CompressionRunScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CompressionRunWhereInput = {
    AND?: CompressionRunWhereInput | CompressionRunWhereInput[]
    OR?: CompressionRunWhereInput[]
    NOT?: CompressionRunWhereInput | CompressionRunWhereInput[]
    id?: StringFilter<"CompressionRun"> | string
    createdAt?: DateTimeFilter<"CompressionRun"> | Date | string
    pipelineMode?: StringFilter<"CompressionRun"> | string
    originalFilename?: StringFilter<"CompressionRun"> | string
    transformType?: StringFilter<"CompressionRun"> | string
    quality?: IntFilter<"CompressionRun"> | number
    sparsity?: FloatFilter<"CompressionRun"> | number
    threshold?: FloatFilter<"CompressionRun"> | number
    mse?: FloatFilter<"CompressionRun"> | number
    psnr?: FloatFilter<"CompressionRun"> | number
    originalUploadBytes?: IntFilter<"CompressionRun"> | number
    reconstructedPngBytes?: IntFilter<"CompressionRun"> | number
    estimatedTransformBytes?: IntFilter<"CompressionRun"> | number
    imageWidth?: IntFilter<"CompressionRun"> | number
    imageHeight?: IntFilter<"CompressionRun"> | number
    originalPreviewPngBytes?: IntFilter<"CompressionRun"> | number
    compressionRatio?: FloatFilter<"CompressionRun"> | number
    retainedCoefficients?: IntFilter<"CompressionRun"> | number
    bppEstimate?: FloatFilter<"CompressionRun"> | number
    quantizationLabel?: StringFilter<"CompressionRun"> | string
    originalImagePath?: StringFilter<"CompressionRun"> | string
    reconstructedImagePath?: StringFilter<"CompressionRun"> | string
    dctPreviewPath?: StringNullableFilter<"CompressionRun"> | string | null
    quantPreviewPath?: StringNullableFilter<"CompressionRun"> | string | null
  }

  export type CompressionRunOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    pipelineMode?: SortOrder
    originalFilename?: SortOrder
    transformType?: SortOrder
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
    quantizationLabel?: SortOrder
    originalImagePath?: SortOrder
    reconstructedImagePath?: SortOrder
    dctPreviewPath?: SortOrderInput | SortOrder
    quantPreviewPath?: SortOrderInput | SortOrder
  }

  export type CompressionRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompressionRunWhereInput | CompressionRunWhereInput[]
    OR?: CompressionRunWhereInput[]
    NOT?: CompressionRunWhereInput | CompressionRunWhereInput[]
    createdAt?: DateTimeFilter<"CompressionRun"> | Date | string
    pipelineMode?: StringFilter<"CompressionRun"> | string
    originalFilename?: StringFilter<"CompressionRun"> | string
    transformType?: StringFilter<"CompressionRun"> | string
    quality?: IntFilter<"CompressionRun"> | number
    sparsity?: FloatFilter<"CompressionRun"> | number
    threshold?: FloatFilter<"CompressionRun"> | number
    mse?: FloatFilter<"CompressionRun"> | number
    psnr?: FloatFilter<"CompressionRun"> | number
    originalUploadBytes?: IntFilter<"CompressionRun"> | number
    reconstructedPngBytes?: IntFilter<"CompressionRun"> | number
    estimatedTransformBytes?: IntFilter<"CompressionRun"> | number
    imageWidth?: IntFilter<"CompressionRun"> | number
    imageHeight?: IntFilter<"CompressionRun"> | number
    originalPreviewPngBytes?: IntFilter<"CompressionRun"> | number
    compressionRatio?: FloatFilter<"CompressionRun"> | number
    retainedCoefficients?: IntFilter<"CompressionRun"> | number
    bppEstimate?: FloatFilter<"CompressionRun"> | number
    quantizationLabel?: StringFilter<"CompressionRun"> | string
    originalImagePath?: StringFilter<"CompressionRun"> | string
    reconstructedImagePath?: StringFilter<"CompressionRun"> | string
    dctPreviewPath?: StringNullableFilter<"CompressionRun"> | string | null
    quantPreviewPath?: StringNullableFilter<"CompressionRun"> | string | null
  }, "id">

  export type CompressionRunOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    pipelineMode?: SortOrder
    originalFilename?: SortOrder
    transformType?: SortOrder
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
    quantizationLabel?: SortOrder
    originalImagePath?: SortOrder
    reconstructedImagePath?: SortOrder
    dctPreviewPath?: SortOrderInput | SortOrder
    quantPreviewPath?: SortOrderInput | SortOrder
    _count?: CompressionRunCountOrderByAggregateInput
    _avg?: CompressionRunAvgOrderByAggregateInput
    _max?: CompressionRunMaxOrderByAggregateInput
    _min?: CompressionRunMinOrderByAggregateInput
    _sum?: CompressionRunSumOrderByAggregateInput
  }

  export type CompressionRunScalarWhereWithAggregatesInput = {
    AND?: CompressionRunScalarWhereWithAggregatesInput | CompressionRunScalarWhereWithAggregatesInput[]
    OR?: CompressionRunScalarWhereWithAggregatesInput[]
    NOT?: CompressionRunScalarWhereWithAggregatesInput | CompressionRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompressionRun"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CompressionRun"> | Date | string
    pipelineMode?: StringWithAggregatesFilter<"CompressionRun"> | string
    originalFilename?: StringWithAggregatesFilter<"CompressionRun"> | string
    transformType?: StringWithAggregatesFilter<"CompressionRun"> | string
    quality?: IntWithAggregatesFilter<"CompressionRun"> | number
    sparsity?: FloatWithAggregatesFilter<"CompressionRun"> | number
    threshold?: FloatWithAggregatesFilter<"CompressionRun"> | number
    mse?: FloatWithAggregatesFilter<"CompressionRun"> | number
    psnr?: FloatWithAggregatesFilter<"CompressionRun"> | number
    originalUploadBytes?: IntWithAggregatesFilter<"CompressionRun"> | number
    reconstructedPngBytes?: IntWithAggregatesFilter<"CompressionRun"> | number
    estimatedTransformBytes?: IntWithAggregatesFilter<"CompressionRun"> | number
    imageWidth?: IntWithAggregatesFilter<"CompressionRun"> | number
    imageHeight?: IntWithAggregatesFilter<"CompressionRun"> | number
    originalPreviewPngBytes?: IntWithAggregatesFilter<"CompressionRun"> | number
    compressionRatio?: FloatWithAggregatesFilter<"CompressionRun"> | number
    retainedCoefficients?: IntWithAggregatesFilter<"CompressionRun"> | number
    bppEstimate?: FloatWithAggregatesFilter<"CompressionRun"> | number
    quantizationLabel?: StringWithAggregatesFilter<"CompressionRun"> | string
    originalImagePath?: StringWithAggregatesFilter<"CompressionRun"> | string
    reconstructedImagePath?: StringWithAggregatesFilter<"CompressionRun"> | string
    dctPreviewPath?: StringNullableWithAggregatesFilter<"CompressionRun"> | string | null
    quantPreviewPath?: StringNullableWithAggregatesFilter<"CompressionRun"> | string | null
  }

  export type CompressionRunCreateInput = {
    id?: string
    createdAt?: Date | string
    pipelineMode?: string
    originalFilename: string
    transformType: string
    quality: number
    sparsity: number
    threshold?: number
    mse: number
    psnr: number
    originalUploadBytes?: number
    reconstructedPngBytes?: number
    estimatedTransformBytes?: number
    imageWidth?: number
    imageHeight?: number
    originalPreviewPngBytes?: number
    compressionRatio: number
    retainedCoefficients: number
    bppEstimate: number
    quantizationLabel: string
    originalImagePath?: string
    reconstructedImagePath?: string
    dctPreviewPath?: string | null
    quantPreviewPath?: string | null
  }

  export type CompressionRunUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    pipelineMode?: string
    originalFilename: string
    transformType: string
    quality: number
    sparsity: number
    threshold?: number
    mse: number
    psnr: number
    originalUploadBytes?: number
    reconstructedPngBytes?: number
    estimatedTransformBytes?: number
    imageWidth?: number
    imageHeight?: number
    originalPreviewPngBytes?: number
    compressionRatio: number
    retainedCoefficients: number
    bppEstimate: number
    quantizationLabel: string
    originalImagePath?: string
    reconstructedImagePath?: string
    dctPreviewPath?: string | null
    quantPreviewPath?: string | null
  }

  export type CompressionRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pipelineMode?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    transformType?: StringFieldUpdateOperationsInput | string
    quality?: IntFieldUpdateOperationsInput | number
    sparsity?: FloatFieldUpdateOperationsInput | number
    threshold?: FloatFieldUpdateOperationsInput | number
    mse?: FloatFieldUpdateOperationsInput | number
    psnr?: FloatFieldUpdateOperationsInput | number
    originalUploadBytes?: IntFieldUpdateOperationsInput | number
    reconstructedPngBytes?: IntFieldUpdateOperationsInput | number
    estimatedTransformBytes?: IntFieldUpdateOperationsInput | number
    imageWidth?: IntFieldUpdateOperationsInput | number
    imageHeight?: IntFieldUpdateOperationsInput | number
    originalPreviewPngBytes?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    retainedCoefficients?: IntFieldUpdateOperationsInput | number
    bppEstimate?: FloatFieldUpdateOperationsInput | number
    quantizationLabel?: StringFieldUpdateOperationsInput | string
    originalImagePath?: StringFieldUpdateOperationsInput | string
    reconstructedImagePath?: StringFieldUpdateOperationsInput | string
    dctPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
    quantPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompressionRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pipelineMode?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    transformType?: StringFieldUpdateOperationsInput | string
    quality?: IntFieldUpdateOperationsInput | number
    sparsity?: FloatFieldUpdateOperationsInput | number
    threshold?: FloatFieldUpdateOperationsInput | number
    mse?: FloatFieldUpdateOperationsInput | number
    psnr?: FloatFieldUpdateOperationsInput | number
    originalUploadBytes?: IntFieldUpdateOperationsInput | number
    reconstructedPngBytes?: IntFieldUpdateOperationsInput | number
    estimatedTransformBytes?: IntFieldUpdateOperationsInput | number
    imageWidth?: IntFieldUpdateOperationsInput | number
    imageHeight?: IntFieldUpdateOperationsInput | number
    originalPreviewPngBytes?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    retainedCoefficients?: IntFieldUpdateOperationsInput | number
    bppEstimate?: FloatFieldUpdateOperationsInput | number
    quantizationLabel?: StringFieldUpdateOperationsInput | string
    originalImagePath?: StringFieldUpdateOperationsInput | string
    reconstructedImagePath?: StringFieldUpdateOperationsInput | string
    dctPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
    quantPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompressionRunCreateManyInput = {
    id?: string
    createdAt?: Date | string
    pipelineMode?: string
    originalFilename: string
    transformType: string
    quality: number
    sparsity: number
    threshold?: number
    mse: number
    psnr: number
    originalUploadBytes?: number
    reconstructedPngBytes?: number
    estimatedTransformBytes?: number
    imageWidth?: number
    imageHeight?: number
    originalPreviewPngBytes?: number
    compressionRatio: number
    retainedCoefficients: number
    bppEstimate: number
    quantizationLabel: string
    originalImagePath?: string
    reconstructedImagePath?: string
    dctPreviewPath?: string | null
    quantPreviewPath?: string | null
  }

  export type CompressionRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pipelineMode?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    transformType?: StringFieldUpdateOperationsInput | string
    quality?: IntFieldUpdateOperationsInput | number
    sparsity?: FloatFieldUpdateOperationsInput | number
    threshold?: FloatFieldUpdateOperationsInput | number
    mse?: FloatFieldUpdateOperationsInput | number
    psnr?: FloatFieldUpdateOperationsInput | number
    originalUploadBytes?: IntFieldUpdateOperationsInput | number
    reconstructedPngBytes?: IntFieldUpdateOperationsInput | number
    estimatedTransformBytes?: IntFieldUpdateOperationsInput | number
    imageWidth?: IntFieldUpdateOperationsInput | number
    imageHeight?: IntFieldUpdateOperationsInput | number
    originalPreviewPngBytes?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    retainedCoefficients?: IntFieldUpdateOperationsInput | number
    bppEstimate?: FloatFieldUpdateOperationsInput | number
    quantizationLabel?: StringFieldUpdateOperationsInput | string
    originalImagePath?: StringFieldUpdateOperationsInput | string
    reconstructedImagePath?: StringFieldUpdateOperationsInput | string
    dctPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
    quantPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompressionRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pipelineMode?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    transformType?: StringFieldUpdateOperationsInput | string
    quality?: IntFieldUpdateOperationsInput | number
    sparsity?: FloatFieldUpdateOperationsInput | number
    threshold?: FloatFieldUpdateOperationsInput | number
    mse?: FloatFieldUpdateOperationsInput | number
    psnr?: FloatFieldUpdateOperationsInput | number
    originalUploadBytes?: IntFieldUpdateOperationsInput | number
    reconstructedPngBytes?: IntFieldUpdateOperationsInput | number
    estimatedTransformBytes?: IntFieldUpdateOperationsInput | number
    imageWidth?: IntFieldUpdateOperationsInput | number
    imageHeight?: IntFieldUpdateOperationsInput | number
    originalPreviewPngBytes?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    retainedCoefficients?: IntFieldUpdateOperationsInput | number
    bppEstimate?: FloatFieldUpdateOperationsInput | number
    quantizationLabel?: StringFieldUpdateOperationsInput | string
    originalImagePath?: StringFieldUpdateOperationsInput | string
    reconstructedImagePath?: StringFieldUpdateOperationsInput | string
    dctPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
    quantPreviewPath?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CompressionRunCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    pipelineMode?: SortOrder
    originalFilename?: SortOrder
    transformType?: SortOrder
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
    quantizationLabel?: SortOrder
    originalImagePath?: SortOrder
    reconstructedImagePath?: SortOrder
    dctPreviewPath?: SortOrder
    quantPreviewPath?: SortOrder
  }

  export type CompressionRunAvgOrderByAggregateInput = {
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
  }

  export type CompressionRunMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    pipelineMode?: SortOrder
    originalFilename?: SortOrder
    transformType?: SortOrder
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
    quantizationLabel?: SortOrder
    originalImagePath?: SortOrder
    reconstructedImagePath?: SortOrder
    dctPreviewPath?: SortOrder
    quantPreviewPath?: SortOrder
  }

  export type CompressionRunMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    pipelineMode?: SortOrder
    originalFilename?: SortOrder
    transformType?: SortOrder
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
    quantizationLabel?: SortOrder
    originalImagePath?: SortOrder
    reconstructedImagePath?: SortOrder
    dctPreviewPath?: SortOrder
    quantPreviewPath?: SortOrder
  }

  export type CompressionRunSumOrderByAggregateInput = {
    quality?: SortOrder
    sparsity?: SortOrder
    threshold?: SortOrder
    mse?: SortOrder
    psnr?: SortOrder
    originalUploadBytes?: SortOrder
    reconstructedPngBytes?: SortOrder
    estimatedTransformBytes?: SortOrder
    imageWidth?: SortOrder
    imageHeight?: SortOrder
    originalPreviewPngBytes?: SortOrder
    compressionRatio?: SortOrder
    retainedCoefficients?: SortOrder
    bppEstimate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}