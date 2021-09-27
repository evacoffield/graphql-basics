const Query = {
  //Destructure the ctx argument to access db
  users(parent, args, { db }, info) {
      if (!args.query) {
          return db.users
      }
      return db.users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
  },
  posts(parent, args, { db }, info) {
      if(!args.query) {
          return db.posts
      }
      return db.posts.filter((post) => {
          const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
          const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
          return isTitleMatch || isBodyMatch
      })
  },
  comments(parent, args, { db }, info) {
      return db.comments
  },
  me() {
      return {
          id: '123098',
          name: 'Eva',
          email: 'eva@example.com',
          age: 28,
      }
  },
  post() {
      return {
          id: '123456',
          title: 'Art of War',
          body: '',
          published: false,
      }
  }
}

export { Query as default }