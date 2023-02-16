class Payroll {

    saveMonthlyInput(month, year, LD, WEEKOFF_DAYS) {
        cy.wait(1000)
        cy.get('#payroll_detail_tab').click()
        //set monthly input
        cy.get('#Transaction_MonthlyInput').click({ force: true })
        cy.get('#Transaction_MonthlyInput').click()
        cy.get('#Transaction_MonthlyInput').click({ force: true })
        cy.wait(5000)
        cy.get('#inputMonth').select(month)
        cy.get('#year').clear()
        cy.get('#year').type(year)
        //click on view button
        cy.get('#viewdata').click({ force: true })
        //cy.get('#editdata').click()
        cy.wait(5000)
        cy.xpath("//input[contains(@name,'LD')]").clear().type(LD)
        cy.xpath("//input[contains(@name,'WEEKOFF_DAYS')]").clear().type(WEEKOFF_DAYS)
        //click on save button
        cy.get('#savedata').click()
        cy.wait(3000)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).to.contain('Record Save Successfully !')
        })
    }

    setPayrollComponent() {
        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=attendance&submodule=PayrollComponentt')
        cy.get('#AttendanceSetting > span').click({ force: true })
        cy.get('#payrollComponentTab').click({ force: true })
        cy.wait(3000)
        cy.get('#ddTime').select('LDUSE');
        cy.get('#ddPayroll').select('LD');
        cy.get('#btnAdd').click();
        cy.get('#btnSavePayrollComp').click();
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).to.contain('Record saved successfully.!')
        })
    }

    doTimeConsolidation(month, year) {
        cy.get('#attendance_detail_tab').click();
        cy.get('#Attendance_TimeConsolidation').click({ force: true });
        cy.wait(5000)
        cy.get('#ddMonth').select(month, { force: true });
        cy.get('#txtYear').click({ force: true }).clear().type(year);
        cy.get('.text-center:nth-child(3) > #btnProcess').click();
        cy.wait(2000)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).to.contain('Process Over.!')
        })
    }

    deleteTimeConsolidation(month, year) {
        cy.get('#attendance_detail_tab').click();
        cy.get('#Attendance_TimeConsolidation').click({ force: true });
        cy.wait(5000)
        cy.get('#ddMonth').select(month, { force: true });
        cy.get('#txtYear').click({ force: true }).clear().type(year);
        cy.get('#btnDelete').click();
        cy.wait(2000)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).to.contain('Delete Successfully !')
        })
    }

    doPayrollProcessInPosting(employeeId, month, year) {
        cy.server()
        cy.route('GET', '/Admin/Settings/GetBackGroundProcess').as('GetBackGroundProcess')

        cy.visit(Cypress.env('url') + 'Attendance/Entry/PayrollPosting')

        cy.get('#catall').click({ force: true })
        cy.get('#ddMonth').select(month);
        cy.get('#txtYear').click({ force: true }).clear().type(year);
        cy.get('.select2-selection__placeholder').click();
        cy.get('.select2-search__field').click().type(employeeId);
        cy.get('.select2-results__option--highlighted').click({ force: true })
        cy.get('[value="Process"]').click();
        cy.get('.dvMsg').invoke('text').should('contain', 'It will get processed in background.')
        cy.wait(50000)
        cy.get('.dripicons-bell').click({ force: true })
        cy.get(".notification-listmenu a p").eq(0).invoke('text').should('contain', 'Payroll Posting done successfully.')
    }

    doPayrollPosting(employeeId, month, year) {
        cy.visit(Cypress.env('url') + 'Attendance/Entry/PayrollPosting')
        cy.get('#catall').click({ force: true })
        cy.get('#ddMonth').select(month);
        cy.get('#txtYear').click({ force: true }).clear().type(year);
        cy.get('.select2-selection__placeholder').click();
        cy.get('.select2-search__field').click();
        cy.get('.select2-search__field').click().type(employeeId);
        cy.get('.col-sm-6 > .row').click();
        cy.get('#btnPostPayrollPosting').click();
        cy.wait(50000)
        cy.get('.dripicons-bell').click({ force: true })
        cy.get(".notification-listmenu a p").eq(0).invoke('text').should('contain', 'Payroll Posting done successfully.')
    }

    verifyLopDaysInMonthlyInput(month, year, lopDays) {
        cy.get('#payroll_detail_tab').click()
        //set monthly input
        cy.get('#Transaction_MonthlyInput').click({ force: true })
        cy.get('#Transaction_MonthlyInput').click()
        cy.get('#Transaction_MonthlyInput').click({ force: true })
        cy.wait(5000)
        cy.get('#inputMonth').select(month)
        cy.get('#year').clear()
        cy.get('#year').type(year)
        //click on view button
        cy.get('#editdata').click({ force: true })
        cy.wait(10000)
        cy.xpath("//input[contains(@name,'LD')]").invoke('val').should('contain', lopDays)
    }

    doPayrollProcess(month, year) {

        cy.get('#payroll_detail_tab').click({ force: true })
        cy.wait(2000)
        cy.get('#Utilities_PayrollProcess').click({ force: true })
        cy.wait(2000)
        cy.get('#month').select(month, { force: true })
        cy.get('#year').click({ force: true })
        cy.get('#year').clear().type(year)
        cy.wait(1000)
        cy.get('#btnProcess').click({ force: true })
        cy.wait(4000)
        cy.get(".toast-message").invoke('text').should('eq', 'Payroll Process Completed Successfully')
    }

    deletePayrollProcess(month, year) {

        cy.get('#payroll_detail_tab').click({ force: true })
        cy.wait(2000)
        cy.get('#Utilities_PayrollProcess').click({ force: true })
        cy.wait(2000)
        cy.get('#month').select(month, { force: true })
        cy.get('#year').click({ force: true })
        cy.get('#year').clear().type(year)
        cy.wait(1000)
        cy.get('#btnProcessDelete').click({ force: true })
        cy.wait(4000)
        cy.get(".toast-message").invoke('text').should('eq', 'Payroll Process Deleted Successfully')
    }
    percentage(percent, totalValue) {
        return (percent / 100) * totalValue;
    }

    verifySalaryDetails(month, year, MonthDays, LopDays, PaidDays, fixedBasic) {
        const { softAssert, softExpect } = chai;

        var FB = fixedBasic
        var MD = MonthDays
        var PD = PaidDays
        var EarnedBasic = Math.round((FB / MD) * PD)
        var LeaveEncashRate = (FB / 26).toFixed(2);
        var ESICONAMOUNT = Math.round((0.0325 * EarnedBasic).toFixed(1))

        var PFRate = 12
        var PFAmount = Math.round(this.percentage(PFRate, EarnedBasic))
        var ESIRate = 0.75
        var ESIAmount = Math.round(this.percentage(ESIRate, EarnedBasic))
        var PROFESSIONALTAXAmount = 175

        var deductionAmount = PFAmount + ESIAmount + PROFESSIONALTAXAmount
        var NetPay = parseInt(EarnedBasic) - parseInt(deductionAmount)

        cy.wait(2000)
        cy.get('#salary_detail_tab').click({ force: true })
        cy.wait(3000)
        cy.get('#Salary_SalaryDetails').click({ force: true })
        cy.wait(7000)
        cy.get('#drpfromMonth').select(month, { force: true })
        cy.get('#txtfromYear').click({ force: true })
        cy.get('#txtfromYear').clear().type(year)
        cy.wait(2000)
        cy.get('[onclick="GetSalaryData()"]').click({ force: true })
        cy.wait(2000)


        cy.get('#tblEarn>tr>td:nth-child(1)').each(($el, index, $list) => {
            if ($el.text() === 'Month Days') {
                cy.log('Month Days')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', MonthDays.toFixed(2))
            }
            else if ($el.text() === 'Lop Days') {
                cy.log('Lop Days')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', LopDays.toFixed(2))
            }
            else if ($el.text() === 'Fixed Basic') {
                cy.log('Fixed Basic')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', fixedBasic.toFixed(2))
            }
            else if ($el.text() === 'Paid Days') {
                cy.log('Paid Days')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', PaidDays.toFixed(2))
            }
            else if ($el.text() === 'Earned Basic') {
                cy.log('Earned Basic')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', EarnedBasic.toFixed(2))
            }
            else if ($el.text() === 'Leave Encash Rate') {
                cy.log('Leave Encash Rate')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', LeaveEncashRate)
            }
            else if ($el.text() === 'ESICONAMOUNT') {
                cy.log('ESICONAMOUNT')
                cy.get('#tblEarn>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', ESICONAMOUNT.toFixed(2))
            }
        })

        cy.get('#tblDed>tr>td:nth-child(1)').each(($el, index, $list) => {

            if ($el.text() === 'PF Amount') {
                cy.log('Month Days')
                cy.get('#tblDed>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', PFAmount + '.00')
            }
            else if ($el.text() === 'ESI') {
                cy.log('Lop Days')
                cy.get('#tblDed>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', ESIAmount + '.00')
            }
            else if ($el.text() === 'Professional Tax') {
                cy.log('Fixed Basic')
                cy.get('#tblDed>tr>td:nth-child(2)').eq(index).invoke('text').should('eq', PROFESSIONALTAXAmount + '.00')
            }
        })

        cy.get('#main>div>div>div:nth-child(5)>div>b').each(($el, index, $list) => {

            if ($el.text().includes('Total Earnings')) {
                cy.log('Total Earnings')
                cy.get('#main>div>div>div:nth-child(5)>div>span').eq(index).invoke('text').should('eq', String(EarnedBasic))
            }
            else if ($el.text().includes('Net Pay')) {
                cy.log('Net Pay')
                cy.get('#main>div>div>div:nth-child(5)>div>span').eq(index).invoke('text').should('eq', String(NetPay))
            }
            else if ($el.text().includes('Total Deductions')) {
                cy.log('Total Deductions')
                cy.get('#main>div>div>div:nth-child(5)>div>span').eq(index).invoke('text').should('eq', String(deductionAmount))
            }
        })

    }

    addEarningDetails(fixedBasic) {

        cy.get('#salary_detail_tab').click({ force: true })
        cy.wait(1000)
        cy.get('#Salary_EarningDetails').click({ force: true })

        cy.wait(5000)
        cy.xpath("//input[@name='FB']").click({ force: true })
        cy.xpath("//input[@name='FB']").clear().type(fixedBasic)

        cy.wait(1000)
        cy.get('#btnSaveEarningDetails').click({ force: true })
        cy.wait(3000)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Record Saved Successfully !')
            cy.log(text.trim())
        })
        cy.get(".toast-message").click({ force: true })
        //cy.reload()
        cy.get('#salary_detail_tab').click({ force: true })
        cy.wait(1000)
        cy.get('#Salary_EarningDetails').click({ force: true })
        cy.wait(5000)
        cy.xpath("//input[@name='FB']").then($input => {
            expect(parseInt($input.val())).to.equal(fixedBasic)
        })
    }

    verifyLeaveDetails(LeaveType, LeaveDate, LeaveDay, LeaveDays, Reason) {
        const { softAssert, softExpect } = chai;
        cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)

        var i = 0
        cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[2]/th[2]").eq(i).invoke('text').then((openingLeave) => {
            cy.log("openingLeave: " + openingLeave)

            cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {
                cy.log("debitLeave: " + debitLeave)

                cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {
                    cy.log("usedLeave: " + usedLeave)

                    cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {
                        cy.log("availableLeave: " + availableLeave)
                        var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave) - parseFloat(debitLeave)
                        softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));
                    })
                })
            })
        })

        cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {
            cy.log("leaveType: " + leaveType)
            softExpect(leaveType).to.eq(LeaveType);
        })

        cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {
            cy.log("leaveDate: " + leaveDate)
            softExpect(leaveDate).to.eq(LeaveDate+' - '+LeaveDate);
        })

        cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {
            cy.log("leaveDay: " + leaveDay)
            //softExpect(leaveDay).to.eq(LeaveDay+' - '+LeaveDay);
            softExpect(leaveDay.trim().toLowerCase()).to.contains((LeaveDay+' - '+LeaveDay).trim().toLowerCase())
        })

        cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {
            cy.log("leaveDays: " + leaveDays)
            softExpect(parseInt(leaveDays)).to.eq(LeaveDays);
        })

        cy.get('.col-md-4 > .media-body > :nth-child(1)').invoke('text').then((reason) => {
            cy.log("reason: " + reason)
            softExpect(reason).to.contain(Reason);
        })
    }


}
export default Payroll