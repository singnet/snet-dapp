export const signup_form_constraints = {
  nickname: {
    presence: { allowEmpty: false },
  },
  email: { presence: { allowEmpty: false }, email: true },
  password: {
    presence: { allowEmpty: false },
    hasLowerCase: true,
    hasUpperCase: true,
    hasNumber: true,
    hasAWSPasswordSplChar: true,
    length: { minimum: 8 },
  },
};

export const singup_otp_contraints = {
  otp: { presence: { allowEmpty: false }, length: { minimum: 6 } },
};
