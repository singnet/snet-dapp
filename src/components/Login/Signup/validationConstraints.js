export const signupFormConstraints = {
  nickname: { presence: { allowEmpty: false } },
  email: { presence: { allowEmpty: false }, email: { message: "'%{value}' is not valid" } },
  password: {
    presence: { allowEmpty: false },
    hasLowerCase: true,
    hasUpperCase: true,
    hasNumber: true,
    hasAWSPasswordSplChar: true,
    length: { minimum: 8 },
  },
};

export const singupOtpContraints = {
  otp: { presence: { allowEmpty: false }, length: { minimum: 6 } },
};

export const passwordInlineConstraints = {
  lowerCase: { hasLowerCase: true },
  upperCase: { hasUpperCase: true },
  number: { hasNumber: true },
  AWSSplChars: { hasAWSPasswordSplChar: true },
  length: { length: { minimum: 8 } },
};
