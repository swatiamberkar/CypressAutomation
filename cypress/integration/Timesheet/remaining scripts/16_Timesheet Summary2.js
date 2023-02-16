

describe('16_Timesheet Summary', function () {
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
		
		cy.fixture('Timesheet').then(this, function (data) {
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
	
	beforeEach(function () {
		cy.getCookies()
	})

	it('Login into Pocket HRMS', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to Hours Setting', function () {
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_HoursSetting').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=HoursSetting');
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.wait(5000)
		cy.get('[placeholder="Search"]').click({ force: true })
		cy.get('[placeholder="Search"]').clear().type(employeeID2)
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[6]/input[1]').click()
		cy.wait(2000)
		cy.get('#btnsubmit').click({ force: true })
		cy.wait(2000)

	})

	it('Login into Pocket ESS', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})

	it('Verify Record according Hours setting for less Time', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.contains('li', project3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.contains('li', task3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Client Name')]").click({ force: true })
		cy.contains('li', clientName3).click({ force: true })

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('07')

			cy.get('#isBillableHours').click()
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project3)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task3)
			cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', clientName3)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', yasterdayDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '07:00')
			cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project3)
			cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'Yes')
	
			cy.get('#btnConfirm').click()
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
				cy.get(".noty_body").click()
			})
			

		cy.get('#TimesheetSummary').click();

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task3)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName3)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '07:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')

		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Hours Setting data not match for this dates :- ' + yasterdayDate)

	})

	it('Verify Delete Functionality', function () {
		
		cy.xpath('//tbody/tr[1]/td[9]/button[1]/i[1]').click({ force: true })

		cy.get(".noty_body").should('contain', 'Entry Deleted Successfully.')
	})

	it('Verify Record according Hours setting for greater Time', function () {
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(yasterdayDate)
		})

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.contains('li', project3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.contains('li', task3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Client Name')]").click({ force: true })
		cy.contains('li', clientName3).click({ force: true })

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('09')

		cy.get('#txtTotalMin').click({ force: true })
		cy.get('#txtTotalMin').clear().type('30')

		cy.get('#isBillableHours').click()
		cy.get('#btnAdd').click({ force: true })

		cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task3)
		cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', clientName3)
		cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '09:30')
		cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'Yes')

		cy.get('#btnConfirm').click()
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
			cy.get(".noty_body").click()
		})


		cy.get('#TimesheetSummary').click();

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task3)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName3)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', yasterdayDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '09:30')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')

		cy.get('#chkApproveAll').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Hours Setting data not match for this dates :- ' + yasterdayDate)

	})
	
	it('Login into Pocket HRMS.', function () {
		cy.cloudLogin()

		cy.changeCompany()
	})

	it('Navigate to Hours Setting.', function () {
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_HoursSetting').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=HoursSetting');
		cy.get('#catall').click({ force: true })
		cy.get('[value="View"]').click({ force: true })
		cy.wait(5000)
		cy.get('[placeholder="Search"]').click({ force: true })
		cy.get('[placeholder="Search"]').clear().type(employeeID2)
		cy.wait(2000)
		cy.xpath('//tbody/tr[1]/td[6]/input[1]').click()
		cy.wait(2000)
		cy.get('#btnsubmit').click({ force: true })
		cy.wait(2000)

	})

	it('Login into Pocket ESS.', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})

	it('Verify setting of Present all day', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimesheetSummary').click();
		cy.wait(3000)
		cy.get('#chkApproveAll').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Please Fill the Timesheet Entry for this Dates:')

	})


})