/// <reference types="cypress" />
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       listProducts(): Chainable<void>
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

Cypress.Commands.add('listProducts', () => {
  cy.get('[data-testid="MenuIcon"] > path').click()
  cy.get(
    '[href="/listProducts"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root',
  ).click()
})

Cypress.Commands.add('findProduct', () => {
  cy.get('#name-field').type('Teste cy')
  cy.get('.listProducts_search__drTgC > .MuiButtonBase-root').click()
  cy.get('.listProducts_listProducts__cgf4I')
    .children()
    .first()
    .should('contain.text', 'Teste cy')
    .click()
})
