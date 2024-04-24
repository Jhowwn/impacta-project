/// <reference types="cypress" />

// eslint-disable-next-line no-unused-vars
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
  }
}
