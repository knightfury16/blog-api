import { API } from './apiToReadme';

export const blogRoute: API[] = [
  {
    name: 'Create blog',
    description: 'Create new blog for login user',
    endpoint: '/blogs/create',
    method: 'POST',
    authenticated: true,
    queryString: [
      {
        type: 'string',
        name: 'title',
        description: 'Blog title',
        required: true
      },

      {
        type: 'string',
        name: 'description',
        description: 'Blog description',
        required: true
      }
    ],
    response: {
      code: 201,
      blog: {
        id: 5,
        ownerId: 3,
        title: 'My first blog',
        description: 'description of my first blog',
        createdAt: '2022-06-11T17:46:41.866Z',
        updatedAt: '2022-06-11T17:46:41.866Z'
      }
    }
  },
  {
    name: 'Get blogs',
    description: 'Get most recent blogs (10 by default)',
    endpoint: '/blogs',
    method: 'GET',
    queryString: [
      {
        type: 'string',
        name: '?limit',
        description: 'Limit the number of blogs fetched from database.(10 default)'
      },
      {
        type: 'string',
        name: '?skip',
        description: 'Skip the number of blogs fetched from the database.'
      }
    ],

    request: 'localhost/blogs?limit=2&skip=2',
    response: {
      code: 200,
      blogs: [
        {
          id: 2,
          title: 'My second blog',
          description: 'description of my second blog',
          createdAt: '2022-06-11T17:45:23.882Z',
          updatedAt: '2022-06-11T17:45:23.882Z',
          ownerId: 4
        },
        {
          id: 1,
          title: 'My first blog',
          description: 'description of my first blog',
          createdAt: '2022-06-11T17:45:12.916Z',
          updatedAt: '2022-06-11T17:45:12.916Z',
          ownerId: 4
        }
      ]
    }
  },
  {
    name: 'Get blog by id',
    description: 'Get a specific blog by id',
    endpoint: '/blogs/:id',
    method: 'GET',

    request: 'localhost/blogs/2',
    response: {
      code: 200,
      blog: [
        {
          id: 2,
          title: 'My second blog',
          description: 'description of my second blog',
          createdAt: '2022-06-11T17:45:23.882Z',
          updatedAt: '2022-06-11T17:45:23.882Z',
          ownerId: 4
        }
      ]
    }
  },
  {
    name: 'Delete blog',
    description: 'Delete a blog by id',
    endpoint: '/blogs/:id',
    method: 'DELETE',
    authenticated: true,

    request: 'localhost/blogs/2',
    response: {
      code: 200
    }
  }
];
