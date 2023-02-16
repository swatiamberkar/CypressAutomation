
describe('Claim Entry', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	var businessUnit = 'Category'
	var businessValue = 'Staff'
	var expenseType = 'Local'
	
	var companyCode = ''
	var employeeID ='GT14'
	var managerID = 'GT02'
	var managerID2 = 'GT03'
	var financeID = 'GT05'
	var filePath= 'demo.xlsx'
	var mode = 'Train'
	var Purpose = 'Meeting'
	
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
		var transcationID='T008'
		var manager1Remark = 'Approve'
		var financeRemark = 'Approve at Finance'
		
	

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
		
	it('Add Expense Type', function() {
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseType')		
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
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Profile&submodule=BulletinNews')
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
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpenseMode')		
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
		cy.visit(Cypress.env('cloudUrl')+'Settings/Employee/ESSIndex?module=Expense&submodule=ExpensePurpose')		
		cy.wait(2000)
		cy.xpath("//div[@id='ExpenseEssContentTitle']//a").click({force: true})
		
		cy.get('#txtValue').click({force: true})
		cy.get('#txtValue').clear().type(Purpose)
		
		 cy.get('#btnSubmit').click({force: true})
	})
	



	it('Login into Pocket ESS', function() {
		cy.EmployeeLogin()
	})
	
	it('Navigate to Claim Entry', function() {	
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)	
		// cy.get('#claimentry').click({force: true})
		 //cy.wait(10000)
		 cy.get('#btnOpenForm').click({force: true})
		 cy.wait(2000) 
	})
	
	it('Verify Validation Massges - Select Expense Date !!', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#crtbtn').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Expense Date !!');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})

	it('Verify Validation Massges - Date of Claim can not be greater than todays date.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(tomorrowDate)
		})
		cy.get('#crtbtn').click({force: true})
		 	
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Date of Claim can not be greater than todays date.');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Please Add at least one Expense.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
		})		
		cy.get('#crtbtn').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Add at least one Expense.');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Select Expense Type.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('[onclick="Add()"]').click({force: true})
		cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Expense Type.');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Enter expense amount.', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#claimtype').select('Local')
		cy.get('#claimtype').select('Local',{force: true})
		cy.get('#claimtype').select('Local')
		cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter expense amount.');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Minus not allowed.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type('-');
		
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Minus not allowed.');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Please Enter Remark.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type('1000');
		cy.get('#btnAdd').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Remark.');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify Validation Massges - Please Enter Remark.', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#Remark').click({force: true})
		cy.get('#Remark').clear().type('Local Travel');
		cy.get('#btnAdd').click({force: true})
		 cy.wait(2000)
		cy.get('#crtbtn').click({force: true})
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Enter Remark.');
		cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})
	
	it('Verify mandatory fields', function() {	
		const { softAssert, softExpect } = chai;
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
			 softExpect(text.trim()).to.eq('1000');				
		})
		})
			
			
	})
	
	it('Verify Cancel Functionality', function() {
	const { softAssert, softExpect } = chai;
	cy.EmployeeLogin()
	cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)	
		cy.get('#EStableSorter> tbody > tr> td:nth-child(6)>[title="Cancel"]').eq(0).click({force: true})
		cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Expense Entry Cancelled Successfully.');
			cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })
	})

	it('Add Claim Entry with all fields', function() {	
		const { softAssert, softExpect } = chai;
		
		 cy.get('#btnOpenForm').click({force: true})
		 cy.wait(2000) 
		 
		cy.get('#TransNoId').then($input => {
		 transcationID = $input.val()		 
		 cy.log('transcationID:'+transcationID)
		 
	 cy.get('#claimdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(ClaimDate)
		})
		cy.get('[onclick="Add()"]').click({force: true})
		cy.wait(2000)
		cy.get('#claimtype').select(ClaimType)
		cy.get('#claimtype').select(ClaimType,{force: true})
		cy.get('#claimtype').select(ClaimType)
		cy.get('#claimAmt').click({force: true})
		cy.get('#claimAmt').clear().type(ClaimAmount);
		
		cy.get('#fDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(FromDate)
		})
		cy.get('#toLocId').click({force: true})
		
		cy.get('#tDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(ToDate)
		})
		cy.get('#Remark').click({force: true})
		cy.get('#Remark').clear().type(Remark);
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
		cy.get('#fromLocId').clear().type(FromLocation);
		
		cy.get('#toLocId').click({force: true})
		cy.get('#toLocId').clear().type(ToLocation);
		
		cy.get('#btnAdd').click({force: true})
		cy.wait(2000)
		cy.get('#Remarks').click({force: true})
		cy.get('#Remarks').clear().type(Remark1);
		
		cy.get('#VendorNameId').click({force: true})
		cy.get('#VendorNameId').clear().type(VendorName);
		
		cy.get('#InvoiceNumberId').click({force: true})
		cy.get('#InvoiceNumberId').clear().type(InvoiceNumberId);
		
		//cy.get('#dynamicDropId').select('IT',{force: true})
		
		cy.get('#crtbtn').click({force: true})	
		cy.wait(15000)
		
	
	cy.get('#EStableSorter> tbody > tr> td:nth-child(1)').eq(0).contains(currentDate)
	cy.get('#EStableSorter> tbody > tr> td:nth-child(2)').eq(0).contains(currentDate)
	cy.get('#EStableSorter> tbody > tr> td:nth-child(3)').eq(0).contains(ClaimAmount)
	cy.get('#EStableSorter> tbody > tr> td:nth-child(4)').eq(0).contains('Pending')
	cy.get('#EStableSorter> tbody > tr> td:nth-child(5)').eq(0).contains(transcationID)
	
	cy.get('#EStableSorter> tbody > tr> td:nth-child(6)>[title="Details"]').eq(0).click({force: true})
	
	cy.get('.table-mc-light-blue tr> td:nth-child(1)').eq(0).contains(transcationID)
	cy.get('.table-mc-light-blue tr> td:nth-child(2)').eq(0).contains(VendorName)
	cy.get('.table-mc-light-blue tr> td:nth-child(3)').eq(0).contains(InvoiceNumberId)
	
		})	
	})
	
	it('Verify Notification at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Expense Entry Submitted');	
			  softExpect(Note.trim()).to.contains(employeeID);	
			
			})
		})
		
	})	

	it('Approve Claim Entry at Manager 1 Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		cy.get('#EStableSorter> tbody > tr> td:nth-child(3)').eq(0).contains(employeeID)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(5)').eq(0).contains(currentDate)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(6)').eq(0).contains(currentDate)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(7)').eq(0).contains(ClaimAmount)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(8) > input').eq(0).should('have.value', ClaimAmount)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(9)').eq(0).contains(transcationID)
	
		cy.get('#EStableSorter> tbody > tr> td:nth-child(13)>button').eq(0).click({force: true})
		
		cy.get('#code').contains(employeeID)
		cy.get('#tblDetails> tbody > tr> td:nth-child(3)').eq(0).contains(ClaimType)
		cy.get('#tblDetails> tbody > tr> td:nth-child(4)').eq(0).contains(currentDate+' - '+currentDate)
		cy.get('#tblDetails> tbody > tr> td:nth-child(7)').eq(0).contains(ClaimAmount)
		cy.get('#tblDetails> tbody > tr> td:nth-child(8) > input').eq(0).should('have.value', ClaimAmount)
		cy.get('#tblDetails> tbody > tr> td:nth-child(10)').eq(0).contains(Remark)
		cy.get('#tblDetails> tbody > tr> td:nth-child(11)').eq(0).contains(FromLocation)
		cy.get('#tblDetails> tbody > tr> td:nth-child(12)').eq(0).contains(ToLocation)
		
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[1]").contains(transcationID)
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[2]").eq(0).contains(VendorName)
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[3]").eq(0).contains(InvoiceNumberId)
		cy.get('[class="text-center"] >button:nth-child(2)').click({force: true})
		
		cy.get('#EStableSorter > tbody > tr >td:nth-child(11)>input').eq(0).click({force: true})
		cy.get('#EStableSorter > tbody > tr >td:nth-child(10)>input').eq(0).clear().type(manager1Remark);
		cy.get('#btnsave').click({force: true})
				//cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})
	})

	it('Verify Claim Entry in Manager 1 Report', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()
		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((AppliedDate) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+AppliedDate)
			
			if (EmpCode.trim() == employeeID && AppliedDate.trim() == currentDate)
			{
				
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ClaimType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains('Pending')
		cy.get('#EStableSorter>tbody>tr >:nth-child(12)').eq(num-1).contains(transcationID)
		
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(13)>button').click({force: true})
		
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(1)').should('have.text', managerID)
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(3)').should('have.text', '1')
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(4)').should('have.text', manager1Remark)
			
			cy.xpath("//div[@id='apprej']//div[@class='modal-footer']/button").click({force: true})
			
			cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(14)>button').click({force: true})
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[1]").should('have.text', employeeID)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[1]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[1]").should('have.text', currentDate)
			//cy.xpath("//div[@id='claimdata']//tr[4]/td[1]").should('have.text', purpose)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[1]").should('have.text', transcationID)
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[2]").should('have.text', ClaimType)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[2]").should('have.text', ClaimAmount)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[2]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[4]/td[2]").should('have.text', Remark)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[2]").should('have.text', VendorName)
			
			cy.xpath("//div[@id='claimdata']//tr[2]/td[3]").should('have.text', ClaimAmount)
			cy.get('#claimdata>div>table>tbody>tr:nth-child(4)>td:nth-child(6)').contains('Pending')
			cy.xpath("//div[@id='claimdata']//tr[5]/td[3]").should('have.text', InvoiceNumberId)
			
			
		
			}
			})
			})
		})
			
	})
	
	it('Verify Notification at Manager 2 Login', function() {
		const { softAssert, softExpect } = chai;
		cy.Manager2Login()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Expense Entry Submitted');	
			  softExpect(Note.trim()).to.contains(employeeID);	
			
			})
		})
		
	})	
	
	it('Approve Claim Entry at Manager 2 Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.Manager2Login()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		cy.get('#EStableSorter> tbody > tr> td:nth-child(3)').eq(0).contains(employeeID)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(5)').eq(0).contains(currentDate)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(6)').eq(0).contains(currentDate)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(7)').eq(0).contains(ClaimAmount)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(8) > input').eq(0).should('have.value', ClaimAmount)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(9)').eq(0).contains(transcationID)
	
		cy.get('#EStableSorter> tbody > tr> td:nth-child(13)>button').eq(0).click({force: true})
		
		cy.get('#code').contains(employeeID)
		cy.get('#tblDetails> tbody > tr> td:nth-child(3)').eq(0).contains(ClaimType)
		cy.get('#tblDetails> tbody > tr> td:nth-child(4)').eq(0).contains(currentDate+' - '+currentDate)
		cy.get('#tblDetails> tbody > tr> td:nth-child(7)').eq(0).contains(ClaimAmount)
		cy.get('#tblDetails> tbody > tr> td:nth-child(8) > input').eq(0).should('have.value', ClaimAmount)
		cy.get('#tblDetails> tbody > tr> td:nth-child(10)').eq(0).contains(Remark)
		cy.get('#tblDetails> tbody > tr> td:nth-child(11)').eq(0).contains(FromLocation)
		cy.get('#tblDetails> tbody > tr> td:nth-child(12)').eq(0).contains(ToLocation)
		
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[1]").contains(transcationID)
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[2]").eq(0).contains(VendorName)
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[3]").eq(0).contains(InvoiceNumberId)
		cy.get('[class="text-center"] >button:nth-child(2)').click({force: true})
		
		cy.get('#EStableSorter > tbody > tr >td:nth-child(11)>input').eq(0).click({force: true})
		cy.get('#EStableSorter > tbody > tr >td:nth-child(10)>input').eq(0).clear().type(manager1Remark);
		cy.get('#btnsave').click({force: true})
				
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				cy.wait(2000)
				})
	})

	it('Verify Claim Entry in Manager 2 Report', function() {
		const { softAssert, softExpect } = chai;
		cy.Manager2Login()
		
		cy.visit(Cypress.env('url')+'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((AppliedDate) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+AppliedDate)
			
			if (EmpCode.trim() == employeeID && AppliedDate.trim() == currentDate)
			{
				
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ClaimType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains('Approved')
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(12)').contains(transcationID)
		
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(13)>button').click({force: true})
		
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(1)').should('have.text', managerID)
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(3)').should('have.text', '1')
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(4)').should('have.text', manager1Remark)
			
			cy.xpath("//div[@id='apprej']//div[@class='modal-footer']/button").click({force: true})
			
			cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(14)>button').click({force: true})
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[1]").should('have.text', employeeID)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[1]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[1]").should('have.text', currentDate)
			//cy.xpath("//div[@id='claimdata']//tr[4]/td[1]").should('have.text', purpose)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[1]").should('have.text', transcationID)
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[2]").should('have.text', ClaimType)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[2]").should('have.text', ClaimAmount)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[2]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[4]/td[2]").should('have.text', Remark)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[2]").should('have.text', VendorName)
			
			cy.xpath("//div[@id='claimdata']//tr[2]/td[3]").should('have.text', ClaimAmount)
			cy.get('#claimdata>div>table>tbody>tr:nth-child(4)>td:nth-child(6)').contains('Approved')
			cy.xpath("//div[@id='claimdata']//tr[5]/td[3]").should('have.text', InvoiceNumberId)
			
			
		
			}
			})
			})
		})
			
	})
	
	it('Verify Notification at Finance Login', function() {
		const { softAssert, softExpect } = chai;
		cy.FinanceLogin()
		cy.get('[onclick="clearNotification()"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('.feeds-body >h4').eq(0).invoke('text').then((title) => {
			cy.get('.feeds-body >small').eq(0).invoke('text').then((Note) => {	
			cy.log("title: "+title)
			cy.log("Note: "+Note)
			 softExpect(title.trim()).to.contains('Expense Entry Submitted');	
			  softExpect(Note.trim()).to.contains(managerID2);	
			
			})
		})
		
	})	

	it('Approve Claim Entry at Finance Login', function() {
		const { softAssert, softExpect } = chai;
		//cy.FinanceLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)	
		// cy.get('#ManagerApprovalDetail').eq(0).click({force: true})
		 //cy.wait(5000) 
		 
		//cy.get('#EStableSorter> tbody > tr> td:nth-child(3)').eq(0).contains(employeeID)
		//cy.get('#EStableSorter> tbody > tr> td:nth-child(4)').eq(0).contains('Expense 2')
		cy.get('#EStableSorter> tbody > tr> td:nth-child(5)').eq(0).contains(currentDate)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(6)').eq(0).contains(currentDate)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(7)').eq(0).contains(ClaimAmount)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(8)').eq(0).contains(ClaimAmount)
		cy.get('#EStableSorter> tbody > tr> td:nth-child(9)').eq(0).contains('Approved')
		cy.get('#EStableSorter> tbody > tr> td:nth-child(10)').eq(0).contains(transcationID)
	
		cy.get('#EStableSorter> tbody > tr> td:nth-child(14)>button').eq(0).click({force: true})
		
		cy.get('#code').contains(employeeID)
		
		cy.get('#tblDetails> tbody > tr> td:nth-child(3)').eq(0).contains(ClaimType)
		cy.get('#tblDetails> tbody > tr> td:nth-child(4)').eq(0).contains(currentDate+' - '+currentDate)
		cy.get('#tblDetails> tbody > tr> td:nth-child(7)').eq(0).contains(ClaimAmount)
		cy.get('#tblDetails> tbody > tr> td:nth-child(8)').eq(0).contains(ClaimAmount)
		cy.get('#tblDetails> tbody > tr> td:nth-child(10)').eq(0).contains(Remark)
		cy.get('#tblDetails> tbody > tr> td:nth-child(12)').eq(0).contains(FromLocation)
		cy.get('#tblDetails> tbody > tr> td:nth-child(13)').eq(0).contains(ToLocation)
		
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[1]").contains(transcationID)
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[2]").eq(0).contains(VendorName)
		cy.xpath("//div[@id='claimdata']//div[2]/table/tbody/tr/td[3]").eq(0).contains(InvoiceNumberId)
		cy.get("[class='modal-footer']>div>button:nth-child(4)").click({force: true})
		
		cy.get('#EStableSorter > tbody > tr >td:nth-child(12)>input').eq(0).click({force: true})
		cy.get('#EStableSorter > tbody > tr >td:nth-child(11)>input').eq(0).clear().type(financeRemark);
		cy.get('#btnsave').click({force: true})
			
	})
	
	it('Verify Claim Entry in Finance Report', function() {
		const { softAssert, softExpect } = chai;
		cy.FinanceLogin()
	
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((AppliedDate) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+AppliedDate)
			
			if (EmpCode.trim() == employeeID && AppliedDate.trim() == currentDate)
			{
				
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ClaimType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(12)').contains(transcationID)
		
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(13)>button').click({force: true})
		
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(1)').should('have.text', managerID)
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(3)').should('have.text', '1')
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(4)').should('have.text', manager1Remark)
			
			cy.get('#MngrComments>tr:nth-child(2)>:nth-child(1)').should('have.text', managerID2)
			cy.get('#MngrComments>tr:nth-child(2)>:nth-child(3)').should('have.text', '2')
			cy.get('#MngrComments>tr:nth-child(2)>:nth-child(4)').should('have.text', manager1Remark)
			
			cy.xpath("//div[@id='remarkModal']//div[@class='modal-footer']/button").click({force: true})
			
			cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(14)>button').click({force: true})
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[1]").should('have.text', employeeID)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[1]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[1]").should('have.text', currentDate)
			//cy.xpath("//div[@id='claimdata']//tr[4]/td[1]").should('have.text', purpose)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[1]").should('have.text', transcationID)
			cy.xpath("//div[@id='claimdata']//tr[6]/td[1]").contains(financeRemark)
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[2]").should('have.text', ClaimType)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[2]").should('have.text', ClaimAmount)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[2]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[4]/td[2]").should('have.text', Remark)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[2]").should('have.text', VendorName)
			
			cy.xpath("//div[@id='claimdata']//tr[2]/td[3]").should('have.text', ClaimAmount)
			cy.get('#claimdata>div>table>tbody>tr:nth-child(4)>td:nth-child(6)').contains('FinanceApproved')
			cy.xpath("//div[@id='claimdata']//tr[5]/td[3]").should('have.text', InvoiceNumberId)
			
			}
			})
			})
		})
	})
	
	it('Verify Claim Entry in My Claim Report', function() {
		const { softAssert, softExpect } = chai;
		cy.EmployeeLogin()
		
		
		cy.visit(Cypress.env('url')+'Expense/Reports/FinanceReport?Menu=financereport')
		cy.wait(5000)
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			cy.log("len: "+len)
			cy.log("num: "+num)
			cy.wait(2000)	
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#EStableSorter > tbody > tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((AppliedDate) => {	
			cy.log("EmpCode: "+EmpCode)
			cy.log("AppliedDate: "+AppliedDate)
			
			if (EmpCode.trim() == employeeID.trim() && AppliedDate.trim() == currentDate.trim())
			{
				
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(3)').should('have.text', employeeID)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(5)').should('have.text', ClaimType)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(7)').should('have.text', currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(8)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(9)').contains(ClaimAmount)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(10)').contains(currentDate)
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(12)').contains(transcationID)
		
		cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(13)>button').click({force: true})
		
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(1)').should('have.text', managerID)
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(3)').should('have.text', '1')
			cy.get('#MngrComments>tr:nth-child(1)>:nth-child(4)').should('have.text', manager1Remark)
			
			cy.get('#MngrComments>tr:nth-child(2)>:nth-child(1)').should('have.text', managerID2)
			cy.get('#MngrComments>tr:nth-child(2)>:nth-child(3)').should('have.text', '2')
			cy.get('#MngrComments>tr:nth-child(2)>:nth-child(4)').should('have.text', manager1Remark)
			
			cy.xpath("//div[@id='remarkModal']//div[@class='modal-footer']/button").click({force: true})
			
			cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(14)>button').click({force: true})
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[1]").should('have.text', employeeID)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[1]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[1]").should('have.text', currentDate)
			//cy.xpath("//div[@id='claimdata']//tr[4]/td[1]").should('have.text', purpose)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[1]").should('have.text', transcationID)
			cy.xpath("//div[@id='claimdata']//tr[6]/td[1]").contains(financeRemark)
			
			cy.xpath("//div[@id='claimdata']//tr[1]/td[2]").should('have.text', ClaimType)
			cy.xpath("//div[@id='claimdata']//tr[2]/td[2]").should('have.text', ClaimAmount)
			cy.xpath("//div[@id='claimdata']//tr[3]/td[2]").should('have.text', currentDate)
			cy.xpath("//div[@id='claimdata']//tr[4]/td[2]").should('have.text', Remark)
			cy.xpath("//div[@id='claimdata']//tr[5]/td[2]").should('have.text', VendorName)
			
			cy.xpath("//div[@id='claimdata']//tr[2]/td[3]").should('have.text', ClaimAmount)
			cy.get('#claimdata>div>table>tbody>tr:nth-child(4)>td:nth-child(6)').contains('FinanceApproved')
			cy.xpath("//div[@id='claimdata']//tr[5]/td[3]").should('have.text', InvoiceNumberId)
			
			}
			})
			})
		})
	})
	
})
	