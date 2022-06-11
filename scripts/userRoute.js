"use strict";
exports.__esModule = true;
exports.userRoute = void 0;
exports.userRoute = [
    {
        name: 'Register user',
        description: 'Register new user',
        endpoint: '/users',
        method: 'POST',
        queryString: [
            {
                type: 'string',
                name: 'name',
                description: 'User name',
                required: true
            },
            {
                type: 'string',
                name: 'email',
                description: 'User Email',
                required: true
            },
            {
                type: 'string',
                name: 'password',
                description: 'User password',
                required: true
            },
            {
                type: 'string',
                name: 'age',
                description: 'User age',
                required: false
            }
        ],
        response: {
            code: 201,
            user: [
                {
                    id: 1,
                    name: 'Suhaib',
                    email: 'hello4gmail@gmail.com',
                    age: 22,
                    createdAt: '2022-06-11T17:43:05.503Z',
                    updatedAt: '2022-06-11T17:43:05.503Z'
                },
                { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' }
            ]
        }
    },
    {
        name: 'Login User',
        description: 'Login registered user',
        endpoint: '/users/login',
        method: 'POST',
        queryString: [
            {
                type: 'string',
                name: 'email',
                description: 'User Email',
                required: true
            },
            {
                type: 'string',
                name: 'password',
                description: 'User password',
                required: true
            }
        ],
        response: {
            code: 200,
            user: [
                {
                    id: 1,
                    name: 'Suhaib',
                    email: 'hello4gmail@gmail.com',
                    age: 22,
                    createdAt: '2022-06-11T17:43:05.503Z',
                    updatedAt: '2022-06-11T17:43:05.503Z'
                },
                { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' }
            ]
        }
    },
    {
        name: 'Logout current session',
        description: 'Logout user from the current device',
        endpoint: '/users/logout',
        method: 'POST',
        authenticated: true,
        queryString: [
            {
                type: 'string',
                name: 'email',
                description: 'User Email',
                required: true
            },
            {
                type: 'string',
                name: 'password',
                description: 'User password',
                required: true
            }
        ],
        response: {
            code: 200,
            msg: 'Logged out'
        }
    },
    {
        name: 'Logout all session',
        description: 'Logout user from all the device',
        endpoint: '/users/logoutAll',
        method: 'POST',
        authenticated: true,
        queryString: [
            {
                type: 'string',
                name: 'email',
                description: 'User Email',
                required: true
            },
            {
                type: 'string',
                name: 'password',
                description: 'User password',
                required: true
            }
        ],
        response: {
            code: 200,
            msg: 'Logged out from all the device'
        }
    },
    {
        name: 'Get user profile',
        description: 'Get profile of the current user',
        endpoint: '/users/me',
        method: 'GET',
        authenticated: true,
        response: {
            code: 200,
            user: {
                id: 1,
                name: 'Suhaib',
                email: 'hello3gmail@gmail.com',
                age: 22,
                createdAt: '2022-06-11T17:43:03.023Z',
                updatedAt: '2022-06-11T17:43:03.023Z'
            }
        }
    },
    {
        name: 'Edit user profile',
        description: 'Edit current user profile',
        endpoint: '/users/me',
        method: 'PATCH',
        authenticated: true,
        queryString: [
            {
                type: 'string',
                name: 'name',
                description: 'User name'
            },
            {
                type: 'string',
                name: 'password',
                description: 'User password'
            },
            {
                type: 'string',
                name: 'email',
                description: 'User email'
            },
            {
                type: 'string',
                name: 'age',
                description: 'User age'
            }
        ],
        response: {
            code: 200,
            user: {
                id: 1,
                name: 'Rafi',
                email: 'hello3gmail@gmail.com',
                age: 21,
                createdAt: '2022-06-11T17:43:03.023Z',
                updatedAt: '2022-06-11T17:43:03.023Z'
            }
        }
    }
];
