
describe('Expense Manager Approval', function() {
	
	const Day = Cypress.moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Day2 = parseInt(Day)-1
	const Month = Cypress.moment().format('MM')
	const year = Cypress.moment().format('YYYY')
	const yasterdayDate = Day2+'/'+Month+'/'+year
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	var transcationID = ''
	var companyCode = ''
	var employeeID ='GT15'
	var managerID = 'GT02'
	var managerID2 = 'GT03'
	var financeID = 'GT05'
	var filePath= 'demo.xlsx'
	
	let months =
		[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];	
		
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
	
	it('Add Claim Entry', function() {	
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
	
	it('Add Claim Entry', function() {	
		const { softAssert, softExpect } = chai;
		//cy.EmployeeLogin()
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
	
	it('Add Claim Entry', function() {	
		const { softAssert, softExpect } = chai;
		//cy.EmployeeLogin()
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
	
	it('Add Claim Entry', function() {	
		const { softAssert, softExpect } = chai;
		//cy.EmployeeLogin()
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

	
	it('Navigate Manager approval Page', function() {
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)
	})
	
	it('Verify Validation Massges - Select Month First', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#Search').click({force: true})
	
		 cy.get(".noty_body").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Month First');
		 cy.wait(500)
			cy.get(".noty_body").click({force: true})
		  })	  		  
	})

	it('Verify Records according Months', function() {
		const { softAssert, softExpect } = chai;
		 for(let i=0; i< months.length; i++){
			cy.get('#month').select(months[i],{force: true})
			cy.wait(1000)
			cy.get('#Search').click({force: true})
			cy.wait(3000)
			cy.get('body').then(($body) => {
 
			if ($body.find('#EStableSorter > tbody > tr').length > 0) {
    

  
			//if(cy.get('#EStableSorter').length > 0){
				if(months[i]=='January'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/01/')
					})
				}
				else if(months[i]=='February'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/02/')
					})
				}
				else if(months[i]=='March'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/03/')
					})
				}
				else if(months[i]=='April'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/04/')
					})
				}
				else if(months[i]=='May'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/05/')
					})
				}
				else if(months[i]=='June'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/06/')
					})
				}
				else if(months[i]=='July'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/07/')
					})
				}
				else if(months[i]=='August'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/08/')
					})
				}
				else if(months[i]=='September'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/08/')
					})
				}
				else if(months[i]=='October'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/08/')
					})
				}
				else if(months[i]=='November'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/08/')
					})
				}
				else if(months[i]=='December'){
					cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
					var num = parseFloat(i+1)	
					cy.get('#EStableSorter>tbody>tr:nth-child('+num+')>:nth-child(6)').contains('/12/')
					})
				}			
			}
			else
			{
				cy.get(".alert-warning").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq('No Records Found.');
				})	
			}
			})
		 }
			
	})
		
	it('Approve Claim Entry through Details Popup', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
				 
		cy.get('#EStableSorter > tbody > tr:nth-child(1)>td:nth-child(13)>button').click({force: true})
		cy.xpath('//tbody/tr[1]/td[13]/input[1]').clear().type('Approve through Details Popup');
		cy.get('#notes').clear().type('Approve from Manager');
		cy.get('#accept').click({force: true})
		//cy.wait(5000)
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq("Expense save successfully.");
			cy.wait(500)
			cy.get(".noty_body").click({force: true})
		})
		
			
		
	})

	it('Reject Claim Entry through Details Popup', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)	
				 
		cy.get('#EStableSorter > tbody > tr:nth-child(1)>td:nth-child(13)>button').click({force: true})
		cy.get('#rdoRowReject').click({force: true})
		cy.xpath('//tbody/tr[1]/td[13]/input[1]').clear().type('Reject through Details Popup');
		cy.get('#notes').clear().type('Reject from Manager');
		cy.get('#accept').click({force: true})
		//cy.wait(5000)
		cy.get(".noty_body").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq("Expense save successfully.");
			cy.wait(500)
			cy.get(".noty_body").click({force: true})
		})
		
			
		
	})

	it('Approve all Claim Entry ', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)	
		cy.get('#allAccept').click({force: true})
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			
		cy.get('#EStableSorter > tbody > tr >td:nth-child(10)>input').eq(i).clear().type('Approved');
		})
		cy.get('#btnsave').click({force: true})
				cy.wait(7000)
				//cy.get(".noty_body").invoke('text').then((text) => {
				//softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				//cy.wait(500)
				//cy.get(".noty_body").click({force: true})
				//cy.wait(2000)
		//})
		
	})

	it('Add Claim Entry', function() {	
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
	
	it('Add Claim Entry', function() {	
		const { softAssert, softExpect } = chai;
		//cy.EmployeeLogin()
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
	
	it('Reject all Claim Entry ', function() {
		const { softAssert, softExpect } = chai;
		cy.ManagerLogin()		
		cy.visit(Cypress.env('url')+'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)
		cy.get('#allReject').click({force: true})
		cy.get('#EStableSorter > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)				
		cy.get('#EStableSorter > tbody > tr >td:nth-child(10)>input').eq(i).clear().type('Rejceted');
		})
		cy.get('#btnsave').click({force: true})
			//	cy.wait(5000)
				cy.get(".noty_body").invoke('text').then((text) => {
				softExpect(text.trim()).to.eq("Records Saved Successfully.!");
				cy.wait(500)
				cy.get(".noty_body").click({force: true})
				cy.wait(2000)
		})
		
	})

	
})
	