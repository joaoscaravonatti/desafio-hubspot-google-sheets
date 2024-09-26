const { blocked, personal } = require('./blocked-domains')

class EmailValidator {
  validate (email) {
    const [, domain] = email.split('@')

    return ![...blocked, ...personal].includes(domain)
  }
}

module.exports = { EmailValidator }
