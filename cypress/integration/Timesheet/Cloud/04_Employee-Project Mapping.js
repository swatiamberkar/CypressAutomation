
describe('04_Employee-Project Mapping', function() {
	const { softAssert, softExpect } = chai;
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var managerID = ''
	var employeeID1 = ''
	var employeeID2 = ''

	var project1 = ''
	var project2 = ''
	var project3 = ''

	var task1 = ''
	var task2 = ''
	var task3 = ''

		
	before(function () {
		
		cy.fixture('Timesheet/Timesheet').then(this, function (data) {
			this.data = data
			managerID = this.data.managerID
			employeeID1 = this.data.employeeID1
			employeeID2 = this.data.employeeID2

			 project1 = this.data.project1
			 project2 = this.data.project2
			 project3 = this.data.project3

			 task1 = this.data.task1
			 task2 = this.data.task2
			 task3 = this.data.task3
		})
	})

			
	beforeEach(function(){
        cy.getCookies()
	})
   
	
	it('Login to Cloud & select Company', function() {
	
		cy.login()
		cy.changeCompany();		
	})
	
	it('Navigate to Employee - Project Mapping', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Employee-ProjectMapping').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=EmployeeProjectMapping');
	})
		
	it('Verify Validation - Select Employee Code.', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('button[value="Save"]').click({force: true})
		cy.get(".toast-message").should('contain', 'Select Employee Code.')	  		  
	})

	it('Verify Validation - Select Project name', function () {
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Select Project name')
	})

	it('Save Employee - Project Mapping', function () {
		cy.get('#drpPrjctCategory').select(project1)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})

	it('Verify Saved Employee - Project Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Employee Code"]').eq(lastField).should('contain', employeeID1)
				cy.get('[title="Project  Name"]').eq(lastField).should('contain', project1)
			})
	})

	it('Verify Validation - Duplicate Employee Code And Project Name', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('#drpPrjctCategory').select(project1)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Duplicate Employee Code And Project Name')
		cy.xpath("//button[contains(text(),'Close')]").click({ force: true })
	})

	it('Update Employee - Project Mapping', function () {
 			cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })

				cy.get('#select2-multiEmp-container').click({ force: true })
				cy.get('input[type="search"]').click({ force: true })
				cy.get('input[type="search"]').type(managerID)
				cy.get('.select2-results__option--highlighted').click({ force: true })
				cy.wait(500)
				cy.get('#drpPrjctCategory').select(project2)
				cy.get('button[value="Save"]').click({ force: true })
				cy.get(".toast-message").should('contain', 'Record Save Successfully')
			})
	})

	it('Verify Updated Employee - Project Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Employee Code"]').eq(lastField).should('contain', managerID)
				cy.get('[title="Project  Name"]').eq(lastField).should('contain', project2)
			})
	})
	
	it('Add Employee - Project Mapping', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID1)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(500)
		cy.get('#drpPrjctCategory').select(project1)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})


	it('Delete Employee - Project Mapping', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('.text-danger').eq(lastField).click({ force: true })
				cy.get(".toast-message").should('contain', 'Record Delete sucessfully')
			})
	})

	it('Verify Deleted Employee - Project Mapping', function () {
		cy.wait(10000)
		//cy.get('.alert').should('contain', 'No Records Found.')
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('[title="Employee Code"]').eq(lastField).should('not.contain', employeeID1)
				cy.get('[title="Project  Name"]').eq(lastField).should('not.contain', project1)
			})
			
	})

	

})
	