import { ForbiddenError } from '@nestjs/apollo';
import { BlogPost } from '../../modules/blog-post/entities/blog-post.entity';
import { Blog } from '../../modules/blog/entities/blog.entity';
import { User } from '../../modules/user/entities/user.entity';
import { FORBIDDEN_ERROR, UserRoles } from '../const';

export function checkUserRole(user: User, entity: Blog | BlogPost) {
  const hasAccess =
    user.role === UserRoles.MODERATOR || user.id === entity.authorId;

  if (!hasAccess) {
    throw new ForbiddenError(FORBIDDEN_ERROR);
  }
}
