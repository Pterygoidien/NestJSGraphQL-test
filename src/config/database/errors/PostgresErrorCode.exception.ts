export enum PostgresErrorCode {
  Unique_Violation = '23505',
  No_Data = '02000',
  Async_Not_Yet_Complete = '03000',
  Connection_Exception = '08000',
  Connection_Does_Not_Exist = '08003',
  Connection_Failure = '08006',
  Transaction_Resolution_Unknown = '08007',
}
