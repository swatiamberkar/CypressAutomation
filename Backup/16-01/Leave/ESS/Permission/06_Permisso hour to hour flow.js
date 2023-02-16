describe('Attendance regularisation ESS setting part ', function() {
    var Admin = 'L1'
	var managerID = 'L2'
	var employeeID = 'L1'

	var leaveFromDate = '15/12/2022'
    var date = 'November 20, 2022'
    var leaveFromDate1 = '01/06/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '14/11/2022'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})
/*
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
*/

context('Apply for permission - User login',function(){ 

	it(' ESS login page',function(){

        cy.EssLogin(employeeID, employeeID)
        cy.wait(2000)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=PermissionFromHourToHour')
        cy.wait(2000)  
        cy.get('#Permission_tab').click()
        cy.wait(2000)   
    }) 

    it('Verify Success message -Data saved succesfully for approval',function(){
        //Select month
        cy.get('#ddMonth').select('November')
        cy.wait(1000)
         
         /*Select Date
         cy.get('#dtPermi').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val(leaveFromDate)
        })*/

        //Select Date
        cy.get('#dtPermi').click({force:true})
        cy.get('.arrowTop .numInput').type('2021',{force:true});
        cy.get('.arrowTop .flatpickr-monthDropdown-months').select('10');

        //cy.xpath("//body/div[4]/div[2]/div[1]/div[2]/div[1]/span[26]").click({force:true});
        cy.xpath('//body/div[4]/div[2]/div[1]/div[2]/div[1]/span[18]').click({force:true});
        /*
        cy.get('.arrowTop > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > [aria-label="' + date + '"]').click({ force: true })
      */
        cy.wait(2000)

        cy.get(':nth-child(1) > .col-sm-3').click()

        //Add from time
        cy.get('#tmPermiFromHour').clear()
        cy.get('#tmPermiFromHour').type(09)
        cy.get('#tmPermiFromMin').clear()
        cy.get('#tmPermiFromMin').type(30)

        //Add To time
        cy.get('#tmPermiToHour').clear()
        cy.get('#tmPermiToHour').type(10)
        cy.get('#tmPermiToMin').clear()
        cy.get('#tmPermiToMin').type(30)

          //click on add button
          cy.get('#btnAdd').click()
          cy.wait(2000)
          //click on save button
          cy.get('#btnSave').click()
          //verify Success message 
          cy.get(".noty_body").invoke('text').then((text) => {
              expect(text.trim()).equal('Data saved successfully For Approval!')
          })
          cy.wait(1000)
          //click on message to close message box
          cy.get(".noty_body").click()
          cy.wait(3000)

    })

    it('Log Out ',function(){

        cy.logout()
        cy.wait(2000)

    })
})

context('Approved by manager',function(){ 

    it(' ESS login page',function(){

        cy.EssLogin(managerID, managerID)
        cy.visit(Cypress.env('essUrl')+'Employee/Profile/EmployeeApprovals?Menu=managerapprove')
        cy.wait(2000)
    })   

    it('verify view detail tab',function(){

        cy.xpath("//tbody/tr[1]/td[10]/a[1]").click()
        cy.wait(2000)
        //invoke date
        cy.xpath("//td[contains(text(),'20/11/2022')]").invoke('text').then((text) => {
            expect(text.trim()).equal(date)
        })
        
        //invoke from time
        cy.xpath("//td[contains(text(),'09:30')]").invoke('text').then((text) => {
            expect(text.trim()).equal('09.30')
        })

           //invoke To time
           cy.xpath("//td[contains(text(),'10:30')]").invoke('text').then((text) => {
            expect(text.trim()).equal('10.30')
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
})
