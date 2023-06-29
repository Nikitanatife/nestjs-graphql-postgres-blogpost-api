export const registerUserQuery = `
  mutation register($registerInput: CreateUserInput!) {
    register(registerInput: $registerInput) {
      token
      createdAt
      updatedAt
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const loginUserQuery = `
  mutation login($loginInput: LoginInput!){
    login(loginInput: $loginInput) {
      token
      createdAt
      updatedAt
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const logoutUserQuery = `
  query logout {
    logout
  }
`;
