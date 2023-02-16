
describe('02_Project and Task', function() {
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
	var employeeID = ''

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
			 employeeID = this.data.employeeID

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

	it('Add Configuration Fields - Project', function () {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=customfields')
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(3000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').type('PROJECT')

		cy.get('#labelName').click({ force: true })
		cy.get('#labelName').type('PROJECT')

		cy.xpath("//input[@name='FieldSize']").click({ force: true })
		cy.xpath("//input[@name='FieldSize']").clear().type('30')

		cy.get('[name="CellType"]').select('Pop-Up', { force: true })

		cy.xpath("//select[@name='Panel']").select('Employee',{force: true})

		cy.get('#Filter').click({force: true})

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
			cy.log(text.trim())
		})

	})

	it('Add Configuration Fields - Task', function () {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=customfields')
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(3000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').type('TASK')

		cy.get('#labelName').click({ force: true })
		cy.get('#labelName').type('TASK')

		cy.xpath("//input[@name='FieldSize']").click({ force: true })
		cy.xpath("//input[@name='FieldSize']").clear().type('100')

		cy.get('[name="CellType"]').select('Pop-Up', { force: true })

		cy.xpath("//select[@name='Panel']").select('Custom', { force: true })

		//cy.get('#Filter').click({ force: true })

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
			cy.log(text.trim())
		})

	})

	it('Add Project from Popup data', function () {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=popup')
		cy.wait(3000)
		cy.get("#metadatatable").select('PROJECT', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })

		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(project1)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

		cy.get("#metadatatable").select('PROJECT', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })

		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(project2)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})
	})

	it('Add Task from Popup data', function () {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=popup')
		cy.wait(3000)
		cy.get("#metadatatable").select('TASK', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })

		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(task1)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

		cy.get("#metadatatable").select('TASK', { force: true })
		cy.wait(1000)
		cy.xpath("//div[@id='employeeContentTitle']//i[@class='fas fa-plus']").click({ force: true })



		cy.get('#popupvalue').click({ force: true })
		cy.get('#popupvalue').type(task2)

		cy.get('#sbtBtn').click({ force: true })

		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
			cy.log(text.trim())
		})

		

	})
	

})
	