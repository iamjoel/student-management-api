import { RO, Status } from '../declarations/service';

export const handler = async (fn: () => any): Promise<RO> => {
  try {
    const res = await fn();
    return {
      code: Status.success,
      data: res,
    };
  } catch (e) {
    return {
      code: Status.fail,
      errorMessage: e.toString(),
    };
  }
};

export default handler;
