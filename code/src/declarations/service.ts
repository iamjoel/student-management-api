export enum Status {
  success = 0,
  fail = -1,
}

export interface RO {
  code: Status;
  errorMessage?: string;
  data?: any;
}
