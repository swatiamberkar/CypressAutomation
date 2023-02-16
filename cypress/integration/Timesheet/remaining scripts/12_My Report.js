

describe('12_My Report', function () {
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

	var downloadPath = 'cypress\\downloads\\'
	var fileName = 'ReportDetailed'


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
		cy.EssLogin(employeeID1, employeeID1)
	})
		
	it('Navigate to My Report', function() {	
		cy.visit(Cypress.env('url') +'/Timesheet/Transaction/MyTimesheetReport');
		cy.get('#FinanceReport').click();
			cy.wait(3000)
	})
	
	it('1. Download Report with Start Date & End Date', function () {
		cy.window().document().then(function (doc) {
			doc.addEventListener('click', () => {
				setTimeout(function () { doc.location.reload() }, 5000)
			})
			cy.get('[value="Download Excel"]')
				.should("be.visible")
				.click();
		})
	})

	it('2. Convert Excel to Text file & Verify Records with Start Date & End Date', function () {
	

		cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
		
		cy.readFile(downloadPath + fileName + '.txt').should('contains', currentDate)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', project3)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', task3)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Approved')

	})

	it('3. Delete Excel & Text file with Start Date & End Date from Download folder', function () {
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

	})
		
	it('1. Download Report with Project & Task selection', function () {
		cy.get('[placeholder="Choose Project Name"]').click({ force: true })
		//cy.get('input[type="search"]').eq(0).click({ force: true })
		//cy.get('input[type="search"]').eq(1).type(project3)
		//cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.contains('li', project3).click({ force: true })

		cy.get('[placeholder="Choose Task Name"]').click({ force: true })
		//cy.get('input[type="search"]').click({ force: true })
		//cy.get('input[type="search"]').eq(1).type(task3)
		//cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.contains('li', task3).click({ force: true })

		cy.window().document().then(function (doc) {
			doc.addEventListener('click', () => {
				setTimeout(function () { doc.location.reload() }, 5000)
			})
			cy.get('[value="Download Excel"]')
				.should("be.visible")
				.click();
		})
	})

	it('2. Convert Excel to Text file & Verify Records with Project & Task selection', function () {
	

		cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
		
		cy.readFile(downloadPath + fileName + '.txt').should('contains', currentDate)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', project3)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', task3)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Approved')

	})

	it('3. Delete Excel & Text file with Project & Task selection from Download folder', function () {
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

	})
	
	it('1. Download Report with Project Wise Hours Worked', function () {
		cy.get('[value="1"]').eq(1).click({ force: true })
		
		cy.window().document().then(function (doc) {
			doc.addEventListener('click', () => {
				setTimeout(function () { doc.location.reload() }, 5000)
			})
			cy.get('[value="Download Excel"]')
				.should("be.visible")
				.click();
		})
	})

	it('2. Convert Excel to Text file & Verify Records with Project Wise Hours Worked', function () {
	

		cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
		
		cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Project Wise Hours Worked Report ')
		cy.readFile(downloadPath + fileName + '.txt').should('contains', project3)
		cy.readFile(downloadPath + fileName + '.txt').should('contains', '8:00')
		cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Approved')
		cy.readFile(downloadPath + fileName + '.txt').should('contains', '08:00')

	})

	it('3. Delete Excel & Text file of Project Wise Hours Worked from Download folder', function () {
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
		cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

	})

it('1. Download Report with Employee Wise Hours Worked', function () {
	cy.get('[value="2"]').eq(1).click({ force: true })
	
	cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
			setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('[value="Download Excel"]')
			.should("be.visible")
			.click();
	})
})

it('2. Convert Excel to Text file & Verify Records of Employee Wise Hours Worked Report', function () {


	cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
	
	cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Employee Wise Hours Worked Report')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', employeeID1)
	cy.readFile(downloadPath + fileName + '.txt').should('contains', '8:00')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Approved')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', '08:00')

})

it('3. Delete Excel & Text file of Employee Wise Hours Worked Report from Download folder', function () {
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

})
	
it('1. Download Report with Employee Wise Project Hours Worked', function () {
	cy.get('[value="3"]').eq(0).click({ force: true })
	
	cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
			setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('[value="Download Excel"]')
			.should("be.visible")
			.click();
	})
})

it('2.  Convert Excel to Text file & Verify Records of Employee Wise Project Hours Worked', function () {

	cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
	
	cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Employee Wise Project Hours Worked')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', employeeID1)
	cy.readFile(downloadPath + fileName + '.txt').should('contains', project3)
	cy.readFile(downloadPath + fileName + '.txt').should('contains', '8:00')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Approved')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', '08:00')

})

it('3. Delete Excel & Text file of Employee Wise Project Hours Worked Report from Download folder', function () {
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

})
	
it('1. Download Report with Project Wise Employee Worked', function () {
	cy.get('[value="4"]').eq(0).click({ force: true })
	
	cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
			setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('[value="Download Excel"]')
			.should("be.visible")
			.click();
	})
})

it('2. Convert Excel to Text file & Verify Records of with Project Wise Employee Worked Report', function () {

	cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
	
	cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Project Wise Employee Worked')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', employeeID1)
	cy.readFile(downloadPath + fileName + '.txt').should('contains', project3)
	cy.readFile(downloadPath + fileName + '.txt').should('contains', '8:00')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', 'Approved')
	cy.readFile(downloadPath + fileName + '.txt').should('contains', '08:00')

})

it('3. Delete Excel & Text file of Project Wise Employee Worked Report from Download folder', function () {
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

})

it('Verify Report with No Records Found', function () {

	cy.get('[placeholder="Choose Client Name"]').click({ force: true })
	cy.contains('li', clientName3).click({ force: true })
	
	cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
			setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('[value="Download Excel"]')
			.should("be.visible")
			.click();
	})
	cy.wait(2000)
	cy.get(".alert ").should('contain', 'No Records Found.!')
})

})
