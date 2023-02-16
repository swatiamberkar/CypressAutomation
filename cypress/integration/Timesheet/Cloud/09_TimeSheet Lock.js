
describe('09_TimeSheet Lock', function() {
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

	it('Navigate to TimeSheet Lock', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetLock').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetLock');
	})
		
	it('Verify Validation (View button)  - Please select Employee or Business unit!', function() {	
		cy.get('#btnView').click({force: true})
		cy.get(".toast-message").should('contain', 'Please select Employee or Business unit!')	  		  
	})

	it('Verify Validation (View button) - Please select From Date', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.get('#btnView').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select From Date')
	})

	it('Verify Validation (View button) - Please select To Date', function () {
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select To Date')
	})

	it('View Timesheet Lock', function () {
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', managerID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'No')
		
	})

	it('Verify Validation (Lock button)  - Please select Employee or Business unit!', function () {
		cy.reload()
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select Employee or Business unit!')
	})

	it('Verify Validation (Lock button) - Please select From Date', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select From Date')
	})

	it('Verify Validation (Lock button) - Please select To Date', function () {
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select To Date')
	})

	it('Lock & Verify Timesheet ', function () {
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnLock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Employees Successfully Locked for Timesheet Entry!')

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', managerID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'Yes')

	})

	it('Verify Validation (Delete button)  - Please select Employee or Business unit!', function () {
		cy.reload()
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select Employee or Business unit!')
	})

	it('Verify Validation (Delete button) - Please select From Date', function () {
		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select From Date')
	})

	it('Verify Validation (Delete button) - Please select To Date', function () {
		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select To Date')
	})

	it('Delete & Verify Timesheet Lock ', function () {
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnUnlock').click({ force: true })
		cy.get(".toast-message").should('contain', 'Employees Successfully UnLocked For Timesheet Entry!')

		cy.get('.select2-selection--multiple').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(managerID)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})
		cy.get('#btnView').click({ force: true })

		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[3]").should('contain', managerID)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[6]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[7]").should('contain', currentDate)
		cy.xpath("//table[@id='tblEmp']/tbody/tr/td[8]").should('contain', 'No')

	})


})
	