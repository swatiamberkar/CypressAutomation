

describe('14_Timesheet Summary', function () {
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

	it('Login into Pocket ESS', function () {
		cy.EssLogin(employeeID2, employeeID2)
	})
		
	it('Navigate to Timesheet Summary', function() {	
			cy.visit(Cypress.env('url') +'/Timesheet/Transaction/TimesheetRequest');
			cy.get('#TimesheetSummary').click();
			cy.wait(3000)
		})
			
	it('Verify Validation  - Please Select Atleast One Entry!!!', function() {		
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Please Select Atleast One Entry!!!')
	})
	
	it('Verify Timesheet Entry details', function () {
		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task3)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName3)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '08:00')	
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'Yes')
		cy.get(':nth-child(6) > b').should('contain', '8 : 0')
	})
	
	it('Approve Timesheet Entry', function () {
		cy.get('.appr').click({ force: true })
		cy.get('#approvbtn').click({ force: true })
		cy.get(".noty_body").should('contain', 'Timesheet has been submitted successfully.')
	})

	it('Verify Timesheet Entry details', function () {
		cy.get('#btnApproval').click({ force: true })
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").each(function (row, i) {
			var num = parseFloat(i)
			//cy.wait(2000)	
			cy.xpath("//table[@id='tableSorter']//tr/td[5]").eq(num).invoke('text').then((text) => {
				cy.log(text.trim())
				if (text.trim() == currentDate) {
					softExpect(text.trim()).to.eq(currentDate);
					cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
					cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task3)
					cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName3)
					cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
					cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
					cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Worked on ' + project3)
					cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', 'Yes')
					cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', '08:00')
					cy.get('.btn-danger').eq(2).click()
				}

				})
		})
	})
	
	it('Add Timesheet Entry', function () {
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

	})
	it('Verify Edit Functionality', function () {
		//cy.visit(Cypress.env('url') + '/Timesheet/Transaction/TimesheetRequest');
		//cy.get('#TimesheetSummary').click();
		cy.wait(3000)
		cy.xpath('//tbody/tr[1]/td[9]/a[1]/i[1]').click({ force: true })

		cy.get('#txtToDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(currentDate)
		})

		//cy.get('#drpProject').select(project1)
	
		cy.get('#drpTask').select(task2)

		cy.get('#drpclientName').select(clientName2)

		cy.get('#txtTotalHours').click({ force: true })
		cy.get('#txtTotalHours').clear().type('08')
		cy.get('#txtTotalMin').click({ force: true })
		cy.get('#txtTotalMin').clear().type('10')
		cy.get('#Description').click({ force: true })
		cy.get('#Description').clear().type('Testing')
		cy.get('#IsBillableEntry').click({ force: true })
		cy.get('#btnConfirm').click({ force: true })

		

		cy.get(".noty_body").should('contain', 'Entry Updated Successfully')

		cy.xpath("//table[@id='tableSorter']//tr/td[1]").should('contain', project3)
		cy.xpath("//table[@id='tableSorter']//tr/td[2]").should('contain', task2)
		cy.xpath("//table[@id='tableSorter']//tr/td[3]").should('contain', clientName2)
		cy.xpath("//table[@id='tableSorter']//tr/td[4]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[5]").should('contain', currentDate)
		cy.xpath("//table[@id='tableSorter']//tr/td[6]").should('contain', 'Testing')
		cy.xpath("//table[@id='tableSorter']//tr/td[7]").should('contain', '08:10')
		cy.xpath("//table[@id='tableSorter']//tr/td[8]").should('contain', 'No')

	})

	it('Verify Delete Functionality', function () {
		
		cy.xpath('//tbody/tr[1]/td[9]/button[1]/i[1]').click({ force: true })

		cy.get(".noty_body").should('contain', 'Entry Deleted Successfully.')
	})


})