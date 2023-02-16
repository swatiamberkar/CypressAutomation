
describe('Expense cloud 04_Expense Mode', function() {
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	var mode = 'Train'
	
	
	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Navigate Expense Mode', function() {
		
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseMode')	
		cy.wait(2000)	
		
		// cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
	})
		
	it('Verify Validation Massges - Please select Business value', function() {	
		const { softAssert, softExpect } = chai;
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		 
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please select Business value');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			cy.wait(2000)
		  })
	})
	
	it('Verify Validation Massges - Please select Expense Type.', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#drpValue').select(businessValue,{force: true})
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please select Expense Type.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			cy.wait(2000)
		  })
	})
	
	it('Verify Validation Massges - Please Enter mode value.', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#claimtype').select(expenseType,{force: true})
		
		 cy.get('#btnSubmit').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter mode value.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			cy.wait(2000)
		  })
	})
	
	it('Verify Save Functionality', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(mode)
		
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

			cy.get('[title="Expense Type"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(expenseType);
			 })
			 
			 cy.get('[title="Mode"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(mode);
			 })
			 
		  })
	})
	
	it('Verify Validation Massges - Duplicate value found.', function() {	
		const { softAssert, softExpect } = chai;
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue,{force: true})
		cy.get('#claimtype').select(expenseType,{force: true})
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(mode)
		
		 cy.get('#btnSubmit').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Duplicate value found.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			cy.wait(2000)
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
	
 
	