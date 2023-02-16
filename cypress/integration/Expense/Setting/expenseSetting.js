
describe('Claim Entry', function() {
	
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	
	var companyCode = ''
	var employeeID ='exp01'
	var managerID = 'exp02'
	var managerID2 = 'exp03'
	var financeID = 'exp04'
	var filePath= 'demo.xlsx'
	var mode = 'Train'
	var Purpose = 'Meeting'  

    



	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1	
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	
	
		var ClaimDate = currentDate
		var ClaimType = 'Local'
		var ClaimAmount = '1500'
		var FromDate = currentDate
		var ToDate = currentDate
		var Remark = 'Local Travel'
		var Remark1 = 'Testing'	
		var filePath = filePath
		var FromLocation = 'Mumbai'
		var ToLocation = 'Navi Mumbai'
		var VendorName = 'HDFC'
		var InvoiceNumberId = 'HDFC001'
		var 	transcationID='TC002'
		var manager1Remark = 'Approve'
		var financeRemark = 'Approve at Finance'
		
	
	
	
   
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('EmployeeLogin',()=>{
	
	//	cy.visit(Cypress.env('url'))
		cy.visit(Cypress.env('essUrl'))
		cy.wait(2000)
		

		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressPocketHRMS_Cloud/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(employeeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(employeeID)
		
		cy.wait(2000)
		cy.get('[value="SIGN IN"]').click()
		//cy.xpath("//button[contains(text(),'SIGN IN')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('ManagerLogin',()=>{
		//cy.visit(Cypress.env('url'))
		cy.visit(Cypress.env('essUrl'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressPocketHRMS_Cloud/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
	
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID)
		
		cy.wait(2000)
		cy.get('[value="SIGN IN"]').click()
		//cy.xpath("//button[contains(text(),'SIGN IN')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('Manager2Login',()=>{
	
		cy.visit(Cypress.env('essUrl'))
		cy.wait(2000)
		

		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressPocketHRMS_Cloud/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(managerID2)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(managerID2)
		
		cy.wait(2000)
		cy.get('[value="SIGN IN"]').click()
		//cy.xpath("//button[contains(text(),'SIGN IN')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('FinanceLogin',()=>{
		cy.visit(Cypress.env('essUrl'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressPocketHRMS_Cloud/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {	
					 	
		var comapnaycode = entry.comapnaycode	
		cy.log('comapnaycode '+ comapnaycode)		
		cy.wait(500)
	
		
		cy.get('#CompanyCode').click({force: true})
		cy.get('#CompanyCode').clear();
		cy.get('#CompanyCode').type(comapnaycode)
		
		cy.wait(2000)
		cy.get('#EmployeeCode').click({force: true})
		cy.get('#EmployeeCode').clear();
		cy.get('#EmployeeCode').type(financeID)
		
		cy.wait(2000)
		cy.get('#Password').click({force: true})
		cy.get('#Password').clear();
		cy.get('#Password').type(financeID)
		
		cy.wait(2000)
		cy.get('[value="SIGN IN"]').click()
		//cy.xpath("//button[contains(text(),'SIGN IN')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	
	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	
	it('Add Expense Type', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
		cy.wait(2000)	
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		cy.get('#drpParameter').select('Category',{force: true})
		cy.get('#drpValue').select('Staff',{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(ClaimType);
		//cy.get('#rad2').click({force: true})
		cy.get('#createBtn').click({force: true})
		cy.wait(2000) 
		
	})
	
	it('Set Auto Document Number Setting', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews')
		cy.wait(2000)
		cy.get('#ExpenseEss_tab').click({force: true})
		cy.wait(2000) 
		cy.get('#Expense_AutoDocumentNumberSetting').click({force: true})
		cy.wait(2000)
		cy.get('#char').click({force: true})
		cy.get('#char').clear().type('TC');
		cy.get('#TrailingZero').click({force: true})
		cy.get('#TrailingZero').clear().type('00');
		cy.get('#StartingNumber').click({force: true})
		cy.get('#StartingNumber').clear().type('01');
		cy.get('#SaveBtn').click({force: true})
		cy.wait(2000) 
	})
	
	it('Add Expense mode', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseMode')		
		cy.wait(5000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(5000)
		cy.get('#drpValue').select(businessValue,{force: true})
		cy.get('#claimtype').select(expenseType,{force: true})
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(mode)
		
		 cy.get('#btnSubmit').click({force: true})
	})

	it('Add Expense Purpose', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpensePurpose')		
		cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose)
		
		 cy.get('#btnSubmit').click({force: true})
	})

})