
describe('Expense-cloud 02_Expense Eligibility', function() {
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	var amount = '10000'
	var employeeId = 'GT14'
	var noApprovalAmount = '200'
	var approvalType = 'Monthly'
	
	
/*	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local Travel'
	var amount = '1000'
	var employeeId = 'C006'
	var approvalType = 'Monthly'
	var noApprovalAmount = '200'
	*/
	
	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})
	
	it('Add Expense Type', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')	
		cy.wait(2000)	
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		cy.get('#drpParameter').select('Category',{force: true})
		cy.get('#drpValue').select('Staff',{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(expenseType);
		cy.get('#createBtn').click({force: true})
		cy.wait(2000) 
		
	})
	
	it('Navigate Expense Eligibility', function() {
		
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseEligibility')		
		cy.wait(2000)
	})
		
	it('Verify Validation Massges - Select Buisness Value.', function() {	
		const { softAssert, softExpect } = chai;
		 cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})

		//cy.get('#drpParameter').select(businessUnit,{force: true})
		
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Buisness Value.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
		  cy.get(".toast-message").click()
		  cy.wait(2000)
	})
	
	it('Verify Validation Massges - Select Expense Type.', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#drpValue').select(businessValue,{force: true})
		
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Expense Type.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			cy.wait(2000)
		  })
	})

	it('Verify Validation Massges - Enter Amount.', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.get('#claimtype').select(expenseType,{force: true})
		
		 cy.get('#crtbtn').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Amount.');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			cy.wait(2000)
		  })
	})
	
	it('Verify Save Functionality', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type(amount)
		
		 cy.get('#crtbtn').click({force: true})
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Please select Ticket Segregation');
		// cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		 
		cy.wait(20000)	
		  cy.get('#PartialData')
  .find('.media')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1

	
		    cy.get('[title="Buisness Unit"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Unit: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessUnit);
			 }) 
			 
			 cy.get('[title=" Buisness Value"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Buisness Value: '+ text.trim())
			 softExpect(text.trim()).to.contains(businessValue);
			 })
			 
			 cy.get('[title="Amount"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(amount);
			 })
			 
			 cy.get('[title="Expense Name"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains(expenseType);
			 })
			 
			 cy.get('[title="No Approval upto Amount"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains('0');
			 })
			 
			 cy.get('[title="Approval Type"]').eq(lastField).invoke('text').then((text) => {			
			cy.log('Expense Type: '+ text.trim())
			 softExpect(text.trim()).to.contains('ClaimWise');
			 })
		  })
	})

/*	it('Verify Save Functionality with Employee wise', function() {	
		const { softAssert, softExpect } = chai;
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.get('#drpParameter').select(businessUnit,{force: true})
		cy.get('#drpValue').select(businessValue,{force: true})
		cy.get('#claimtype').select(expenseType,{force: true})
		
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type(amount)
		
			cy.get('#select2-multiEmp-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeId)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			
		cy.get('#NoApprovalAmount').click({force: true})
		cy.get('#NoApprovalAmount').clear().type(noApprovalAmount)
		cy.get('#ApprovalType').select(approvalType,{force: true})
			
			
		
		 cy.get('#crtbtn').click({force: true})
		// cy.get(".toast-message").invoke('text').then((text) => {
		// softExpect(text.trim()).to.eq('Please select Ticket Segregation');
		 cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//  })
		
		 cy.get('#viewbtn').click({force: true})
		 cy.wait(2000)
		 
		cy.get('#EStableSorter1 > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)		
			cy.get('#EStableSorter1 > tbody > tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EmpCode) => {	
			cy.log("EmpCode: "+EmpCode)
			
			if (EmpCode.trim() == employeeId) {
				
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', expenseType)
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(4)').should('have.text', amount)
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', noApprovalAmount)
		cy.get('#EStableSorter1>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', approvalType)
			}
		 
		 
		 })			
		  })
		   cy.xpath("//div[@id='expenseeligibility']//button").click({force: true})
		 cy.wait(2000)
	
	})
*/	
/*	it('Verify Validation Massges - Duplicate Expense Eligibility generated', function() {	
		const { softAssert, softExpect } = chai;
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#drpValue').select(businessValue,{force: true})
		cy.get('#claimtype').select(expenseType,{force: true})
		
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type(amount)
		
		 cy.get('#crtbtn').click({force: true})
		 cy.wait(10000)
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Duplicate Expense Eligibility generated');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
*/	

	it('Verify Delete Functionality', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#PartialData')
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
	
 
	