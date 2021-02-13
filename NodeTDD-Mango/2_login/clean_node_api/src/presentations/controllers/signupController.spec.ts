import { SignUpController } from './signup'

describe('SignUpController', () => {
  test('Should return 400 if no name is provider', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.sttatusCode).toBe(400)
    expect(httpReponse.body).toEqual(new Error('Missing param: name'))
  })
})

/*
describe('', () => {
  test('', () => {

  })
})
*/
