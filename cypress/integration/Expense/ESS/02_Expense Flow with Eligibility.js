
describe('Expense Eligibility', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var ClaimType = 'Local'
	var transcationID = ''
	var companyCode = ''
	var employeeID ='GT15'
	var managerID = 'GT02'
	var managerID2 = 'GT03'
	var financeID = 'GT05'
	var filePath= 'demo.xlsx'
	
	var ClaimType1 = 'Hotel'
	var mode = 'Train'
	var Purpose = 'Meeting'
	

	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	beforeEach(function(){
        cy.getCookies()
	})
	
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
	
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		

		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
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
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('ManagerLogin',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
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
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('Manager2Login',()=>{
	
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		

		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
	cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
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
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	Cypress.Commands.add('FinanceLogin',()=>{
		cy.visit(Cypress.env('url'))
		cy.wait(2000)
		
		cy.get("body").then($body => {
        if ($body.find('[onclick="return newSinIn()"]').length > 0) {   
            cy.get('[onclick="return newSinIn()"]').click({force: true})
		cy.log('test')
        }
    });
	
		cy.readFile('D:/CypressESS/cypress/fixtures/Company.json').then((text) =>{
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
		cy.xpath("//button[contains(text(),'Log In')]").click({force: true})
		cy.wait(5000)
		})
	})
	})
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
	
	it('Assign manager 1 for Expense module from Approval Matrix', function() {	
		const { softAssert, softExpect } = chai;

		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(5000)
		cy.get('[title="Add Approval Matrix Manager"]').click({force: true})

		//cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click({force: true})
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(managerID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Expense').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			cy.wait(3000)
			})
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Expense')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000) 
			})
		
		   })
	
	it('Assign manager 2 for Expense module from Approval Matrix', function() {	
		const { softAssert, softExpect } = chai;
		//cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({force:true})
	
		cy.wait(5000)
		//cy.get('[title="Add Approval Matrix Manager"]').click({force: true})

		cy.xpath("//div[@id='approvalComponentTitle']//a[1]").click()
		cy.wait(2000)
		  
			cy.get('#select2-approvalManager-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(managerID2)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			cy.get('#Priority').click({force: true})
			cy.get('#Priority').clear().type('2')
			
			cy.get('#Expense').click({force: true})
			
		// Success Validation	
			cy.get('#btnSaveText').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			})
			cy.wait(3000)
			
			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(managerID2)
			cy.wait(2000) 
			})
			
			
			cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Expense')
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('2')
			cy.wait(2000) 
			})
		
		   })
	
	it('Set Expene Eligibility - Expense Type Local Amount 2000, Claim Wise, No approval upto 500', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseEligibility')		
		cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		cy.get('#drpValue').select('Staff',{force: true})
		cy.get('#claimtype').select(ClaimType,{force: true})
		
		cy.get('#select2-multiEmp-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type('2000');
		
		cy.get('#NoApprovalAmount').click({force: true})
		cy.get('#NoApprovalAmount').clear().type('500');
		cy.get('#crtbtn').click({force: true})
		cy.wait(2000)
	})	

	it('Login into Pocket ESS', function() {
		cy.EmployeeLogin()
	})
	
	it('1. No approval upto 500', function() {	
		const { softAssert, softExpect } = chai;
		var ExpenseType = 'Local'
		var ClaimAmount = '500'
		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)	
		// cy.get('#claimentry').click({force: true})
		 //cy.wait(10000)
		 cy.get('#btnOpenForm').click({force: true})
		 cy.wait(2000) 
		cy.get('#TransNoId').then($input => {
		 transcationID = $input.val()		 
		 cy.log('transcationID:'+transcationID)
		 
		 cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		
		cy.get('[onclick="Add()"]').click({force: true})
		cy.wait(2000)
		cy.get('#claimtype').select(ExpenseType,{force: true})
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type(ClaimAmount);
		
		cy.get('#fDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#toLocId').click({force: true})
		
		cy.get('#tDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#Remark').click({force: true})
		cy.get('#Remark').clear().type('Local Travel');
		
		cy.get('#mode').select(mode,{force: true})
		cy.get('#purpose').select(Purpose,{force: true})
		
	
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#txt_claimproof').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#fromLocId').click({force: true})
		cy.get('#fromLocId').clear().type('Mumbai');
		
		cy.get('#toLocId').click({force: true})
		cy.get('#toLocId').clear().type('Pune');
		
		cy.get('#btnAdd').click({force: true})
		cy.wait(2000)
		cy.get('#Remarks').click({force: true})
		cy.get('#Remarks').clear().type('Testing');
		
		cy.get('#VendorNameId').click({force: true})
		cy.get('#VendorNameId').clear().type('HDFC');
		
		cy.get('#InvoiceNumberId').click({force: true})
		//cy.get('#InvoiceNumberId').clear().type('HD010');
		
		//cy.get('#dynamicDropId').select('IT',{force: true})
		
		cy.get('#crtbtn').click({force: true})	

		})		
	})
		
	it('Verify Claim in Finance Report', function() {
		const { softAssert, softExpect } = chai;
		cy.FinanceLogin()
		var ExpenseType = 'Local'
		var ClaimAmount = '500'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
		
	})
	
	it('Verify Claim Entry in My Claim Report', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		var ExpenseType = 'Local'
		var ClaimAmount = '500'
		
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
	})
	

	it('2. Greater amount (600) than No approval upto 500_Claim Wise', function() {	
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		var ExpenseType = 'Local'
		var ClaimAmount = '600'
		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)	
		// cy.get('#claimentry').click({force: true})
		 //cy.wait(10000)
		 cy.get('#btnOpenForm').click({force: true})
		 cy.wait(2000) 
		cy.get('#TransNoId').then($input => {
		 transcationID = $input.val()		 
		 cy.log('transcationID:'+transcationID)
		 
		 cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		
		cy.get('[onclick="Add()"]').click({force: true})
		cy.wait(2000)
		cy.get('#claimtype').select(ExpenseType,{force: true})
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type(ClaimAmount);
		
		cy.get('#fDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#toLocId').click({force: true})
		
		cy.get('#tDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#Remark').click({force: true})
		cy.get('#Remark').clear().type('Local Travel');
		
		//cy.get('#purpose').select('Hotel',{force: true})
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#txt_claimproof').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#fromLocId').click({force: true})
		cy.get('#fromLocId').clear().type('Mumbai');
		
		cy.get('#toLocId').click({force: true})
		cy.get('#toLocId').clear().type('Pune');
		
		cy.get('#btnAdd').click({force: true})
		cy.wait(2000)
		
		cy.get('#VendorNameId').click({force: true})
		cy.get('#VendorNameId').clear().type('HDFC');
		
		cy.get('#InvoiceNumberId').click({force: true})
		//cy.get('#InvoiceNumberId').clear().type('HD010');
		
		//cy.get('#dynamicDropId').select('IT',{force: true})
		
		cy.get('#Remarks').click({force: true})
		cy.get('#Remarks').clear().type('Testing');
		 cy.wait(2000)
		 
		cy.get('#crtbtn').click({force: true})	
		cy.wait(10000)
			cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)
			//cy.wait(2000)	
			cy.get('#EStableSorter> tbody > tr> td:nth-child(1)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(currentDate);				
		})
		
		cy.get('#EStableSorter> tbody > tr> td:nth-child(2)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(currentDate);				
		})
		
		cy.get('#EStableSorter> tbody > tr> td:nth-child(3)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('600');				
		})
		
		cy.get('#EStableSorter> tbody > tr> td:nth-child(4)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('Pending');				
		})
			})
		})
	})
		
	it('Approve Claim Entry at manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(9)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(10)>input').clear().type('Approve');
				cy.get('#btnsave').click({force: true})
				cy.wait(5000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})

	it('Verify Claim in Manager 1 Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()
		var ExpenseType = 'Local'
		var ClaimAmount = '600'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
				
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains('Pending')
		

			}
			})
			})
		})		
	})	

	it('Approve Claim Entry at manager 2 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.Manager2Login()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(9)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(10)>input').clear().type('Approve');
				cy.get('#btnsave').click({force: true})
				cy.wait(5000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})
		
	it('Verify Claim in Manager 2 Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.Manager2Login()
		var ExpenseType = 'Local'
		var ClaimAmount = '600'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID.trim() && transID.trim() == transcationID.trim())
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains('Approved')	
			}
			})
			})
		})	
	})


	it('Approve Claim Entry at Finance Login', function() {
		const { softAssert, softExpect } = chai;
		cy.FinanceLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(10)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			//EmpCode.trim() == employeeID &&
			if ( transID.trim() == transcationID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').clear().type('Approve');
				cy.get('#btnsave').click({force: true})
				//cy.wait(5000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})
	
	it('Verify Claim in Finance Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.FinanceLogin()
		var ExpenseType = 'Local'
		var ClaimAmount = '600'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
		
	})
	
	it('Verify Claim Entry in My Claim Report', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		var ExpenseType = 'Local'
		var ClaimAmount = '600'
		
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
	})
	
	it('Login into Pocket HRMS', function() {
		cy.cloudLogin()
	
		cy.changeCompany()
	})
	
	it('Add Expense Type - Hotel', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
		cy.wait(2000)		
		 cy.get('#Expense_ExpenseType').click({force: true})
		 cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		cy.get('#drpParameter').select('Category',{force: true})
		cy.get('#drpValue').select('Staff',{force: true})
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').clear().type(ClaimType1);
		cy.get('#createBtn').click({force: true})
		cy.wait(2000) 
		
	})
	
	it('Set Expene Eligibility - Expense Type Local Amount 3000, Monthly Wise, No approval upto 500', function() {
		
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseEligibility')		
		cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		cy.wait(2000)
		cy.get('#drpValue').select('Staff',{force: true})
		cy.get('#claimtype').select(ClaimType1,{force: true})
		
		cy.get('#select2-multiEmp-container').click({force: true})
			cy.wait(2000)
			cy.get('input[type="search"]').click({force: true})
			cy.get('input[type="search"]').type(employeeID)
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
			cy.wait(2000)
			
		cy.get('#indamt').click({force: true})
		cy.get('#indamt').clear().type('3000');
		
		cy.get('#NoApprovalAmount').click({force: true})
		cy.get('#NoApprovalAmount').clear().type('500');
		cy.get('#ApprovalType').select('Monthly',{force: true})
		
		cy.get('#crtbtn').click({force: true})
		cy.wait(2000)
	})
	
	it('3. No approval upto 500', function() {	
		const { softAssert, softExpect } = chai;
		var ExpenseType = 'Hotel'
		var ClaimAmount = '500'
		cy.EmployeeLogin()
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)	
		// cy.get('#claimentry').click({force: true})
		 //cy.wait(10000)
		 cy.get('#btnOpenForm').click({force: true})
		 cy.wait(2000) 
		cy.get('#TransNoId').then($input => {
		 transcationID = $input.val()		 
		 cy.log('transcationID:'+transcationID)
		 
		 cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		
		cy.get('[onclick="Add()"]').click({force: true})
		cy.wait(2000)
		cy.get('#claimtype').select(ExpenseType,{force: true})
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type(ClaimAmount);
		
		cy.get('#fDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#toLocId').click({force: true})
		
		cy.get('#tDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#Remark').click({force: true})
		cy.get('#Remark').clear().type('Local Travel');
		
		//cy.get('#purpose').select('Hotel',{force: true})
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#txt_claimproof').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#fromLocId').click({force: true})
		cy.get('#fromLocId').clear().type('Mumbai');
		
		cy.get('#toLocId').click({force: true})
		cy.get('#toLocId').clear().type('Pune');
		
		cy.get('#btnAdd').click({force: true})
		cy.wait(2000)
		cy.get('#Remarks').click({force: true})
		cy.get('#Remarks').clear().type('Testing');
		
		cy.get('#VendorNameId').click({force: true})
		cy.get('#VendorNameId').clear().type('HDFC');
		
		cy.get('#InvoiceNumberId').click({force: true})
		//cy.get('#InvoiceNumberId').clear().type('HD010');
		
		//cy.get('#dynamicDropId').select('IT',{force: true})
		
		cy.get('#crtbtn').click({force: true})	

		})		
	})
		
	it('Verify Claim in Finance Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.FinanceLogin()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '500'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
		
	})
	
	it('Verify Claim Entry in My Claim Report', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '500'
		
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
	})
	
	it('4. Less Amount than No approval upto 500_Month Wise', function() {	
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '100'
		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)	
		// cy.get('#claimentry').click({force: true})
		 //cy.wait(10000)
		 cy.get('#btnOpenForm').click({force: true})
		 cy.wait(2000) 
		cy.get('#TransNoId').then($input => {
		 transcationID = $input.val()		 
		 cy.log('transcationID:'+transcationID)
		 
		 cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		
		cy.get('[onclick="Add()"]').click({force: true})
		cy.wait(2000)
		cy.get('#claimtype').select(ExpenseType,{force: true})
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type(ClaimAmount);
		
		cy.get('#fDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#toLocId').click({force: true})
		
		cy.get('#tDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})
		cy.get('#Remark').click({force: true})
		cy.get('#Remark').clear().type('Local Travel');
		
		//cy.get('#purpose').select('Hotel',{force: true})
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#txt_claimproof').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#fromLocId').click({force: true})
		cy.get('#fromLocId').clear().type('Mumbai');
		
		cy.get('#toLocId').click({force: true})
		cy.get('#toLocId').clear().type('Pune');
		
		cy.get('#btnAdd').click({force: true})
		cy.wait(2000)
		
		cy.get('#VendorNameId').click({force: true})
		cy.get('#VendorNameId').clear().type('HDFC');
		
		cy.get('#InvoiceNumberId').click({force: true})
		//cy.get('#InvoiceNumberId').clear().type('HD010');
		
		//cy.get('#dynamicDropId').select('IT',{force: true})
		
		cy.get('#Remarks').click({force: true})
		cy.get('#Remarks').clear().type('Testing');
		 cy.wait(2000)
		 
		cy.get('#crtbtn').click({force: true})	
		cy.wait(10000)
			cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)
			//cy.wait(2000)	
			cy.get('#EStableSorter> tbody > tr> td:nth-child(1)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(currentDate);				
		})
		
		cy.get('#EStableSorter> tbody > tr> td:nth-child(2)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(currentDate);				
		})
		
		cy.get('#EStableSorter> tbody > tr> td:nth-child(3)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq(ClaimAmount);				
		})
		
		cy.get('#EStableSorter> tbody > tr> td:nth-child(4)').eq(0).invoke('text').then((text) => {
			cy.log(text.trim())
			 softExpect(text.trim()).to.eq('Pending');				
		})
			})
		})
	})
		
	it('Approve Claim Entry at manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(9)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(10)>input').clear().type('Approve');
				cy.get('#btnsave').click({force: true})
				cy.wait(5000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})

	it('Verify Claim in Manager 1 Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '100'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
				
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains('Pending')
		

			}
			})
			})
		})		
	})	

	it('Approve Claim Entry at manager 2 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.Manager2Login()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(9)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(10)>input').clear().type('Approve');
				cy.get('#btnsave').click({force: true})
				cy.wait(5000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})
		
	it('Verify Claim in Manager 2 Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.Manager2Login()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '100'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID.trim() && transID.trim() == transcationID.trim())
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains('Approved')	
			}
			})
			})
		})	
	})


	it('Approve Claim Entry at Finance Login', function() {
		const { softAssert, softExpect } = chai;
		cy.FinanceLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		 cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(10)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			//EmpCode.trim() == employeeID &&
			if ( transID.trim() == transcationID)
			{
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)>input').click({force: true})
				cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(11)>input').clear().type('Approve');
				cy.get('#btnsave').click({force: true})
				//cy.wait(5000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
				//})
			}
			})
			})
			
		})
	})
	
	it('Verify Claim in Finance Report', function() {
		const { softAssert, softExpect } = chai;
		//cy.FinanceLogin()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '100'
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
		
	})
	
	it('Verify Claim Entry in My Claim Report', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		var ExpenseType = 'Hotel'
		var ClaimAmount = '100'
		
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(12)').invoke('text').then((transID) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("transID: "+transID)
			
			if (EmpCode.trim() == employeeID && transID.trim() == transcationID)
			{
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ExpenseType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
			}
			})
			})
		})	
	})
	
})
	