

describe('11_Timesheet Entry without Manager', function () {

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
		cy.getCookies_ESS()
	})


	it('Login into Pocket ESS', function () {
		cy.EssLogin(employeeID1, employeeID1)
		})

		it('Navigate to Timesheet Entry', function() {
			cy.visit(Cypress.env('essUrl')+'Timesheet/Transaction/TimesheetRequest');
			cy.get('#TimeEntry').click();
		})

		it('Verify Validation - Please Select Project', function() {

			cy.get('#btnAdd').click({force: true})
			 cy.get(".noty_body").invoke('text').then((text) => {
				 softExpect(text.trim()).to.eq('Please Select Project');
			 cy.wait(500)
				 cy.get(".noty_body").click({ force: true })
				 cy.wait(500)
			  })
		})
	
	it('Verify Validation  - Please Select Task', function () {
		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		//cy.get('input[type="search"]').eq(0).click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project3)
		cy.get('.select2-results__option--highlighted').click({ force: true })


			cy.get('#btnAdd').click({ force: true })
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Please Select Task');
				cy.wait(500)
				cy.get(".noty_body").click({ force: true })
			})
		})
	
	it('Verify Records in Table', function () {
		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task3)
		cy.get('.select2-results__option--highlighted').click({ force: true })

			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project3)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task3)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project3)
			cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'No')
		})
	
		it('Verify Edit Functionality', function () {
			cy.get("#tblTime").find("tr").its('length').as('intialLength');
			cy.get('.fa-edit').click({ force: true })
	
			cy.get('@intialLength').then(intialLength => {
				cy.get("#tblTime").find("tr").should("have.length", intialLength - 1);
			})
		})
	
	
		it('Verify Delete Functionality', function () {
			cy.get('#btnAdd').click({ force: true })
			cy.get("#tblTime").find("tr").its('length').as('intialLength');
			cy.get('.fa-trash').click({ force: true })
	
			cy.get('@intialLength').then(intialLength => {
				cy.get("#tblTime").find("tr").should("have.length", intialLength - 1);
			})
		})
	
		it('Verify Records in Previous Records Table', function () {
			//cy.get('#isBillableHours').click()
			cy.get('#btnAdd').click({ force: true })
	
			cy.xpath("//table[@id='tblTime']//tr/td[1]").should('contain', project3)
			cy.xpath("//table[@id='tblTime']//tr/td[2]").should('contain', task3)
			cy.xpath("//table[@id='tblTime']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTime']//tr/td[8]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTime']//tr/td[9]").should('contain', 'Worked on ' + project3)
			cy.xpath("//table[@id='tblTime']//tr/td[14]").should('contain', 'No')
	
			cy.get('#btnConfirm').click()
			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('Timesheet Entry Submitted Successfully. For Approval Process , Kindly Submit This Entry From TimeSheet Summary Page!!!');
				cy.get(".noty_body").click()
			})
	
			cy.xpath("//table[@id='tblTimeData']//tr/td[1]").should('contain', project3)
			cy.xpath("//table[@id='tblTimeData']//tr/td[2]").should('contain', task3)
			cy.xpath("//table[@id='tblTimeData']//tr/td[4]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTimeData']//tr/td[5]").should('contain', currentDate)
			cy.xpath("//table[@id='tblTimeData']//tr/td[8]").should('contain', '08:00')
			cy.xpath("//table[@id='tblTimeData']//tr/td[9]").should('contain', 'Worked on ' + project3)
			cy.xpath("//table[@id='tblTimeData']//tr/td[10]").should('contain', 'No')
			cy.xpath("//table[@id='tblTimeData']//tr/td[15]").should('contain', 'Approved')
	
		})
	
	
	it('Verify Validation - 24 Hours Total Limit Exceed', function () {
		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project3)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task3)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#btnAdd').click({ force: true })

		
		cy.get('#btnAdd').click({ force: true })


		cy.get('#btnAdd').click({ force: true })

			cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('24 Hours Total Limit Exceed');

			})
		})
	
	it('Verify Punch In-Out Time when Punch details not present', function () {
		cy.get('#punchTime').should('contain', 'Punch not found')
	})

	it('Verify Validation  - Future date entry is not allowed', function () {
		cy.reload()
		const tomorrow = moment().add(1, "days").format('MMMM D, YYYY');
		cy.get('#txtToDate').click()
		cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="' + tomorrow + '"]').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project3)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task3)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		
		cy.get('#btnAdd').click({ force: true })
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Future date entry is not allowed');
		})
	})

	it('Verify Validation  - TimeSheet Is Lock For This Date!!', function () {
		cy.reload()
		const yasterday = moment().subtract(1, "days").format('MMMM D, YYYY');
		cy.get('#txtToDate').click()
		cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="' + yasterday+'"]').click({ force: true })
	

		cy.xpath("//span[contains(text(),'Choose Project Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(project3)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.xpath("//span[contains(text(),'Choose Task Name')]").click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').eq(1).type(task3)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#btnAdd').click({ force: true })
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('TimeSheet Is Lock For This Date!!');
		})
	})
	
	

})