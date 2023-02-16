
describe('15_Timesheet Approval', function () {
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
		
		cy.fixture('TestData/Timesheet').then(this, function (data) {
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

	it('Manager Login into Pocket ESS', function () {
		cy.EssLogin(managerID, managerID)
	})
		
		it('Navigate to Timesheet Approval', function() {	
			cy.visit(Cypress.env('url') +'Timesheet/Transaction/TimesheetApproval?Menu=TimesheetApproval');
			//cy.get('#FinanceReport').click();
			cy.wait(3000)
		})
			
	it('Verify Validation  - Please Select Accept or Reject Action!!!', function() {
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".noty_body").should('contain', 'Please Select Accept or Reject Action!!!')
	})
	
	it('Approve Timesheet Entry', function() {
		cy.get('[value="Accept"]').click();
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".noty_body").should('contain', 'Data Approved/Rejected successfully!')
	})
	
	it('Employee Login into Pocket ESS', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})
		
	it('Add Timesheet Entry', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.contains('li', project3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.contains('li', task3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Client Name')]").click({ force: true })
		cy.contains('li', clientName3).click({ force: true })

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('01')

			cy.get('#isBillableHours').click()
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project3)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task3)
			cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', clientName3)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '01:00')
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
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '01:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Timesheet has been submitted successfully.')

	})

	it('Manager Login into Pocket ESS.', function () {
		cy.EssLogin(managerID, managerID)
	})

	it('Verify Validation Messages - Enter Approval Rejection Reason.!', function() {
		cy.visit(Cypress.env('url') +'Timesheet/Transaction/TimesheetApproval?Menu=TimesheetApproval');
			//cy.get('#FinanceReport').click();
			cy.wait(3000)
		cy.get('[value="Reject"]').click();
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".noty_body").should('contain', 'Enter Approval Rejection Reason.!')
	})

	
	it('Reject Timesheet Entry', function() {
		cy.get('.tdReason > input').click({ force: true })
		cy.get('.tdReason > input').clear().type('Testing')
		cy.xpath("//button[contains(text(),'Save')]").click({ force: true })
		cy.get(".noty_body").should('contain', 'Data Approved/Rejected successfully!')
	})

	it('Employee Login into Pocket ESS.', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})
		
	it('Verify Rejected Timesheet Entry', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimesheetSummary').click();

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task3)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName3)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '01:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Timesheet has been submitted successfully.')

	})

	it('Manager Login into Pocket ESS..', function () {
		cy.EssLogin(managerID, managerID)
	})

	it('Approve Timesheet Entry from Details Popup', function() {
		cy.visit(Cypress.env('url') +'Timesheet/Transaction/TimesheetApproval?Menu=TimesheetApproval');
			//cy.get('#FinanceReport').click();
			cy.wait(3000)

		cy.get(':nth-child(8) > .btn').click();
		cy.get('[data-title="Accept"] > .empclsRadio').click();
		cy.get('#TimeApprovedata > .text-center > .btn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Data Approved/Rejected successfully!')
	})


	it('Employee Login into Pocket ESS..', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})
		
	it('Add Timesheet Entry.', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimeEntry').click();

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		cy.contains('li', project3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		cy.contains('li', task3).click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Client Name')]").click({ force: true })
		cy.contains('li', clientName3).click({ force: true })

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('01')

			cy.get('#isBillableHours').click()
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project3)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task3)
			cy.xpath("//table[@id='tblTime']//tr/td[3]").should('contain', clientName3)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '01:00')
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
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '01:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Timesheet has been submitted successfully.')

	})

	it('Manager Login into Pocket ESS...', function () {
		cy.EssLogin(managerID, managerID)
	})

	it('Reject Timesheet Entry from Details Popup ', function() {
		cy.visit(Cypress.env('url') +'Timesheet/Transaction/TimesheetApproval?Menu=TimesheetApproval');
			//cy.get('#FinanceReport').click();
			cy.wait(3000)
			cy.get(':nth-child(8) > .btn').click();
			cy.get('[data-title="Reject"] > .empclsRadio').click();
			cy.get('#TimeApprovedata > .text-center > .btn').click({ force: true })
			cy.get(".noty_body").should('contain', 'Data Approved/Rejected successfully!')
	})

	it('Employee Login into Pocket ESS...', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})
		
	it('Verify Rejected Timesheet Entry', function () {
		cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		cy.get('#TimesheetSummary').click();

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task3)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName3)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '01:00')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')
		
	})

	it('Verify Delete Functionality', function () {
		
		cy.xpath('//tbody/tr[1]/td[9]/button[1]/i[1]').click({ force: true })

		cy.get(".noty_body").should('contain', 'Entry Deleted Successfully.')
	})

	
})