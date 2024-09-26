const { InsertContactsUseCase } = require('../../src/use-cases/insert-contacts-use-case')
const { Contact } = require('../../src/models/contact')

describe('InsertContactsUseCase', () => {
  let sut
  let listContactsGateway
  let emailValidator
  let insertContactGateway

  const contacts = [
    new Contact('companyName1', 'fullName1', 'email1@email.com', 'phone1', 'website1'),
    new Contact('companyName2', 'fullName2', 'email2@email.com', 'phone2', 'website2')
  ]

  beforeEach(() => {
    listContactsGateway = { list: jest.fn().mockResolvedValue(contacts) }
    emailValidator = { validate: jest.fn().mockReturnValue(true) }
    insertContactGateway = { insert: jest.fn() }

    sut = new InsertContactsUseCase(
      listContactsGateway,
      emailValidator,
      insertContactGateway
    )
  })

  it('should call ListContactsGateway', async () => {
    await sut.run()

    expect(listContactsGateway.list).toHaveBeenCalled()
  })

  it('should call EmailValidator for each contact returned by ListContactsGateway', async () => {
    await sut.run()

    expect(emailValidator.validate).toHaveBeenCalledTimes(2)
    expect(emailValidator.validate).toHaveBeenNthCalledWith(1, 'email1@email.com')
    expect(emailValidator.validate).toHaveBeenNthCalledWith(2, 'email2@email.com')
  })

  it('should call InsertContactGateway with valid contacts', async () => {
    emailValidator.validate.mockReturnValueOnce(false)
    await sut.run()

    expect(insertContactGateway.insert).toHaveBeenCalledTimes(1)

    expect(insertContactGateway.insert).toHaveBeenNthCalledWith(1,
      new Contact(
        'companyName2',
        'fullName2',
        'email2@email.com',
        'phone2',
        'website2'
      )
    )
  })
})

