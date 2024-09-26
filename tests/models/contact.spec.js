const { Contact } = require('../../src/models/contact')

describe('Contact', () => {
  it('should create a Contact', () => {
    const result = new Contact(
      'company name',
      'full name',
      'email',
      'phone',
      'website'
    )

    expect(result.companyName).toBe('company name')
    expect(result.fullName).toBe('full name')
    expect(result.email).toBe('email')
    expect(result.phone).toBe('phone')
    expect(result.website).toBe('website')
  })
})
