export interface IValidatable {
  required: boolean;
  value: string | number;
  lastEndNumber?: number;
}

export const validate = (input: IValidatable) => {
  let isValid = true;

  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }

  if (input.lastEndNumber !== undefined) {
    if (input.lastEndNumber === 0) {
      isValid = isValid && +input.value === 0;
    } else {
      isValid = isValid && +input.value === input.lastEndNumber;
    }
  }

  return isValid;
};
