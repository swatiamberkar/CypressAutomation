describe('Add Deduction_Formula_Admin&&Staff', function() {

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Payroll Salary components navigate', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({force: true})
		cy.wait(2000)
	})
	it('Add Deduction Formula for Staff', function() {
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})

		cy.xpath("//div[@id='partialFilter']//input[@id='radio16']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
	
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/DeductionFormula.json').then((text) =>{
        text.forEach(function(entry) {	
					 
		
		var field = entry.FieldName	
		cy.log('field '+ field)		
		cy.wait(500)	
		
		cy.get('.empDetail').each(function(row, i){			
		console.log(i)
		var num1 = parseFloat(i)
		cy.xpath("//a[@class='d-lg-flex justify-content-between empDetail']//h5").eq(num1).invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()==field){
		expect(text.trim()).to.eq(field)
		
		if(entry.Dirper!="")
		{
				var num  = num1
		cy.wait(1000)	
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num).click({force:true})
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force:true})		
		
		cy.wait(3000)
		cy.get('#Dirper').select(entry.Dirper, {force: true})
		cy.wait(1000)
		
		if(entry.Rounding!="")
		{
		cy.get('[name="Rounding"]').select(entry.Rounding, {force: true})
		}
		
		if(entry.Dirper=="Percentage")
		{	cy.get('#Formula').click({force: true})
			cy.get('#Formula').clear()
			cy.get('#Formula').type(entry.Formula)
			
			cy.get('#Percentage').click({force: true})
			cy.get('#Percentage').clear()
			cy.get('#Percentage').type(entry.Percent)
			
			cy.get('#Maximun').click({force: true})
			cy.get('#Maximun').clear()
			cy.get('#Maximun').type(entry.Maximum)
		}
			
		if(entry.Arrear!="")
		{
			cy.get('#drpArrear').select(entry.Arrear, {force:true})
		}
		
		if(entry.ESI_Eligibility!="")
		{
			cy.get('#EligibilityFormula').click({force: true})
			cy.get('#EligibilityFormula').clear()
			cy.get('#EligibilityFormula').type(entry.ESI_Eligibility)
		}
		
	
		cy.get('#btnForCreate').click({force:true})
		 cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(1000)
		cy.clearLocalStorage()
		
		//cy.wait(2000)
		
		}
			}	
			})				
		})	
	
		
		})
		
		})
		
	})
	
	it('Add Deduction Formula for Admin', function() {					 
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio16']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Admin',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/DeductionFormula.json').then((text) =>{
        text.forEach(function(entry) {	
					 
		
		var field = entry.FieldName	
		cy.log('field '+ field)		
		cy.wait(500)	
		
		cy.get('.empDetail').each(function(row, i){			
		console.log(i)
		var num1 = parseFloat(i)
		cy.xpath("//a[@class='d-lg-flex justify-content-between empDetail']//h5").eq(num1).invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()==field){
		expect(text.trim()).to.eq(field)
		
		if(entry.Dirper!="")
		{
				var num  = num1
		cy.wait(1000)	
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num).click({force:true})
		//cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click({force:true})
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force:true})		
		
		cy.wait(3000)
		cy.get('#Dirper').select(entry.Dirper, {force: true})
		cy.wait(1000)
		
		if(entry.Rounding!="")
		{
		cy.get('[name="Rounding"]').select(entry.Rounding, {force: true})
		}
		
		if(entry.Dirper=="Percentage")
		{	cy.get('#Formula').click({force: true})
			cy.get('#Formula').clear()
			cy.get('#Formula').type(entry.Formula)
			
			cy.get('#Percentage').click({force: true})
			cy.get('#Percentage').clear()
			cy.get('#Percentage').type(entry.Percent)
			
			cy.get('#Maximun').click({force: true})
			cy.get('#Maximun').clear()
			cy.get('#Maximun').type(entry.Maximum)
		}
			
		if(entry.Arrear!="")
		{
			cy.get('#drpArrear').select(entry.Arrear, {force:true})
		}
		
		if(entry.ESI_Eligibility!="")
		{
			cy.get('#EligibilityFormula').click({force: true})
			cy.get('#EligibilityFormula').clear()
			cy.get('#EligibilityFormula').type(entry.ESI_Eligibility)
		}
		
	
		cy.get('#btnForCreate').click({force:true})
		 cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(1000)
		cy.clearLocalStorage()
		
		//cy.wait(2000)
		
		}
			}	
			})				
		})	
	
		
		})
		
		})
		
	})
	
	it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})
	
	
})

