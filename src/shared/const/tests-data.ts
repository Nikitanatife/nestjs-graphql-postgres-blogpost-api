import { CreateUserInput } from '../../modules/auth/inputs';
import { UpdateBlogPostInput } from '../../modules/blog-post/dto/update-blog-post.input';
import { UpdateBlogInput } from '../../modules/blog/dto/update-blog.input';
import { User } from '../../modules/user/entities/user.entity';
import { UserRoles } from './user-roles';

export const testBaseEntity = {
  id: Date.now(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const testCreateWriterInput = {
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.com',
  role: UserRoles.WRITER,
} as CreateUserInput;

export const testPassword = 'Qwerty123.';
export const testHashedPassword =
  '$2a$10$fbUc0l4dQT1xfVVMpRhUHOGPlgkZIxcXVSUTfo9c9JE/2PKijfkMq';

export const testUpdateWriterInput = {
  firstName: 'Updated',
  lastName: 'Updated',
  email: 'update@test.com',
};

export const testWriter = {
  ...testBaseEntity,
  email: 'test@test.com',
  password: 'test',
  role: UserRoles.WRITER,
  firstName: 'Test',
  lastName: 'Test',
} as User;

export const testCreateBlogInput = { title: 'new', description: 'new' };

export const testUpdateBlogInput = {
  id: 1,
  title: 'updated',
  description: 'updated',
} as UpdateBlogInput;

export const testBlog = {
  ...testBaseEntity,
  ...testCreateBlogInput,
};

export const testCreateBlogPostInput = {
  ...testCreateBlogInput,
  content: 'test',
  blogId: 1,
};

export const apiTestCreateBlogPostInput = {
  ...testCreateBlogInput,
  content: 'test',
};

export const testUpdateBlogPostInput = {
  ...testUpdateBlogInput,
  content: 'updated',
} as UpdateBlogPostInput;

export const testBlogPost = {
  ...testBaseEntity,
  ...testCreateBlogPostInput,
};
