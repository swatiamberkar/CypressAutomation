describe('Add Earnings_Formula_Staff', function () {

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Payroll Salary components navigate', function () {


		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#payroll_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click()
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({ force: true })
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click()
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({ force: true })
		cy.wait(2000)
	})

	it('Add Earning Formula for Staff', function () {

		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({ force: true })

		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({ force: true })
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff', { force: true })
		cy.get('#btnFilterEarningDeduction').click({ force: true })
		cy.wait(2000)


		cy.readFile('/cypress/fixtures/EarningFormula.json').then((text) => {
			text.forEach(function (entry) {


				var field = entry.FieldName
				cy.log('field ' + field)
				cy.wait(500)

				cy.get('.empDetail').each(function (row, i) {
					cy.log(i)
					var num1 = parseFloat(i)
					//cy.get('.qcont').eq(num1).invoke('text').then((text) => {
					cy.get("span[id^='FieldName']").eq(num1).invoke('text').then((text) => {

						cy.log('FieldCode: ' + text.trim())

						//cy.wait(2000)
						//expect(true).to.eq(true)

						if (text.trim() == field) {
							expect(text.trim()).to.eq(field)

							if (entry.Dirper != "") {
								var num = num1 + 1
								cy.wait(500)
								cy.xpath("//div[@id='partialPlaceHolder']/div[" + num + "]//a[@id='dLabel1']").click({ force: true })
								cy.wait(1500)
								cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({ force: true })

								cy.wait(8000)
								cy.get('#Dirper').select(entry.Dirper, { force: true })
								cy.wait(3000)

								if (entry.Rounding != "") {
									cy.get('[name="Rounding"]').select(entry.Rounding, { force: true })
								}

								if (entry.Dirper == "Percentage") {
									cy.get('#Formula').click({ force: true })
									cy.get('#Formula').clear()
									cy.get('#Formula').type(entry.Formula)

									cy.get('#Percentage').click({ force: true })
									cy.get('#Percentage').clear()
									cy.get('#Percentage').type(entry.Percent)

									cy.get('#Maximun').click({ force: true })
									cy.get('#Maximun').clear()
									cy.get('#Maximun').type(entry.Maximum)
								}

								if (entry.Arrear != "") {
									cy.get('#drpArrear').select(entry.Arrear, { force: true })
								}
								cy.wait(1000)
								//cy.server()
								//cy.route('POST', 'Payroll/*').as('getComment')

								cy.get('#btnForCreate').click({ force: true })

								cy.wait(5000)

								//cy.get(".toast-message").invoke('text').then((text) => {
								//	cy.log(text.trim())
								//	expect(text.trim()).equal('Formula Saved Successfully')				
								//})
								cy.reload()
								cy.wait(3000)
								cy.get('#payroll_detail_tab').click({ force: true })
								cy.wait(1000)
								cy.get('#Payroll_SalaryStructure').click({ force: true })
								cy.wait(1000)
								cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({ force: true })

								cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({ force: true })
								cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff', { force: true })
								cy.get('#btnFilterEarningDeduction').click({ force: true })
								cy.wait(500)

								cy.get("p[title^='Field Type : '] > span").eq(num1).invoke('text').then((text) => {

									cy.log('FieldType: ' + text.trim())
									expect(text.trim()).equal(entry.Dirper)
								})

							}
						}
					})
				})


			})

		})

	})
	
})
