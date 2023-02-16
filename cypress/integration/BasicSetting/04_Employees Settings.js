

describe('03_Employees Settings', function () {

	var filePath = 'Employee/EmployeeImportAll.xlsx'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})
    
	it(' Set generate password settings for all employee', () => {
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=GeneratePassword')
		cy.xpath("//label[contains(text(),'Category')]").click()
		cy.wait(2000)
		cy.get('#OverWriteRad').click({ force: true })
		cy.wait(2000)
		cy.get('[name="PayslipPassword"]').eq(2).click({ force: true })
		cy.wait(2000)
		cy.get('#savesetting').click()
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).contains('Generate Password will get processed in background.')
			cy.wait(2000)
		})
		cy.wait(10000)
	})   
            
	context('03_SelfService Role', function () {

		var filePath = 'Employee/EmployeeImportAll.xlsx'
		var sheetName = 'SelfServiceRole'
		var Category = 'Staff'
		var settingName = 'Leave'

		var startingRow = '2'
		var endingRow = '11'


		it('Navigate to SelfService Role Import', function () {

			cy.visit(Cypress.env('url') + 'Employee/Employee/EmployeeImport?import=1')
			cy.wait(2000)
			cy.get('#ddlEmployeeImportNameList').select('SelfService Role Import', { force: true })
			cy.wait(2000)
		})
        
		it('Save Setting for SelfService Role', function () {
			cy.server()
			cy.wait(1000)

			cy.route('POST', Cypress.env('url') + 'Employee/Employee/SaveEmployeeImport').as('SelfServiceRole')

			cy.wait(2000)
			cy.get('#savesetting').click({ force: true })

			//setting name validation
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Please Select Setting') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.get('[onclick="showNewSetting()"]').click({ force: true })

					cy.wait(2000)
					cy.get('#SettingNameNew').click({ force: true })
					cy.get('#SettingNameNew').clear()
					cy.get('#SettingNameNew').type(settingName)
				}
			})


			cy.wait(1000)
			cy.get('[onclick="addNewSetting()"]').click({ force: true })


			//start && end row  validation
			cy.get('#savesetting').click({ force: true })
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Select Start And End Row') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.wait(1000)

					cy.get('#StartingRow').click({ force: true })
					cy.get('#StartingRow').clear()
					cy.get('#StartingRow').type(startingRow)

					cy.get('#EndingRow').click({ force: true })
					cy.get('#EndingRow').clear()
					cy.get('#EndingRow').type(endingRow)
				}
			})


			//Emp code validation
			cy.wait(1000)
			cy.get('#savesetting').click({ force: true })
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Select Employee Code Column') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.wait(1000)
					cy.get('#EmployeeCodeRow').select('A', { force: true })

				}
			})


			cy.wait(2000)
			//Component validation
			cy.get('#savesetting').click({ force: true })
			cy.wait(1000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Select Component Value') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.wait(1000)
					cy.get('#SelfServiceRole').select('B', { force: true })
				}
			})


			cy.wait(1000)
			cy.get('#savesetting').click({ force: true })
			cy.wait('@SelfServiceRole').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Setting Saved Successfully')
				cy.get(".toast-message").eq(0).click({ force: true })

			})

		})
          
		it('Upload SelfService Role excel file', function () {

			//cy.get('#SettingName').select(settingName, { force: true })

			cy.wait(1000)
			cy.fixture(filePath, 'binary')
				.then(Cypress.Blob.binaryStringToBlob)
				.then(fileContent => {
					cy.get('#file').attachFile({
						fileContent,
						fileName: filePath,
						mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						encoding: 'utf8'
					})
				})

			cy.wait(2000)
			cy.get('#ExcelSheetName').select(sheetName, { force: true })
			cy.wait(1000)
			cy.window().document().then(function (doc) {
				doc.addEventListener('click', () => {
					//setTimeout(function () { doc.location.reload() }, 5000)
				})
				cy.get('#uploadsetting').click()
			})

			//cy.get('#uploadsetting').click({ force: true })
			// cy.wait(10000)

			// cy.get(".alert-success").invoke('text').then((text) => {
			// 	cy.log(text.trim())
			// 	expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			// 	//cy.get(".toast-message").click()
			// })


			 cy.wait(30000)

		})
	})


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
					cy.get('#fileAI').upload({
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