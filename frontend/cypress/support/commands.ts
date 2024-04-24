/// <reference types="cypress" />
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/')
  cy.get('[type="email"]').type(email)
  cy.get('[type="password"]').type(password)
  cy.get('.login_form__NY6Qf > .MuiButtonBase-root').click()
})
