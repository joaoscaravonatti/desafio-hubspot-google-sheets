const { Contact } = require('../models/contact')
const googleapis = require('googleapis')

class ListContactsGateway {
  #key
  #spreadsheetId
  #range

  constructor (key, spreadsheetId, range) {
    this.#key = key
    this.#spreadsheetId = spreadsheetId
    this.#range = range
  }

  async list() {
    const sheets = googleapis.google.sheets('v4')
    const request = this.#getRequest()
    const response = await sheets.spreadsheets.values.get(request)
    const [, ...rows] = response.data.values
    const contacts = rows.map(this.#mapContact)

    return contacts
  }

  #getRequest () {
    return {
      spreadsheetId: this.#spreadsheetId,
      range: this.#range,
      key: this.#key
    }
  }

  #mapContact (data) {
    const [
      companyName,
      fullName,
      email,
      phone,
      website
    ] = data

    return new Contact(
      companyName,
      fullName,
      email,
      phone,
      website
    )
  }
}

module.exports = { ListContactsGateway }
