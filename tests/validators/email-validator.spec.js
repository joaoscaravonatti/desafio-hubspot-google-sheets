const { EmailValidator } = require('../../src/validators/email-validator')

describe('EmailValidator', () => {
  let sut

  beforeEach(() => {
    sut = new EmailValidator()
  })

  it('should return false if provided email is personal', async () => {
    const result = sut.validate('personal@gmail.com')

    expect(result).toBe(false)
  })

  it('should return false if provided email is blocked', async () => {
    const result = sut.validate('blocked@1nsyncfan.com')

    expect(result).toBe(false)
  })
})
