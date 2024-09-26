const { Client } = require('@hubspot/api-client')

class InsertContactGateway {
  #token

  constructor (token) {
    this.#token = token
  }

  async insert (contact) {
    const client = new Client({ accessToken: this.#token })
    const { email, fullName, phone, companyName, website } = contact
    const [firstname, ...lastname] = fullName.split(' ')

    const properties = {
      email,
      firstname,
      phone,
      website,
      lastname: lastname.join(' '),
      company: companyName
    }

    await client.crm.contacts.basicApi.create({ properties })
  }
}

module.exports = { InsertContactGateway }
