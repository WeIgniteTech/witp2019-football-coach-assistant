describe('Test result in modal', function() {
    it('Does the application respond correctly!', function() {
      cy.visit('http://localhost:3004/');
      cy.get('.modal').click();
      cy.get('.btn-group > :nth-child(1)').click();
      cy.get(':nth-child(2) > span').should(($txt)=>{expect($txt.text()).to.eq("Chosen Team size 3, is more than attending Players 0")})
    })
  })