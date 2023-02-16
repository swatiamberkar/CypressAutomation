
describe('05_Timesheet Project DeadLine', function() {
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


	var downloadPath = 'cypress/downloads/'
	var fileName = 'Timesheet Dead Line-Report'
	var pdfFileName = 'Time Sheet Deadline-Report'
	 

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

	it('Navigate to Timesheet Project DeadLine', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_TimesheetProjectDeadLine').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TimesheetProjectDeadLine');
	})
		
	it('Verify Validation - Please select Project Name', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#btnSave').click({force: true})
		cy.get(".toast-message").should('contain', 'Please select Project Name')	  		  
	})

	it('Save Timesheet Project DeadLine', function () {
		cy.get('#drpProject').select(project1)
		cy.get('#btnSave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
		cy.get(".toast-message").click()
	})


	it('Verify Saved Timesheet Project DeadLine', function () {

		//cy.get('[title="Project Name"]').should('contain', project1)
		cy.get('.sorting_1').should('contain', project1)
			
	})

	it('Verify Validation - Duplicate Project Name', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpProject').select(project1)
		cy.get('#btnSave').click({ force: true })
		cy.get(".toast-message").should('contain', 'Duplicate Project Name')
		cy.get(".toast-message").click()
		cy.get('.btn-danger').click()
	})

	it('Update Timesheet Project DeadLine', function () {
 		
				cy.get('.fa-edit').click({ force: true })
				cy.wait(1000)

				//cy.get('#drpProject').select(project2)
				cy.get('#dtEnd').click({ force: true }).then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val(currentDate)
				})
				cy.get('#btnEdit').click({ force: true })
				//cy.wait(2000)
				cy.get(".toast-message").should('contain', 'Record Save Successfully')
			
	})

	it('Verify Updated Timesheet Project DeadLine', function () {
		

				//cy.get('[title="Project Name"]').should('contain', project1)
				cy.get('.sorting_1').should('contain', project1)
				cy.xpath("//td[contains(text(),'"+currentDate+"')]").should('contain', currentDate)
			
	})
	

	it('Delete Timesheet Project DeadLine', function () {


				cy.get('.text-danger').click({ force: true })
				cy.wait(1000)
				cy.get(".toast-message").should('contain', 'Delete Record Successfully')
			
	})
/*
	it('Verify Deleted Employee - Project Mapping', function () {
		cy.wait(10000)
		
				cy.get('.sorting_1').should('not.contain', project1)
			
				
	})

	


it('Verify Export to Excel functionality', function () {
})	
	it('1. Add Project Deadline', function () {
	cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })

	   cy.get('#drpProject').select(project2)
	   cy.get('#dtEnd').click({ force: true }).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
		   input.val(currentDate)
	   })
	   cy.get('#btnSave').click({ force: true })
	   cy.get(".toast-message").should('contain', 'Record Save Successfully')
   })
   
	it('2. Export Excel', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
	cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
			setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('#btnExport')
			.should("be.visible")
			.click();
	})
	cy.wait(8000)
	})
			
	
	
	it('3. Convert Export Excel to Text file & Verify Records', function () {
	cy.task('convertExcelToJson_CurrentFile', { file: fileName, fileName: downloadPath + fileName + '.xlsx' })
	
	cy.readFile(downloadPath + fileName + '.txt').should('contains', currentDate)
	cy.readFile(downloadPath + fileName + '.txt').should('contains', project2)
})

 	it('4. Delete Export Excel & Text file from Download folder', function () {
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.xlsx' })
	cy.task('deleteFile', { fileName: downloadPath + fileName + '.txt' })

})

it('Verify Export to PDF functionality', function () {
})	
   	it('1. Export PDF', function () {
		cy.get('#PartialEmployees')
			.find('.media')
			.then(listing => {
				const listingCount = Cypress.$(listing).length;
				var lastField = listingCount - 1
				cy.get('.fa-edit').eq(lastField).click({ force: true })

	cy.window().document().then(function (doc) {
		doc.addEventListener('click', () => {
			setTimeout(function () { doc.location.reload() }, 5000)
		})
		cy.get('#btnPDF')
			.should("be.visible")
			.click();
	})
			})
			cy.wait(5000)
	})

	it('2. Convert Export PDF to Text file & Verify Records', function () {
	cy.task('convertPDFToJson_CurrentFile', { file: pdfFileName, fileName: downloadPath + pdfFileName + '.pdf' })
	
	cy.readFile(downloadPath + pdfFileName + '.txt').should('contains', currentDate)
	cy.readFile(downloadPath + pdfFileName + '.txt').should('contains', project2)
})

 	it('3. Delete Export PDF & Text file from Download folder', function () {
	cy.task('deleteFile', { fileName: downloadPath + pdfFileName + '.pdf' })
	cy.task('deleteFile', { fileName: downloadPath + pdfFileName + '.txt' })
})

*/
})