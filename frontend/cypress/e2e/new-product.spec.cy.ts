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

  describe('Should create a product', () => {
    it('should fill name product', () => {
      cy.get('#name-field').type('Teste cy')
    })
    it('should fill description product', () => {
      cy.get('#description-field').type('Teste cy')
    })
    it('should fill price product', () => {
      cy.get('#price-field').type('19,90')
    })
    it('should fill stock product', () => {
      cy.get('#stock-field').type('20')
    })
    it('should add an image', () => {
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root')
        .should('not.have.value')
        .selectFile([
          './cypress/fixtures/test/bf1.jpg',
          './cypress/fixtures/test/bf1_complete.jpg',
          './cypress/fixtures/test/bf1_xbox.jpg',
        ])
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').should(
        'have.attr',
        'aria-disabled',
        'true',
      )
    })
    it('should have 3 images', () => {
      cy.get(
        '.product_form__DNNnn > :nth-child(2) > .MuiGrid-container',
      ).should(($elements) => {
        const itemCount = $elements[0].children.length
        expect(itemCount).to.eq(3)
      })
    })
    it('should save the product', () => {
      cy.get('.product_form__DNNnn > button.MuiButton-root').click()
    })
  })

  describe('Should be create a other product', () => {
    it('should fill name product', () => {
      cy.get('#name-field').type('Outro Produto')
    })
    it('should fill description product', () => {
      cy.get('#description-field').type('Teste cy 2')
    })
    it('should fill price product', () => {
      cy.get('#price-field').type('190,90')
    })
    it('should fill stock product', () => {
      cy.get('#stock-field').type('50')
    })
    it('should add an image', () => {
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root')
        .should('not.have.value')
        .selectFile([
          './cypress/fixtures/test/bf1.jpg',
          './cypress/fixtures/test/bf1_complete.jpg',
          './cypress/fixtures/test/bf1_xbox.jpg',
        ])
      cy.get('.MuiGrid-grid-xs-12 > .MuiButtonBase-root').should(
        'have.attr',
        'aria-disabled',
        'true',
      )
    })
    it('should have 3 images', () => {
      cy.get(
        '.product_form__DNNnn > :nth-child(2) > .MuiGrid-container',
      ).should(($elements) => {
        const itemCount = $elements[0].children.length
        expect(itemCount).to.eq(3)
      })
    })
    it('should save the product', () => {
      cy.get('.product_form__DNNnn > button.MuiButton-root').click()
    })
  })
})
