import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { User } from '../src/modules/user/entities/user.entity';
import {
  apiTestCreateBlogPostInput,
  createBlogPostQuery,
  createBlogQuery,
  findAllBlogPostsQuery,
  findAllBlogsQery,
  loginUserQuery,
  logoutUserQuery,
  registerUserQuery,
  removeBlogPostQuery,
  removeBlogQuery,
  testCreateBlogInput,
  testCreateBlogPostInput,
  testCreateWriterInput,
  testPassword,
  updateBlogPostQuery,
  updateBlogQuery,
} from '../src/shared/const';
import { AppModule } from './../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

const distPath = path.join(__dirname, '../', 'dist');
const gql = '/graphql';
const testBaseEntity = {
  id: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

describe('GraphQL AppModule (e2e) test', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  // !dist folder must be deleted before all tests
  beforeAll(async () => {
    if (fs.existsSync(distPath)) {
      fs.rmdir(distPath, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        console.log(`dist folder is deleted`);
      });
    }
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    userRepository = moduleFixture.get('UserRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await userRepository.query('DELETE FROM "user" WHERE id > 0');
    await userRepository.query('DELETE FROM "blog" WHERE id > 0');
    await userRepository.query('DELETE FROM "blog_post" WHERE id > 0');
  });

  it('register > success', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.register).toEqual({
          ...testCreateWriterInput,
          ...testBaseEntity,
          token: expect.any(String),
        });
      });
  });

  it('register user > register user again > throw conflict exception', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200);
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.errors[0].message).toEqual(
          '409 Conflict: "Email already exists"',
        );
      });
  });

  it('login > success', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200);
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          loginInput: {
            email: testCreateWriterInput.email,
            password: testPassword,
          },
        },
        query: loginUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.login).toEqual({
          ...testCreateWriterInput,
          ...testBaseEntity,
          token: expect.any(String),
        });
      });
  });

  it('login > wrong credentials > throw bad request exception', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          loginInput: {
            email: testCreateWriterInput.email,
            password: testPassword,
          },
        },
        query: loginUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.errors[0].message).toEqual(
          '400 Bad Request: "Wrong credentials"',
        );
      });
  });

  it('logout > success', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200);
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization: 'Bearer ' + registerResponse.body?.data?.register?.token,
      })
      .send({
        query: logoutUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.logout).toEqual(true);
      });
  });

  it('logout > token type not Bearer > throw unauthorized exception', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200);
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization: registerResponse.body?.data?.register?.token,
      })
      .send({
        query: logoutUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.errors[0].message).toEqual(
          '401 Unauthorized: "Unauthorized"',
        );
      });
  });

  it('logout > no token > throw unauthorized exception', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .send({
        query: logoutUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.errors[0].message).toEqual(
          '401 Unauthorized: "Unauthorized"',
        );
      });
  });

  it('logout > not walid token > throw unauthorized exception', async () => {
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization: 'token',
      })
      .send({
        query: logoutUserQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.errors[0].message).toEqual(
          '401 Unauthorized: "Unauthorized"',
        );
      });
  });

  it('register writer > create blog > create blog post > register moderator > manage blog & post', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
          },
        },
        query: registerUserQuery,
      })
      .expect(200);
    const createBlogResponse = await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization: 'Bearer ' + registerResponse.body?.data?.register?.token,
      })
      .send({
        variables: {
          createBlogInput: testCreateBlogInput,
        },
        query: createBlogQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.createBlog).toEqual({
          ...testCreateBlogInput,
          ...testBaseEntity,
        });
      });
    const createBlogPostResponse = await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization: 'Bearer ' + registerResponse.body?.data?.register?.token,
      })
      .send({
        variables: {
          createBlogPostInput: {
            ...apiTestCreateBlogPostInput,
            blogId: +createBlogResponse.body?.data?.createBlog?.id,
          },
        },
        query: createBlogPostQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.createBlogPost).toEqual({
          ...apiTestCreateBlogPostInput,
          ...testBaseEntity,
        });
      });
    await request(app.getHttpServer())
      .post(gql)
      .send({
        query: findAllBlogsQery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.findAllBlogs).toEqual([
          {
            ...testCreateBlogInput,
            ...testBaseEntity,
          },
        ]);
      });
    await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          blogId: +createBlogResponse.body?.data?.createBlog?.id,
        },
        query: findAllBlogPostsQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.findAllBlogPostsByBlogId).toEqual([
          {
            ...apiTestCreateBlogPostInput,
            ...testBaseEntity,
          },
        ]);
      });
    const registerModeratorResponse = await request(app.getHttpServer())
      .post(gql)
      .send({
        variables: {
          registerInput: {
            ...testCreateWriterInput,
            password: testPassword,
            role: 'MODERATOR',
            email: 'moderator@test.com',
          },
        },
        query: registerUserQuery,
      })
      .expect(200);
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization:
          'Bearer ' + registerModeratorResponse.body?.data?.register?.token,
      })
      .send({
        variables: {
          updateBlogPostInput: {
            content: 'updated content',
            id: +createBlogPostResponse.body?.data?.createBlogPost?.id,
          },
        },
        query: updateBlogPostQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.updateBlogPost).toEqual({
          ...apiTestCreateBlogPostInput,
          ...testBaseEntity,
          content: 'updated content',
        });
      });
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization:
          'Bearer ' + registerModeratorResponse.body?.data?.register?.token,
      })
      .send({
        variables: {
          id: +createBlogPostResponse.body?.data?.createBlogPost?.id,
        },
        query: removeBlogPostQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.removeBlogPost).toEqual(true);
      });
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization:
          'Bearer ' + registerModeratorResponse.body?.data?.register?.token,
      })
      .send({
        variables: {
          updateBlogInput: {
            title: 'updated title',
            id: +createBlogResponse.body?.data?.createBlog?.id,
          },
        },
        query: updateBlogQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.updateBlog).toEqual({
          ...testCreateBlogInput,
          ...testBaseEntity,
          title: 'updated title',
        });
      });
    await request(app.getHttpServer())
      .post(gql)
      .set({
        authorization:
          'Bearer ' + registerModeratorResponse.body?.data?.register?.token,
      })
      .send({
        variables: {
          id: +createBlogResponse.body?.data?.createBlog?.id,
        },
        query: removeBlogQuery,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body?.data?.removeBlog).toEqual(true);
      });
  });
});
