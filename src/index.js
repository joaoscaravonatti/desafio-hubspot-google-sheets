require('dotenv').config()

const { InsertContactsUseCase } = require('./use-cases/insert-contacts-use-case')
const { InsertContactGateway } = require('./infra/insert-contact-gateway')
const { ListContactsGateway } = require('./infra/list-contacts-gateway')
const { EmailValidator } = require('./validators/email-validator')

const main = async () => {
  const useCase = new InsertContactsUseCase(
    new ListContactsGateway(
      process.env.GOOGLE_API_KEY,
      process.env.GOOGLE_SHEET_SPREDSHEET_ID,
      process.env.GOOGLE_SHEET_RANGE
    ),
    new EmailValidator(),
    new InsertContactGateway(process.env.HUBSPOT_ACCESS_TOKEN)
  )

  await useCase.run()
}

main()
