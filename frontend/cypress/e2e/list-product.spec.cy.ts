describe('List product', () => {
  describe('Should be able to list user products', () => {
    it('should login', () => {
      cy.fixture('userSeller').then((user) => {
        cy.login(user.email, user.password)
      })
    })
    it('should click menu and navigate to Listar Produtos', () => {
      cy.listProducts()
    })
  })

  describe('Should be list all products by user', () => {
    it('should find and click in a product', () => {
      cy.get('.listProducts_listProducts__cgf4I')
        .children()
        .last()
        .should('contain.text', 'Teste cy')
    })
  })

  describe('Should search and list product by user', () => {
    it('should fill name product', () => {
      cy.get('#name-field').type('Teste cy')
      cy.get('.listProducts_search__drTgC > .MuiButtonBase-root').click()
    })

    it('should find and click in a product', () => {
      cy.get('.listProducts_listProducts__cgf4I')
        .children()
        .first()
        .should('contain.text', 'Teste cy')
    })
  })
})
