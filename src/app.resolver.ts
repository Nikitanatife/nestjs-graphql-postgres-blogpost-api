import { Query, Resolver } from '@nestjs/graphql';

@Resolver('App')
export class AppResolver {
  @Query(() => Boolean)
  async healthCheck() {
    return true;
  }
}
