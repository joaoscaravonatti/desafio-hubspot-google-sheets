class Contact {
  companyName
  fullName
  email
  phone
  website

  constructor (
    companyName,
    fullName,
    email,
    phone,
    website
  ) {
    this.companyName = companyName
    this.fullName = fullName
    this.email = email
    this.phone = phone
    this.website = website
  }
}

module.exports = { Contact }
