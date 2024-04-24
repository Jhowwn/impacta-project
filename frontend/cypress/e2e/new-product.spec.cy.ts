describe('New product', () => {
  describe('Should be able to access new product', () => {
    it('should login', () => {
      cy.fixture('userSeller').then((user) => {
        cy.login(user.email, user.password)
      })
    })

    it('When click menu', () => {
      cy.get('[data-testid="MenuIcon"] > path').click()
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
