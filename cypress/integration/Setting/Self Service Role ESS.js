import Cloud from './Cloud'
import Leave from './Leave'

describe('Self Service Role', () => {
    const cloud = new Cloud()
    const leave = new Leave()

    var role = 'Developer'
    var role1 = 'Tester'
    var employeeId = 'CY3'
    var employeeId1 = 'CY4'

    beforeEach(() => {
        cy.getCookies()
        cy.getCookies_ESS()
    })

    function clickAddButton() {
        cy.get('a > .fa').click({ force: true })
    }

    function selectRolesTab() {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=roles')
        cy.get('#Organization_Roles').click();
    }

    function clickSaveButton() {
        cy.get('#btnSaveRole').click();
    }

    function enterRole(role) {
        cy.get('#EssRole').type(role);
    }

    function closeRolePopup() {
        cy.get('.btn-danger').click();
    }

    function assignSelfServiceRole(employeeId, role) {
      

        cy.get('#Profile_SelfServiceRole').click({ force: true })
        cy.get('#SelfServiceRole').select(role, { force: true })
        cy.get('[onclick="saveSelfServiceRole(this)"]').click({ force: true })
    }

    function deleteRole() {
        cy.get(".fa-trash").then((element) => {
            const item = element.length;
            cy.get(".fa-trash").eq(item - 1).click({ force: true })
        })
        cy.get(".toast-message").click({ force: true })
    }

  /*  it('Login and Change Company', () => {
        cy.login()
        cy.changeCompany();

    })

    context('Cloud setting', () => {
        it('Add Self Service Role', () => {
            selectRolesTab()
            clickAddButton()
            enterRole(role)
            clickSaveButton()
            cloud.verifyNotication('Role Saved Successfully!!!')
            clickAddButton()
            enterRole(role1)
            clickSaveButton()
            cloud.verifyNotication('Role Saved Successfully!!!')
        })

        it('Set Self service role in Manager Eligibilty', () => {
            cy.visit(Cypress.env('url') + '/Settings/Employee/ESSIndex?module=Leave&submodule=ManagerEligibility')
            cy.xpath('//input[@value="' + role + '"]').click({ force: true })
            cy.xpath('//input[@value="' + role1 + '"]').click({ force: true })
            cy.get('#btnSave').click({ force: true })
            cloud.verifyNotication('Saved Successfully.!')
        })

        it("Roll Allocation", function() {
            cloud.rollAllocation('Leave', role)
            cloud.rollAllocation('Leave', role1)
        })

        it('Set Self service role 1 For Leave Module', () => {
            cy.visit(Cypress.env('url') + 'Settings/Employee/ESSIndex?module=Profile&submodule=RoleAllocation')
            cy.get('#drpModule').select('Leave')
            cy.get('#drpRole').select(role)
            cy.xpath("//button[contains(text(),'Search')]").click()
            cy.wait(1000)
            cy.get('[class="chk menu"]').eq(0).click()
            cy.get('[class="chk menu"]').eq(1).click()
            cy.get('[class="chk menu"]').eq(2).click()
            cy.get('[class="chk menu"]').eq(3).click()
            cy.get('[class="chk menu"]').eq(4).click()
            cy.wait(1000)
            //click on save button
            cy.get('#savedata').click()
            //verify success message 
            cloud.verifyNotication('Setting Save successfully')
        })

        it('Set Self service role 2 For Leave Module', () => {
            //cy.visit(Cypress.env('url') + 'Settings/Employee/ESSIndex?module=Profile&submodule=RoleAllocation')
            cy.get('#drpModule').select('Leave')
            cy.get('#drpRole').select(role1)
            cy.xpath("//button[contains(text(),'Search')]").click()
            cy.wait(1000)
            cy.get('[class="chk menu"]').eq(0).click()
            cy.get('[class="chk menu"]').eq(1).click()
            cy.get('[class="chk menu"]').eq(2).click()
            cy.get('[class="chk menu"]').eq(3).click()
            cy.get('[class="chk menu"]').eq(4).click()
            cy.wait(1000)
            //click on save button
            cy.get('#savedata').click()
            //verify success message 
            cloud.verifyNotication('Setting Save successfully')
        })

        it('Assign Self Service Role for Employees', () => {
            cy.navigate_EmployeeProfile(employeeId1)
            assignSelfServiceRole(employeeId1, role1)
            cy.navigate_EmployeeProfile(employeeId)
            assignSelfServiceRole(employeeId, role)
        })

        it('Assign Manager from Approval Matrix ', () => {

            //cy.navigate_EmployeeProfile(data.EmployeeCode)

            cy.wait(2000)
            cy.get('#approval_matrix_tab').click({ force: true })
            cy.wait(2000)

            cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
            cy.wait(5000)
            cy.get('#Priority').click({ force: true })
            cy.get('#Priority').clear().type('1')

            cy.wait(2000)
            cy.get('#select2-approvalManager-container').click({ force: true })
            cy.wait(2000)
            cy.get('input[type="search"]').click({ force: true })
            cy.get('input[type="search"]').type(employeeId1)
            cy.wait(2000)
            cy.contains('li', '[' + employeeId1 + ']').click({ force: true })
            //cy.get('.select2-results__option--highlighted').click({ force: true })
            cy.wait(2000)

            cy.get('#approvalmust').select('Yes')

            cy.get('#cancelrights').select('Yes')
            cy.get('#Leave').click({ force: true })
            cy.get('#btnSaveText').click()
            cy.wait(5000)

        })

        //leave.AddLeaveOpening(employeeId, 'Paid Leave')

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
            //cy.wait('@GetBackGroundProcess').its('status').should('eq', 200)

            //
            // cy.reload()
            // cy.wait(2000)
            // cy.get('.dripicons-bell').click()

            // cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {
            // 	cy.log(text.trim())
            // 	expect(text.trim()).contains('Generate Password done successfully.')
            // 	//cy.get(".toast-message").click()
            // })

        })

    })
*/
    context('ESS Flow', () => {
        const leave = new Leave()

        var moment = require('moment');
        const Day = moment().format('DD')
        const Day1 = parseInt(Day) + 1
        const Day2 = parseInt(Day) - 1
        const Month = moment().format('MM')
        const year = moment().format('YYYY')
        const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
        const todayDate = Day + '/' + Month + '/' + year
        //const todayDate = '19/10/2022'
        const tomorrowDate = Day1 + '/' + Month + '/' + year


        var EmployeeFirstName = 'Devang'
        var EmployeeLastName = 'David'
        var employeeJoiningDate = '23/05/2022'
        var department = 'IT'
        var designation = 'HR'
        var balance = 10

        var managerID = 'Z2'
        //var managerID = 'Z2'

        var ManagerFirstName = 'Akash '
        var ManagerLastName = 'Avhad'
        var admin = 'SA1'
        var leaveType = 'Paid Leave'
        var leaveTypeValue = 'PL'
        var leaveFromDate = todayDate
        //var leaveFromDate = '13/10/2022'
        var leaveToDate = todayDate
        //var leaveToDate = '13/10/2022'
        var leaveFromDayType = 'FULL DAY'
        var leaveToDayType = 'FULL DAY'
        var leaveDay = 1

        var Reason = 'Office Metting'
        var LeaveStation = 'Yes'
        var VacationAddress = 'Pune'
        var ContactNumber = '9876543210'
        var ReliverSetting = 'No'
        var ReliverCode = ''
        var ReliverName = ''

        var APPROVERS = 'level  1'
        var MANAGERREMARKS = ''

        var LeaveStatus = 'Approved'
        var ManagerStatus_1 = 'Approved'
        var ManagerStatus_2 = 'Approved'
        var ManagerLevel = 1
        var ManagerRemark_1 = 'Approved by Manager 1'
        var ManagerRemark_2 = 'Approved by Manager 2'

        var managerID_2 = ''
        var ManagerFirstName_2 = ' '
        var ManagerLastName_2 = ''

        it('Apply Leave ', function () {
            cy.EssLogin(employeeId, employeeId)
            leave.applyLeave(leaveType, balance, leaveDay, leaveFromDate, leaveToDate, leaveFromDayType, leaveToDayType,
                Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
                ReliverSetting)
        })

        it('Approve Leave at Manager', function () {
            cy.logout()
            var managerID = employeeId1
            cy.EssLogin(managerID, managerID)
            var employeeID = employeeId
            leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus)
        })

        it('Verify Status at Employee after Approved Leave', function () {
            cy.logout()
            cy.EssLogin(employeeId, employeeId)
            leave.verifyStatusAtEmployee(leaveFromDate, LeaveStatus)
        })

    })

})


