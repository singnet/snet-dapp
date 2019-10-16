export const forgotPasswordConstraints = {
  email: { presence: { allowEmpty: false }, email: { message: "'%{value}' is not valid" } },
};
