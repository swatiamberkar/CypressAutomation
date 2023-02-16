class Cloud {

    verifyNotication(message) {
        cy.get(".toast-message").invoke('text').should('eq', message)
        cy.get(".toast-message").click({ force: true })
    }

    selectEmployee(employeeId) {
        cy.get('#select2-approvalManager-container').click({ force: true })
        cy.get('input[type="search"]').click({ force: true }).type(employeeId)
        cy.get('.select2-results__option--highlighted').click({ force: true })
    }

    verifyPageTitle(title) {
        cy.get('.card-header').invoke('text').should('contain', title)
    }

    rollAllocation(module, role) {
        cy.visit(Cypress.env('url') + 'Settings/Employee/ESSIndex?module=Profile&submodule=RoleAllocation')
        cy.wait(2000)
        cy.get('#drpModule').select(module)
        cy.wait(1000)
        cy.get('#drpRole').select(role)
        cy.wait(1000)
        cy.xpath("//button[contains(text(),'Search')]").click()
        cy.wait(1000)
        cy.get('[class="chk menu"]').each(function (row, i) {
            cy.get('[class="chk menu"]').eq(i).click({ force: true })
        })
        //click on save button
        cy.get('#savedata').click()
        //verify success message
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Setting Save successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)
    }

    addEmployee(){
        cy.fixture('Employee').then((data) => {
cy.server()
		  cy.visit(Cypress.env('url')+'Employee/Employee/EmptyEmployeeList')
		  //cy.wait(2000)
			  cy.get('.mb-1').find('i').then(listing => {
				  var len = Cypress.$(listing).length;	
				  if (len == 2 ) {
				  cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true})
			  } else {
				  cy.get("a[onclick='getEmployeeWizard();']").click({force: true})
			  }
			  })
			 // cy.wait(4000)
			  cy.get("#empWizardTitle").then(($span) => {
				   var basicdetailsheadertext = $span.text();
					 expect(basicdetailsheadertext).equal('Basic Details')
			 })
			 cy.route('POST', Cypress.env('url')+'Employee/Employee/BasicDetailsWizard').as('BasicDetailsWizard')
		 
		cy.get('input[name=code]').type(data.rows[0].EmpCode.trim())
		
	   cy.get('input[name=fname]').type(data.rows[0].FirstName.trim())
	
	   cy.get('input[name=lname]').type(data.rows[0].LastName.trim())
	
	   
	   cy.get('#Male').check(data.rows[0].Gender,{force: true})
	   
	   cy.get('select[name=category]').select(data.rows[0].Category,{force: true})
	
	   cy.get('select[name=ptlocation]').select(data.rows[0].ProfTaxLocation)
	
	
	  cy.get('#txt_dateofbirth').click().then(input => {
		 input[0].dispatchEvent(new Event('input', { bubbles: true }))
		  input.val(data.rows[0].DateOfBirth)
	 })
	
	
	  cy.get('#txt_dateofjoining').then(input => {
			  input.val(data.rows[0].DateOfJoining)
	  }) 
	
	  //cy.wait(1000)
	  cy.get('[for="Date of Joining"]').click()
	  cy.wait
	  cy.get('select[name=esilocation]').select(data.rows[0].ESILocation,{force: true})
	  cy.get('select[name=metro]').select(data.rows[0].Metro_TDS,{force: true})
	  cy.get('select[name=esidispensary]').select(data.rows[0].ESIDispensary,{force: true})
	 // cy.wait(1000)
	  cy.get('#btnSaveBasicDetail').click({force: true})
	   cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
	  cy.get(".toast-message").invoke('text').then((text) => {
		//pass 
		  expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
		  cy.log(text.trim())
	  })  
	  cy.get(".toast-message").click({force: true})
		
        })
    }

}

export default Cloud