describe('Attendance regularisation ESS setting part ', function() {
    var Admin = 'L1'
	var managerID = 'L2'
	var employeeID = 'L1'

	var leaveFromDate = '15/11/2022'
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
        cy.get('#ddPermissionEntry').select('Single Hour')
        cy.wait(1000)
        cy.get('#btnSaveGeneralTimeOffice').click()
        cy.wait(3000)
    
    })


	it(' ESS login page',function(){

        cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=permission')
        cy.wait(2000)
        cy.get('#PermissionDetail').click()
        cy.wait(2000)
    })

    it('Verify validation message - Please add data first!',function(){
        //click on save  button
        cy.get('#btnSave').click()
        //verifu validation message
        cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please add data first!')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
        cy.wait(3000)

    })

    it('Verify validation message - Please select Permission Date.',function(){
        //click on add button
        cy.get('#btnAdd#btnAdd').click()
        //verify validatoion message 
        cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please select Permission Date.')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
        cy.wait(3000)

    })

    it('Verify validation message - Please select Permission Hours.',function(){

        //
        cy.get('#ddMonth').select('June')
        cy.wait(1000)

        //Select Date
        cy.get('#dtPermi').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val(leaveFromDate1)
        })

        //
        cy.get(':nth-child(3) > .col-sm-3').click()
        cy.wait(1000)
         //click on add button
         cy.get('#btnAdd#btnAdd').click()
         //verify validatoion message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Please Enter Permission Hours.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)
    })

    it('Verify validation message - Shift Schedule Not Found.!',function(){

        cy.get('#dtPermi').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('01/06/2021')
        })
        cy.get('#txtYear').clear().type('2021')

        //Add time
        cy.get('#tmPermiHour').clear()
        cy.get('#tmPermiHour').type('07')
        cy.get('#tmPermiMin').clear()
        cy.get('#tmPermiMin').type('02')

          //click on add button
          cy.get('#btnAdd#btnAdd').click()
          //verify validatoion message 
          cy.get(".noty_body").invoke('text').then((text) => {
              expect(text.trim()).equal('Shift Schedule Not Found.!')
          })
          cy.wait(1000)
          //click on message to close message box
          cy.get(".noty_body").click()
          cy.wait(3000)

    })
    

    it('Verify validation message - Date not allowed',function(){

        //select month
        cy.get('#ddMonth').select('November')
        cy.wait(2000)

        cy.get('#txtYear').clear().type('2022')
    
      //Select Date
      cy.get('#dtPermi').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('12/10/2022')
      })
        cy.wait(2000)

         //
         cy.get(':nth-child(3) > .col-sm-3').click()
         cy.wait(2000)

         //click on add button
         cy.get('#btnAdd').click()
         //verify validatoion message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Date not Allowed. Please Select Date Between 01/11/2022 and 30/11/2022')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it('Verify validation message - Per day Maximum Permission Minutes allowed 240',function(){
         //select date
         cy.get('#dtPermi').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val(leaveFromDate)
        })

        //
        cy.get(':nth-child(3) > .col-sm-3').click()

         //click on add button
         cy.get('#btnAdd#btnAdd').click()
         //verify validatoion message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Per day Maximum Permission Minutes allowed 240')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)
    })


})