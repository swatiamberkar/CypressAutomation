

describe('BasicSetting 04_Employees Settings', function () {

	var filePath = 'Employee/CrossCompanyImport.xlsx'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	// it(' Set Cross Company Manager', () => {
	// 	cy.readFile('cypress/fixtures/Company.json').then((text) => {
	// 		text.forEach(function (entry) {
	// 			var company = entry.comapnayname

	// 			cy.readFile('cypress/fixtures/CrossCompany.json').then((text) => {
	// 				text.forEach(function (entry) {
	// 					var crossCompany = entry.comapnayname

	// 					cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=organization&submodule=CrossCompanyManager');
	// 					cy.get('#profileContentTitle .fa').click();
	// 					cy.get('#Namecomp').click();
	// 					cy.get('#Namecomp').click().type('Expense');

	// 					cy.get('.checkbox').find('label').each(function (row, i) {
	// 						cy.get('.checkbox >label').eq(i).invoke('text').then((text) => {

	// 							if (text.trim() == company.trim()) {
	// 								expect(text).to.eq(company.trim())
	// 								cy.get('.checkbox >input').eq(i).click({ force: true })

	// 							}

	// 							if (text.trim() == crossCompany.trim()) {
	// 								expect(text).to.eq(crossCompany.trim())
	// 								cy.get('.checkbox >input').eq(i).click({ force: true })

	// 							}
								
	// 						})
	// 					})
	// 					cy.get('#sbtBtn').click({ force: true })
	// 				})
	// 			})
	// 		})
	// 	})

	// })



	/*
		context('03_Approval Matrix Manager Import', function () {
	
			//var filePath = 'AapprovalMatrix.xlsx'
			var settingName = 'ForESS_Leave'
			var sheetName = 'ApprovalMatrix'
			var startingRow = '2'
			var endingRow = '7'
			var employeeCode = 'A'
			var leaderCode = 'B'
			var priority = 'C'
			var moduleName = 'D'
			var approvalMust = 'E'
			var approvalCancelRights = 'F'
			var ViewOnly = 'G'
	
			 it('Navigate to Approval Matrix Manager Import', function() {
	
					cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
					cy.wait(2000)
					cy.get('#ddlEmployeeImportNameList').select('Approval Matrix Manager Import',{force: true})
					cy.wait(2000)	
			})
	
	
				it('Save Setting for Approval Matrix Manager Import', function() {	
						const { softAssert, softExpect } = chai;
						cy.get('#categoryMasterAI').select('All',{force: true})
				cy.wait(2000)
	
				cy.wait(3000)
				cy.get('[onclick="showNewSettingAI()"]').click({force: true})
	
				cy.xpath("//input[@name='name']").click({force: true})
				cy.wait(2000)
	
				cy.wait(2000)
				cy.get('#SettingNameNewAI').click({force: true})
				cy.wait(2000)
				cy.get('#SettingNameNewAI').clear().type(settingName)
				cy.wait(1000)
				cy.xpath("//input[@name='name']").click({force: true})
				cy.wait(2000)
	
						cy.get('#StartingRowAI').click({force: true})
					cy.get('#StartingRowAI').clear().type(startingRow)
	
					cy.get('#EndingRowAI').click({force: true})
					cy.get('#EndingRowAI').clear().type(endingRow)
								 cy.wait(2000)
						// cy.get('#savesettingAmmendment').click({force: true})
	
						cy.fixture(filePath, 'binary')
						.then(Cypress.Blob.binaryStringToBlob)
						.then(fileContent => {
						cy.get('#fileAI').attachFile({
						fileContent,
						fileName: filePath,
						mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						encoding: 'utf8'
						})
						})
						cy.wait(2000)
	
						cy.get('#ExcelSheetNameAI').select(sheetName,{force: true})
						cy.get('#EmployeeCodeRowAI').select(employeeCode,{force: true})
						cy.get('#LeaderCode').select(leaderCode,{force: true})
						cy.get('#Priority').select(priority,{force: true})
						cy.get('#ModuleName').select(moduleName,{force: true})
						cy.get('#ApprovalMust').select(approvalMust,{force: true})
						cy.get('#AppCancelRights').select(approvalCancelRights,{force: true})
						cy.get('#ViewOnly').select(ViewOnly,{force: true})
	
						// cy.get('#checkOverWrite').click({force: true})
					cy.wait(2000)
					 cy.get('#savesettingAmmendment').click({force: true})
					 cy.wait(2000)
						 cy.get(".toast-message").invoke('text').then((text) => {
						 softExpect(text.trim()).to.eq('Setting Saved Successfully');
						 cy.wait(3000)
							cy.get(".toast-message").click({force: true})
						  })
				})
	
				it('Upload File of Employee Import', function() {	
						const { softAssert, softExpect } = chai;
							cy.wait(2000)
	
			cy.window().document().then(function (doc) {
				doc.addEventListener('click', () => {
					//setTimeout(function () { doc.location.reload() }, 5000)
				})
				cy.get('#uploadsetting').click()
			})
	
				
						 cy.wait(40000)
	
	
	
				})
	
			    
				it('Verify Imported  Module', function() {	
						const { softAssert, softExpect } = chai;
						cy.task('readXlsx', { file: 'cypress/fixtures/'+filePath, sheet: sheetName }).then((rows) => {
							var rowsLength = rows.length;
							cy.writeFile("cypress/fixtures/"+sheetName+".json", {rows})
						  }) 
	
						  cy.fixture(sheetName).then((excelData) => {
							excelData.rows.forEach((data, index) => {
	
						cy.navigate_EmployeeProfile(data.EmployeeCode)	
	
						cy.get('#approval_matrix_tab').click({force:true})
						cy.wait(5000)
						cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 1)
	
						cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
							softExpect(text.trim()).to.contain(data.LeaderCode.trim());
							cy.log("*"+data.LeaderCode+"*")
							cy.wait(2000) 
						})
	
						 cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
							 softExpect(text.trim()).to.contain(data.ModuleName);
							 cy.wait(2000) 
						 })
	
						})
					})
				})
			    
		})
	
	*/

		context('03_Approval Matrix Manager Import without import funcationality', function () {
	
			it('Assign Manager from Approval Matrix ', () => {
				//		cy.login()
				//cy.changeCompany();
				var sheetName = 'ApprovalMatrix'
	
				cy.task('readXlsx', { file: 'cypress/fixtures/' + filePath, sheet: sheetName }).then((rows) => {
					var rowsLength = rows.length;
					cy.writeFile('cypress/fixtures/' + sheetName + ".json", { rows })
				})
	
				cy.fixture(sheetName).then((excelData) => {
					excelData.rows.forEach((data, index) => {
						cy.navigate_EmployeeProfile(data.EmployeeCode)
	
						cy.wait(2000)
						cy.get('#approval_matrix_tab').click({ force: true })
						cy.wait(2000)
	
	
						if (data.Priority == 1) {
							cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
						}
						else {
							cy.get('#approvalComponentTitle > .row > .col-8 > [onclick=""] > .fas').click({ force: true })
							cy.wait(2000)
						}
	
						cy.get('#Priority').click({ force: true })
						cy.get('#Priority').clear().type(data.Priority)
	
						cy.wait(2000)
						cy.get('#select2-approvalManager-container').click({ force: true })
						cy.wait(2000)
						cy.get('input[type="search"]').click({ force: true })
						cy.get('input[type="search"]').type(data.LeaderCode)
						cy.wait(2000)
						cy.contains('li', '['+data.LeaderCode+']').click({ force: true })
						//cy.get('.select2-results__option--highlighted').click({ force: true })
						cy.wait(2000)
	
						if (data.ApprovalMust != '') {
							cy.get('#approvalmust').select('Yes')
						}
	
						if (data.ApprovedCancelRights != '') {
							cy.get('#cancelrights').select('Yes')
						}
	
						//cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
						cy.get('#' + data.ModuleName + '').click({ force: true })
						//cy.xpath("//label[contains(text(),'On Duty')]").click()
						cy.get('#btnSaveText').click()
						cy.wait(2000)
	
	
					})
				})
	
	
			})
	
	
		})
	

})	