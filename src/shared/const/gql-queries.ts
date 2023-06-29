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

export const createBlogQuery = `
mutation createBlog($createBlogInput: CreateBlogInput!) {
    createBlog(createBlogInput: $createBlogInput) {
        id
        title
        description
        createdAt
        updatedAt
    }
}
`;

export const createBlogPostQuery = `
mutation createBlogPost($createBlogPostInput: CreateBlogPostInput!) {
    createBlogPost(createBlogPostInput: $createBlogPostInput) {
        id
        title
        description
        content
        createdAt
        updatedAt
    }
}`;

export const updateBlogPostQuery = `
mutation updateBlogPost($updateBlogPostInput: UpdateBlogPostInput!) {
    updateBlogPost(updateBlogPostInput: $updateBlogPostInput) {
        id
        title
        description
        content
        createdAt
        updatedAt
    }
}`;

export const removeBlogPostQuery = `
mutation removeBlogPost($id: Int!) {
    removeBlogPost(id: $id)
}
`;

export const updateBlogQuery = `
mutation updateBlog($updateBlogInput: UpdateBlogInput!) {
    updateBlog(updateBlogInput: $updateBlogInput) {
        id
        title
        description
        createdAt
        updatedAt
    }
}
`;

export const removeBlogQuery = `
mutation removeBlog($id: Int!) {
    removeBlog(id: $id)
}
`;

export const findAllBlogsQery = `
query findAllBlogs {
    findAllBlogs {
        id
        title
        description
        createdAt
        updatedAt
    }
}
`;

export const findAllBlogPostsQuery = `
query findAllBlogPostsByBlogId($blogId: Int!) {
    findAllBlogPostsByBlogId(blogId: $blogId) {
        id
        title
        content
        description
        createdAt
        updatedAt
    }
}
`;
