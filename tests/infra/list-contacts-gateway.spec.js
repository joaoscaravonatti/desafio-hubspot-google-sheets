const { ListContactsGateway } = require('../../src/infra/list-contacts-gateway')
const { Contact } = require('../../src/models/contact')
const googleapis = require('googleapis')

jest.mock('googleapis', () => ({
  google: {
    sheets: jest.fn()
  }
}))

describe('ListContactsGateway', () => {
  let sut
  let getMock

  beforeEach(() => {
    getMock = jest.fn().mockResolvedValue({
      data: {
        values: [
          ['Company Name', 'Full Name', 'Email', 'Phone', 'Website'],
          ['company 1', 'name 1', 'email1@company1.com', 'phone1', 'website1'],
          ['company 2', 'name 2', 'email1@company2.com', 'phone2', 'website2']
        ]
      }
    })

    googleapis.google.sheets.mockReturnValue({
      spreadsheets: {
        values: {
          get: getMock
        }
      }
    })

    sut = new ListContactsGateway('key', 'spreadsheet id', 'range')
  })

  it('should call the Google Sheets API', async () => {
    await sut.list()

    expect(getMock).toHaveBeenCalledWith({
      spreadsheetId: 'spreadsheet id',
      range: 'range',
      key: 'key'
    })
  })

  it('should return an empty array if no rows are returned from Google Sheets', async () => {
    getMock.mockResolvedValueOnce({
      data: {
        values: [
          ['Company Name', 'Full Name', 'Email', 'Phone', 'Website']
        ]
      }
    })

    const result = await sut.list()

    expect(result).toEqual([])
  })

  it('should return an array with remote contacts', async () => {
    const result = await sut.list()

    expect(result).toEqual([
      new Contact('company 1', 'name 1', 'email1@company1.com', 'phone1', 'website1'),
      new Contact('company 2', 'name 2', 'email1@company2.com', 'phone2', 'website2')
    ])
  })
})
