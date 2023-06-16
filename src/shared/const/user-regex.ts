export const USER_NAME_REGEX = /^[a-z ,.'-]+$/i;
export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/; // special/number/capital/lowercase
