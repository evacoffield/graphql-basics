// Named export - Has a name. Have as many as needed.
// Default export - Has no name. You can only have one.

const message = 'Some message from myModule.js'
const myName = 'Andrew'
const location = 'London'
const getGreeting = (name) => {
  return `Welcome to the course ${name}`
}

export {message, myName, getGreeting, location as default}