
describe('03_Task-Project Mapping', function() {
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

	it('Navigate to Task - Project Mapping', function () {	
		cy.get('.dripicons-menu').click({ force: true })
		cy.get('[data-name="ESSMenus"] > table > tbody > :nth-child(2) > .menu-name-td').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews');
		cy.get('#TimesheetEss_tab').click({ force: true })
		cy.get('#Timesheet_Task-ProjectMapping').click({ force: true })
		cy.url().should('include', '/Settings/Employee/ESSIndex?module=Timesheet&submodule=TaskProjectMapping');
	})
		
	it('Verify Validation - Please select Project name.', function() {	
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('button[value="Save"]').click({force: true})
		cy.get(".toast-message").should('contain', 'Please select Project name.')	  		  
	})

	it('Verify Validation - Please select at least one Task.', function () {
		cy.get('#drpPrjctCategory').select(project1)
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Please select at least one Task.')
	})

	it('Save Task - Project Mapping', function () {
		cy.get('.col-sm-6>label').each(($e1, index, $list) => {
			const text=$e1.text()
			if(text.includes(task1))
			{
				cy.xpath("//input[@id='TaskChk']["+(index+1)+"]").click({ force: true })				
			}		
		})
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
	})

	it('Verify Saved Task - Project Mapping', function () {
		cy.get('[data-search="ProjectName"]').should('contain', project1)
		cy.get('[data-search="TaskName"]').should('contain', task1)
	})

	it('Update Task - Project Mapping', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpPrjctCategory').select(project1)
		cy.get('.col-sm-6>label').each(($e1, index, $list) => {
			const text=$e1.text()
			if(text.includes(task2))
			{
				cy.xpath("//input[@id='TaskChk']["+(index+1)+"]").click({ force: true })				
			}		
		})
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Update Successfully')
	})
		
	it('Verify Updated Task - Project Mapping', function () {
		cy.get('[data-search="ProjectName"]').should('contain', project1)
		cy.get('[data-search="TaskName"]').should('contain', task2)
	})

	it('Delete Task - Project Mapping', function () {
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpPrjctCategory').select(project2)
		cy.get('.col-sm-6>label').each(($e1, index, $list) => {
			const text=$e1.text()
			if(text.includes(task2))
			{
				cy.xpath("//input[@id='TaskChk']["+(index+1)+"]").click({ force: true })				
			}		
		})
		cy.get('button[value="Save"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Save Successfully')
		cy.get('#TimesheetEssContentTitle > .row > .col-8 > a > .fa').click({ force: true })
		cy.get('#drpPrjctCategory').select(project2)
		cy.get('[value="Delete"]').click({ force: true })
		cy.get(".toast-message").should('contain', 'Record Deleted Successfully')
	})

	it('Verify Deleted Task - Project Mapping', function () {
		cy.get('[data-search="ProjectName"]').should('not.contain', project2)
	})

	

})
	