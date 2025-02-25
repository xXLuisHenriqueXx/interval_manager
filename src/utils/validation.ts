export interface IValidatable {
  required: boolean;
  value: string | number;
  lastEndNumber?: number;
}

export const validate = ({ required, value, lastEndNumber }: IValidatable) => {
  const inputValue = value.toString().trim();

  if (required && inputValue.length === 0) return false;

  if (lastEndNumber !== undefined && lastEndNumber !== Number(value)) return false;

  return true;
};
