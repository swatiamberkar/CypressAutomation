
describe('06_Hours Setting', function() {
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
	
	it('Navigate to Hours Setting', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_HoursSetting').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=HoursSetting');
	})
		
	it('Verify Validation - Select atleast one category', function() {	
		cy.get('[value="View"]').click({force: true})
		cy.get(".toast-message").should('contain', 'Select atleast one category')	  		  
	})

	it('Update Hours', function () {
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.get('[placeholder="Search"]').clear().type(managerID)
		cy.xpath('//tbody/tr[1]/td[5]/span[1]/input[1]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[5]/span[1]/input[1]').clear().type('7:00')
		cy.wait(2000)
		cy.get('#btnsubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully!!')
	})

	it('Verify Updated Hours', function () {
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.get('[placeholder="Search"]').clear().type(managerID)
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[5]/span[1]/input[1]').should('have.value', '7:00')
	})

	it('Update Present all Days', function () {
		//cy.get('#catall').click({ force: true })
		//cy.get('[value="View"]').click({ force: true })
		cy.xpath('//tbody/tr[1]/td[6]/input[1]').click({ force: true })
		cy.get('#btnsubmit').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully!!')
	})

	it('Verify Updated Present all Days', function () {
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.get('[placeholder="Search"]').clear().type(managerID)
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[6]/input[1]').should('not.be.checked');
	})

})
	