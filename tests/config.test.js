import { shallow, render, mount } from 'enzyme'

global.shallow = shallow
global.render = render
global.mount = mount

// Fail tests on any console error
console.error = (message) => {
  throw new Error(message)
}
