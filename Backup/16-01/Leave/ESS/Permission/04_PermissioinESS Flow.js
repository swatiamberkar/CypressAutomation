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

    it('Verify Success message ',function(){
         //
         cy.get('#ddMonth').select('November')
         cy.wait(1000)
 
         //Select Date
         cy.get('#dtPermi').click().then(input =>
             { input[0].dispatchEvent(new Event('input', {
             bubbles: true }))
             input.val(leaveFromDate)
         })
 
         //
         cy.get(':nth-child(3) > .col-sm-3').click()
         cy.wait(1000)

         //Add time
         cy.get('#tmPermiHour').clear()
         cy.get('#tmPermiHour').type('01')
         cy.get('#tmPermiMin').clear()
         cy.get('#tmPermiMin').type('01')
         //click on add button
         cy.get('#btnAdd').click()
         cy.wait(2000)

         //verify added details 
         cy.get(".spDate").invoke('text').then((text) => {
            expect(text.trim()).equal(leaveFromDate)
        })
        
         //verify added details 
         cy.get(".spHour").invoke('text').then((text) => {
            expect(text.trim()).equal('01:01')
        })

       

        //click on save button
        cy.get('#btnSave').click()

        //verify success message
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('Data saved successfully For Approval!')
        })
        cy.wait(5000)

 

    })

    it('Log Out ',function(){

        cy.logout()
        cy.wait(2000)
    })
  

    it(' ESS login page',function(){

            cy.EssLogin(managerID, managerID)
            cy.wait(2000)
            cy.visit(Cypress.env('essUrl')+'Employee/Profile/EmployeeApprovals?Menu=managerapprove')
            cy.wait(2000)
    })   

    it('verify view detail tab',function(){

            cy.xpath("//tbody/tr[1]/td[10]/a[1]").click()
            cy.wait(2000)
            //invoke date
            cy.xpath("//td[contains(text(),'15/11/2022')]").invoke('text').then((text) => {
                expect(text.trim()).equal(leaveFromDate)
            })
            //invoke time
            cy.xpath("//td[contains(text(),'01:01')]").invoke('text').then((text) => {
                expect(text.trim()).equal('01:01')
            })
            //click on close button
            cy.get('[onclick="closeDisplayModal()"]').click()


    })

    it('Approve request from manager',function(){

             cy.xpath("//tbody/tr[1]/td[7]/input[1]").click()
             //click on save button
             cy.get('.btn-success').click()
             //verify success message
             cy.get(".noty_body").invoke('text').then((text) => {
                expect(text.trim()).equal('Records are processed in background!!!')
            })
    })

})