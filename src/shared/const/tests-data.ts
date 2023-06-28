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
};

export const testWriter: User = {
  ...testBaseEntity,
  email: 'test@test.com',
  password: 'test',
  role: UserRoles.WRITER,
  firstName: 'Test',
  lastName: 'Test',
  async validate(): Promise<void> {
    return Promise.resolve();
  },
};

export const testCreateBlogInput = { title: 'new', description: 'new' };

export const testBlog = {
  ...testBaseEntity,
  ...testCreateBlogInput,
};

export const testCreateBlogPostInput = {
  ...testCreateBlogInput,
  content: 'test',
  blogId: 1,
};

export const testBlogPost = {
  ...testBaseEntity,
  ...testCreateBlogPostInput,
};
