import LoginPage from '../../support/pages/LoginPage';
import DashboardPage from '../../support/pages/DashboardPage';
import loginData from '../../fixtures/loginData.json';

describe('orangehrm dashboard with POM', () => {

    beforeEach(() => {
        LoginPage.visit();
    });

    it('User is on the login page', () => {
        LoginPage.waitForLoginForm();
        LoginPage.getBrandingImage().should('be.visible');
        LoginPage.getLogoImage().should('be.visible');
        LoginPage.getUsernameField().should('exist');
        LoginPage.getPasswordInput().should('exist');
        LoginPage.getLoginButton().should('be.visible');
    })

    it('User success login', () => {
        LoginPage.waitForLoginForm();
        cy.intercept('GET', '**/dashboard/employees/action-summary').as('summaryRequest');
        cy.intercept('GET', '**/dashboard/employees/subunit').as('subunitRequest');
        cy.intercept('GET', '**/dashboard/employees/locations').as('locationsRequest');
      
        LoginPage.getUsernameField().type(loginData.validUsername);
        LoginPage.getPasswordInput().type(loginData.validPassword);
        LoginPage.getLoginButton().click();
        
        cy.url().should('include', 'dashboard');
    
        cy.wait('@summaryRequest').its('response.statusCode').should('equal', 200);
        cy.wait('@subunitRequest').its('response.statusCode').should('equal', 200);
        cy.wait('@locationsRequest').its('response.statusCode').should('equal', 200);

        DashboardPage.waitForGrid();
    
        LoginPage.getDropdown().should('be.visible');
        DashboardPage.getBrandBanner().should('be.visible');
        DashboardPage.getBreadcrumb().should('exist');
        DashboardPage.getAttendanceChart().should('be.visible');
        DashboardPage.getMainMenu().should('be.visible');
        DashboardPage.getToDoList().should('be.visible');
        DashboardPage.getQuickLaunch().should('be.visible');
        DashboardPage.getBuzzWidget().should('be.visible');
        DashboardPage.getLeaveChart().should('be.visible');
        DashboardPage.getDistribChart().should('exist');
        DashboardPage.getLocationChart().should('exist');
    
        LoginPage.getLoginError().should('not.exist');
    })

})