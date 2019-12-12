describe('Test result in modal', function() {
    it('Does the application respond correctly!', function() {
      cy.visit('https://witp2019-football-coach-assist.herokuapp.com/');
      cy.get('.modal').click();
      cy.get('.btn-group > :nth-child(1)').click();
      cy.get(':nth-child(2) > span').should(($txt)=>{expect($txt.text()).to.eq("Chosen Team size 3, is more than attending Players 0")})
    })
  })