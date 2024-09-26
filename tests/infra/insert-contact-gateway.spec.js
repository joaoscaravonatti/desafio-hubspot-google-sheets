const { InsertContactGateway } = require('../../src/infra/insert-contact-gateway')
const { Contact } = require('../../src/models/contact')
const { Client } = require('@hubspot/api-client')

jest.mock('@hubspot/api-client')

describe('InsertContactGateway', () => {
  let sut
  let mockClient

  beforeEach(() => {
    mockClient = {
      crm: {
        contacts: {
          basicApi: {
            create: jest.fn()
          }
        }
      }
    }

    Client.mockImplementation(() => mockClient)
    sut = new InsertContactGateway('access token')
  })

  it('should create a Client with provided access token', async () => {
    await sut.insert({
      email: 'contact@company.com',
      fullName: 'Contact Full Name',
      phone: '99999999',
      companyName: 'Contact Company',
      website: 'Contact Website'
    })

    expect(Client).toHaveBeenCalledWith({ accessToken: 'access token' })
  })

  it('should call create() with correct properties', async () => {
    await sut.insert(new Contact(
      'Contact Company',
      'Contact Full Name',
      'contact@company.com',
      '99999999',
      'Contact Website'
    ))

    expect(mockClient.crm.contacts.basicApi.create).toHaveBeenCalledWith({
      properties: {
        email: 'contact@company.com',
        firstname: 'Contact',
        lastname: 'Full Name',
        phone: '99999999',
        company: 'Contact Company',
        website: 'Contact Website'
      }
    })
  })
})
