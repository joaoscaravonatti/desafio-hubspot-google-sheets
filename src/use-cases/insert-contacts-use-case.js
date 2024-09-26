class InsertContactsUseCase {
  #listContactsGateway
  #emailValidator
  #insertContactGateway

  constructor (
    listContactsGateway,
    emailValidator,
    insertContactGateway
  ) {
    this.#listContactsGateway = listContactsGateway;
    this.#emailValidator = emailValidator;
    this.#insertContactGateway = insertContactGateway;
  }

  async run () {
    const contacts = await this.#listContactsGateway.list();

    for (const contact of contacts) {
      const isValid = this.#emailValidator.validate(contact.email)

      if (isValid) await this.#insertContactGateway.insert(contact)
    }
  }
}

module.exports = { InsertContactsUseCase }
