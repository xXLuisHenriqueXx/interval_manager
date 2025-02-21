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
    const currentValue = +input.value;

    if (input.lastEndNumber === 0) {
      isValid = isValid && currentValue === 0;
    } else {
      isValid = isValid && currentValue === input.lastEndNumber;
    }
  }

  return isValid;
};
