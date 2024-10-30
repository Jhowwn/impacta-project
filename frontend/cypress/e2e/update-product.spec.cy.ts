describe('Update product', () => {
  describe('Should be able to find a user product', () => {
    it('should login', () => {
      cy.fixture('userSeller').then((user) => {
        cy.login(user.email, user.password)
      })
    })
    it('should click menu and navigate to Listar Produtos', () => {
      cy.listProducts()
    })

    it('should find and click in a product', () => {
      cy.findProduct()
    })
  })

  describe('Should be fill the field to create a product', () => {
    it('should fill description product', () => {
      cy.get('#description-field').clear()
      cy.get('#description-field').type('Teste cy 2')
    })
    it('should fill name product', () => {
      cy.get('#name-field').clear()
      cy.get('#name-field').type('Teste cy 2')
    })
    it('should fill price product', () => {
      cy.get('#price-field').clear()
      cy.get('#price-field').type('59,90')
    })
    it('should fill stock product', () => {
      cy.get('#stock-field').clear()
      cy.get('#stock-field').type('40')
    })
    it('should save the product', () => {
      cy.get('button.MuiButton-containedSuccess').click()
    })
    it('should find and click in a product', () => {
      cy.get('.listProducts_listProducts__cgf4I')
        .children()
        .last()
        .should('contain.text', 'Teste cy 2')
    })
  })
})
