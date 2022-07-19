import { ValidationError, validate as validateTool } from 'class-validator';

export const validate = async (
  obj: Record<string, any>,
  newObj: Record<string, any>,
): Promise<string> => {
  Object.keys(obj).forEach(key => {
    newObj[key] = obj[key];
  });
  const errors = await validateTool(newObj); // 只会验证 new 出来的对象
  if (errors.length > 0) {
    const errorMessage = getBeautyErrorMessage(errors);
    return errorMessage;
  } else {
    return '';
  }
};

function getBeautyErrorMessage(errors: ValidationError[]): string {
  const error = errors[0];
  const firstKey = Object.keys(error.constraints)[0];
  return error.constraints[firstKey];
}
