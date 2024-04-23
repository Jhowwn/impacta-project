describe('New product', () => {
  describe('Should be able to access new product', () => {
    it('Given a user visitis the web site', () => {
      cy.visit('/')
    })
    it('When login is complete', () => {
      cy.get('[type="email"]').type('jhonatan1@gmail.com')
      cy.get('[type="password"]').type('123456')
      cy.get('.login_form__NY6Qf > .MuiButtonBase-root').click()
      cy.get('.page_main__xXfsr > h2').should('contain.text', 'Olá')
    })
    it('When click menu', () => {
      cy.get('.MuiButtonBase-root').click()
    })
    it('Then click Novo Produto', () => {
      cy.get(
        '[href="/product"] > .MuiListItem-root > .MuiButtonBase-root',
      ).click()
    })
    it('And should containg title Novo Produto', () => {
      cy.get('.product_title__Lc1GT').should('contain.text', 'Novo Produto')
    })
  })
})
