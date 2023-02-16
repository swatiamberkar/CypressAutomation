describe('Attendance regularisation ESS setting part ', function() {
    var Admin = 'L1'
	var managerID = 'L2'
	var employeeID = 'L1'

	var leaveFromDate = '15/09/2022'
    var date = 'December 16, 2022'
    var leaveFromDate1 = '01/06/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '14/11/2022'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})

it('Login to Cloud & select Company', function() {
    cy.login()
    cy.changeCompany();
})

it('change setting hour to hour', function () {

    cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=attendance&submodule=generaltimeoffice')
    cy.wait(1000)
    cy.get('#ddPermissionEntry').select('From Hour - To Hour')
    cy.wait(1000)
    cy.get('#btnSaveGeneralTimeOffice').click()
    cy.wait(3000)

})



	it(' ESS login page',function(){

        cy.EssLogin(employeeID, employeeID)
        cy.wait(2000)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=PermissionFromHourToHour')
        cy.wait(2000)  
        cy.get('#Permission_tab').click()
        cy.wait(2000)   
    }) 

    it('Verify validation message - Please Added Values.',function(){
        //click on save  button
        cy.get('#btnSave').click()
        //verifu validation message
        cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please Added Values.')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
        cy.wait(3000)

    })

    it('Verify validation message - Please select Permission Date.',function(){
        //click on add button
        cy.get('#btnAdd').click()
        //verify validatoion message 
        cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please select Permission Date.')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
        cy.wait(3000)

    })

    it('Verify validation message - Please select Permission From Hours.',function(){

        //Select Date
        cy.get('#dtPermi').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val(leaveFromDate)
        })

        cy.get(':nth-child(1) > .col-sm-3').click()

         //click on add button
         cy.get('#btnAdd').click()
         //verify validatoion message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Please Enter Permission From Hours.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)
    })

    it('Verify validation message - Please Enter Permission To Hours.',function(){
           //Add from time
           var num = '02'
           cy.get('#tmPermiFromHour').clear()
           cy.get('#tmPermiFromHour').type(num)
           cy.get('#tmPermiFromMin').clear()
           cy.get('#tmPermiFromMin').type(01)
   
             //click on add button
             cy.get('#btnAdd').click()
             //verify validatoion message 
             cy.get(".noty_body").invoke('text').then((text) => {
                 expect(text.trim()).equal('Please Enter Permission To Hours.')
             })
             cy.wait(1000)
             //click on message to close message box
             cy.get(".noty_body").click()
             cy.wait(3000)
    })

    it('Verify validation message - From time should  be less than To time.',function(){
            //Add To time
            cy.get('#tmPermiToHour').clear()
           cy.get('#tmPermiToHour').type(01)
           cy.get('#tmPermiToMin').clear()
           cy.get('#tmPermiToMin').type(00)
   
             //click on add button
             cy.get('#btnAdd').click()
             //verify validatoion message 
             cy.get(".noty_body").invoke('text').then((text) => {
                 expect(text.trim()).equal('From time should be less than To time.')
             })
             cy.wait(1000)
             //click on message to close message box
             cy.get(".noty_body").click()
             cy.wait(3000)

    })

    it('Verify validation message - Maximum Length for To Hours is 2 ',function(){
        //Add To time
        cy.get('#tmPermiToHour').clear()
       cy.get('#tmPermiToHour').type(1.5)
       cy.get('#tmPermiToMin').clear()
       cy.get('#tmPermiToMin').type(1.5)

         //click on add button
         cy.get('#btnAdd').click()
         //verify validatoion message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Maximum Length for To Hours is 2')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it('Verify validation message - Shift is from 9.30-18.30. Please select From Hours-To Hours between the shift timings.',function(){
        
        /*Select Date
        cy.get('#dtPermi').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('11/12/2022')
        })*/

        cy.get('#dtPermi').click()
        cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="' + date + '"]').click({ force: true })
        cy.wait(2000)

        cy.get(':nth-child(1) > .col-sm-3').click()

        //Add from time
        cy.get('#tmPermiFromHour').clear()
        cy.get('#tmPermiFromHour').type(01)
        cy.wait(2000)
        cy.get('#tmPermiFromMin').clear()
        cy.get('#tmPermiFromMin').type(01)
        cy.wait(2000)

        //Add To time
        cy.get('#tmPermiToHour').clear()
        cy.get('#tmPermiToHour').type(02)
        cy.wait(2000)
        cy.get('#tmPermiToMin').clear()
        cy.get('#tmPermiToMin').type(00)
        cy.wait(2000)

          //click on add button
          cy.get('#btnAdd').click()
          cy.wait(2000)
          //verify validatoion message 
          cy.get(".noty_body").invoke('text').then((text) => {
              expect(text.trim()).equal('Shift is from 09:00-17:00. Please select From Hours - To Hours between the Shift timings.')
          })
          cy.wait(1000)
          //click on message to close message box
          cy.get(".noty_body").click()
          cy.wait(3000)

    })
})
