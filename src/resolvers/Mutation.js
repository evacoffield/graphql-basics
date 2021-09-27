import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(parent, args, { db }, info) {
      // Make sure that there is no user with that email 
      const emailTaken = db.users.some((user) => user.email === args.data.email)
      if (emailTaken) {
          throw new Error('Email taken.')
      }

      const user = {
          id: uuidv4(),
          ...args.data,
      }
      db.users.push(user)
      return user
  },
  deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex((user) => user.id === args.id)

      //if user is not found findIndex returns -1
      if ( userIndex === -1 ) {
          throw new Error('User not found')
      }
      //in splice array method the first argument is an index of the item that we want to remove, the next argument is how many items we want to remove
      //the return value of splice is an array that contains the deletd item
      const deletedUsers = db.users.splice(userIndex, 1)

      db.posts = db.posts.filter((post) => {
          const match = post.author === args.id
          if (match) {
              db.comments = db.comments.filter((comment) => comment.post !== post.id)
          }
              
          return !match
      })

      db.comments = db.comments.filter((comment) => comment.author !== args.id)
      return deletedUsers[0]
  },
  createPost(parent, args, { db }, info) {
      // Make sure that a user with that id exists
      const userExists = db.users.some((user) => user.id === args.data.author)
      if (!userExists) {
          throw new Error('User not found')
      }

      const post = {
          id: uuidv4(),
          ...args.data,
      }

      db.posts.push(post)
      return post
  },
  deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex((post) => post.id === args.id)
      if (postIndex === -1) {
          throw new Error('Post not found')
      }
      const deletedPosts = db.posts.splice(postIndex, 1)
      db.comments = db.comments.filter((comment) => comment.post !== args.id)
      return deletedPosts[0]
  },
  createComment(parent, args, { db }, info) {
      //Make sure that a users exists
      const userExists = db.users.some((user) => user.id === args.data.author)
      //Make sure that a published post exists
      const postExists = db.posts.some((post) => post.id === args.data.post && post.published)
      if (!userExists || !postExists) {
          throw new Error('Unable to find user and post')
      }

      const comment = {
          id: uuidv4(),
          ...args.data,
      }

      db.comments.push(comment)
      return comment
  },
  deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)
      if (commentIndex === -1) {
          throw new Error('Comment not found')
      }
      const deletedComments = db.comments.splice(commentIndex, 1)
      return deletedComments[0]
  }
}

export { Mutation as default }