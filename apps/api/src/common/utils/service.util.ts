export type HandleServiceResult<T> = {
  entity: T | null;
  isSuccess: boolean;
  msg: string;
};
