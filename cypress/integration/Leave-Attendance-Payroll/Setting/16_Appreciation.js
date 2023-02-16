
import 'cypress-iframe'

describe('16_Appreciation page', () =>{

    var filePath = 'Employee/light bill.pdf'
    var updatedFilePath = 'Employee/sample file.pdf'

    beforeEach(function(){
        cy.getCookies()
    })
    
    it('Login to Cloud & select Company', function() {
        cy.visit("https://pockethrmsnext.azurewebsites.net/")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#Email').clear();
        cy.get('#Email').type('nileshgajare@live.com');
        cy.get('#Password').clear();
        cy.get('#Password').type('123456');
        cy.get('.btn').click();
        cy.get('#globalSearch').clear();
        cy.get('#globalSearch').type('exp01');
        cy.get('[onclick="openEmpProfile(133529,1)"]').click();
        cy.get('#Profile_Appreciation').click();
        cy.get('#profileContentTitle > .row > .text-right > span > .fas').click();
        cy.get('#subject').clear();
        cy.get('#subject').type('aa');
        cy.get('#ltrNo').clear();
        cy.get('#ltrNo').type('11');
        cy.get('#issuedBy').clear();
        cy.get('#issuedBy').type('aa');
        cy.get('#File').click();
        cy.get('#btnProcess').click();
        /* ==== End Cypress Studio ==== */
    })
})

