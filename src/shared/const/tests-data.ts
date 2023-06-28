import { User } from '../../modules/user/entities/user.entity';
import { UserRoles } from './user-roles';

export const baseEntity = {
  id: Date.now(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const testWriter: User = {
  ...baseEntity,
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
  ...baseEntity,
  ...testCreateBlogInput,
};

// export const testUpdateBlogInput: UpdateBlogInput = {
//     id: 1,
//     title: 'test',
//     description: 'test',
// }
