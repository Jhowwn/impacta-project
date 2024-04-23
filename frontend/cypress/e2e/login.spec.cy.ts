describe('Login', () => {
  describe('Should be able to login', () => {
    it('Given a user visitis the web site', () => {
      cy.visit('/')
    })
    it('When enter the email field', () => {
      cy.get('[type="email"]').type('jhonatan1@gmail.com')
    })
    it('When enter the password field', () => {
      cy.get('[type="password"]').type('123456')
    })
    it('Then click the submit button', () => {
      cy.get('.login_form__NY6Qf > .MuiButtonBase-root').click()
    })
    it('And Loggin in the application', () => {
      cy.get('.page_main__xXfsr > h2').should('contain.text', 'Olá')
    })
  })
})
