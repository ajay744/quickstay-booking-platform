export const ApiEndpoints = {
    auth: {
      login: '/users',
      register: '/users',
    },
    users: {
      getAll: '/users',
      getById: (id: string) => `/users/${id}`,
    },
    pg: {
      add: '/bookPg',
      list: '/bookPg',
      booking:"/bookPg",
      deleteBooking:"/bookPg/"
    },
    boysPg:{
      get:'/boysPg',
      post:'/boysPg'
    },
    girlsPg:{
      get:'/girlsPg',
      post:'/girlsPg'

    },
    privateRoom:{
      get:'/privateRoom',
      post:'/privateRoom'

    },
    sharedRoom:{
      get:'/sharedRoom',
      post:'/sharedRoom'

    }
  };
  