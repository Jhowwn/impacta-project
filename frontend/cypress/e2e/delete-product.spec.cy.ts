describe('Delete product', () => {
  describe('Should be able delete a product', () => {
    it('should login', () => {
      cy.fixture('userSeller').then((user) => {
        cy.login(user.email, user.password)
      })
    })
    it('should click menu and navigate to Listar Produtos', () => {
      cy.listProducts()
    })
  })

  describe('Should be search and list product by user', () => {
    it('should fill search product name', () => {
      cy.get('#name-field').type('Teste cy')
    })

    it('should find and click in a product', () => {
      cy.get('.listProducts_listProducts__cgf4I')
        .children()
        .first()
        .should('contain.text', 'Teste cy')
        .click()
    })
  })

  describe('Should be fill the field to create a product', () => {
    it('should fill description product', () => {
      cy.get('#description-field').clear()
      cy.get('#description-field').type('Teste cy 2')
    })
    it('should fill price product', () => {
      cy.get('#price-field').clear()
      cy.get('#price-field').type('59,90')
    })
    it('should fill stock product', () => {
      cy.get('#stock-field').clear()
      cy.get('#stock-field').type('40')
    })
    it('should delete the product', () => {
      cy.get('.MuiButton-containedError').click()
      cy.get('.MuiButton-textSecondary').click()
    })
    it('should fill search product name and show messagem "Produtos Não Encontrados" ', () => {
      cy.get('#name-field').type('Teste cy')
      cy.get('p').should('have.text', 'Produtos Não Encontrados')
    })
  })
})
