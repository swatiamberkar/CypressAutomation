
describe('07_Timesheet-Add Client', function() {
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

	var clientCode1 = ''
	var clientName1 = ''
	var clientCode2 = ''
	var clientName2 = ''
	var clientCode3 = ''
	var clientName3 = ''

	var clientStatus = 'Active'
	var clientStatus1 = 'Dormat'
	var address = 'Mumbai'
	var description = 'Client Test'
	
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

			 clientCode1 = this.data.clientCode1
			 clientName1 = this.data.clientName1
			 clientCode2 = this.data.clientCode2
			 clientName2 = this.data.clientName2
			 clientCode3 = this.data.clientCode3
			 clientName3 = this.data.clientName3
		})
	})

		
	beforeEach(function(){
        cy.getCookies()
	})
   
	
	it('Login to Cloud & select Company', function() {
	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to Add Client', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Timesheet-AddClient').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=AddClient');
	})
	
	it('Verify Validations', function () {
	})
	it('1. Verify Validation - Enter Code of the Client', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#btnsave').click({force: true})
		cy.get(".toast-message").should('contain', 'Enter Code of the Client')	  		  
	})

	it('2. Verify Validation - Enter Name of the Client', function () {
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientCode1)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Enter Name of the Client')
	})

	it('3. Verify Validation - Select Status', function () {
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientName1)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Select Status')
		cy.get('#clientstat').select(clientStatus)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet Client Added Successfully.')
		cy.wait(10000)
	})

	it('4. Verify Validation - Duplicate code .Please Enter Another code', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientCode1)
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientName1)
		cy.get('#clientstat').select(clientStatus)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Duplicate code .Please Enter Another code')
		cy.xpath("//button[contains(text(),'Close')]").click({ force: true })
		cy.wait(5000)
	})

	it('Verify Add Client functionality', function () {
	})
	it('1. Add Client', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.wait(1000)
		cy.get('#clientcode').click({ force: true })
		cy.get('#clientcode').clear().type(clientCode3)
		cy.get('#clientname').click({ force: true })
		cy.get('#clientname').clear().type(clientName3)
		cy.get('#clientstat').select(clientStatus)
		cy.get('#btnsave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Timesheet Client Added Successfully.')
		cy.wait(10000)
	})


	it('2. Verify added Client details', function () {
		
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Code of the Client"]').eq(lastField).should('contain', clientCode3)
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientName3)
				cy.get('[title="Address"]').eq(lastField).should('contain', '')
				cy.get('[title="Description"]').eq(lastField).should('contain', '')
				cy.get('[title="Status"]').eq(lastField).should('contain', clientStatus)
				
			})

	})

	
	it('Verify update Client functionality', function () {
	})
	it('1. Update Client', function () {
 			cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })

				cy.get('#clientcode').click({ force: true })
				cy.get('#clientcode').clear().type(clientCode2)
				cy.get('#clientname').click({ force: true })
				cy.get('#clientname').clear().type(clientName2)
				cy.get('#ClientAdd').click({ force: true })
				cy.get('#ClientAdd').clear().type(address)
				cy.get('#clientdesc').click({ force: true })
				cy.get('#clientdesc').clear().type(description)
				cy.get('#clientstat').select(clientStatus1)
				cy.get('#btnupdate').click({ force: true })

				cy.get(".toast-message").should('contain', 'Timesheet Client Update Successfully.')
			})
		cy.wait(10000)
	})

	it('2. Verify Updated Client', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1

				cy.get('[title="Code of the Client"]').eq(lastField).should('contain', clientCode2)
				cy.get('[title="Name of the Client"]').eq(lastField).should('contain', clientName2)
				cy.get('[title="Address"]').eq(lastField).should('contain', address)
				cy.get('[title="Description"]').eq(lastField).should('contain', description)
				cy.get('[title="Status"]').eq(lastField).should('contain', clientStatus1)
			})
	})
		
	it('Verify Delete Client functionality', function () {
	})
	
	it('1. Delete Client', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 2

				cy.get('.text-danger').eq(lastField).click({ force: true })
				cy.get(".toast-message").should('contain', 'TimeSheet Client Deleted Successfully.')
			})
		cy.wait(10000)
	})
    /*
	it('1. Delete Client', function () {

		cy.get('.text-danger').eq(0).click({ force: true })
		cy.get(".toast-message").should('contain', 'TimeSheet Client Deleted Successfully.')
		cy.get(".toast-message").click({ force: true })
		cy.wait(3000)

		cy.get('.text-danger').eq(0).click({ force: true })
		cy.get(".toast-message").should('contain', 'TimeSheet Client Deleted Successfully.')
		cy.get(".toast-message").click({ force: true })
		cy.wait(3000)

		cy.get('.text-danger').eq(0).click({ force: true })
		cy.get(".toast-message").should('contain', 'TimeSheet Client Deleted Successfully.')
		cy.get(".toast-message").click({ force: true })
		cy.wait(3000)
	})


	it('2. Verify Deleted Client', function () {
		
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 2
				cy.get('[title="Code of the Client"]').eq(lastField).should('not.contain', clientCode2)
				cy.get('[title="Name of the Client"]').eq(lastField).should('not.contain', clientName2)
				cy.get('[title="Address"]').eq(lastField).should('not.contain', address)
				cy.get('[title="Description"]').eq(lastField).should('not.contain', description)
				cy.get('[title="Status"]').eq(lastField).should('not.contain', clientStatus1)
			})
	})

	*/

})
	