
describe('Expense-cloud 05_Expense Purpose', function() {
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	var Purpose = 'Meeting'
	
	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Navigate Expense Purpose', function() {
		
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpensePurpose')		
		cy.wait(2000)
		
		// cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
	})
		
	it('Verify Validation Massges - Please Enter Purpose.', function() {	
		const { softAssert, softExpect } = chai;
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Purpose.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Save Functionality', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose)
		
		 cy.get('#btnSubmit').click({force: true})
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Please select Ticket Segregation');
		// cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		 
		cy.wait(5000)	
		  cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	 
			 cy.get('[title="Value"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(Purpose);
			 })
			 
		  })
	})
	
	it('Verify Validation Massges - Duplicate value found.', function() {	
		const { softAssert, softExpect } = chai;
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose)
		
		 cy.get('#btnSubmit').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Duplicate value found.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
		
	it('Verify Delete Functionality', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#PartialEmployees')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-2
	
		cy.get('.fa-trash-alt').eq(lastField).click({force: true})
		cy.wait(2000)
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Data Deleted Sucessfully');
		 cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		  
	
  })
  
  cy.get(".alert-warning").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('No Records Found.');
		 cy.wait(3000)	
		})
		  
	})
	
	
	})
	
 
	