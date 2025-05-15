import LoginPage from '../../support/pages/LoginPage';
import loginData from '../../fixtures/loginData.json';

describe('orangehrm login with POM', () => {

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

    it('User try to login using valid username and valid password', () => {
        LoginPage.waitForLoginForm();
        cy.intercept('GET', '**/dashboard/employees/action-summary').as('summaryRequest');
      
        LoginPage.getUsernameField().type(loginData.validUsername);
        LoginPage.getPasswordInput().type(loginData.validPassword);
        LoginPage.getLoginButton().click();
        
        cy.url().should('include', 'dashboard');
    
        cy.wait('@summaryRequest').its('response.statusCode').should('equal', 200);
    
        LoginPage.getDropdown().should('be.visible');
        LoginPage.getBrandBanner().should('be.visible');
        LoginPage.getBreadcrumb().should('exist');
        LoginPage.getAttendanceChart().should('be.visible');
    
        LoginPage.getLoginError().should('not.exist');
    })

    it('User try to login using valid username and invalid password', () => {
        LoginPage.waitForLoginForm();
        cy.intercept('POST', '**/auth/validate').as('validateRequest');
        
        LoginPage.getUsernameField().type(loginData.validUsername);
        LoginPage.getPasswordInput().type(loginData.invalidPassword);
    
        LoginPage.getLoginButton().click();
    
        cy.wait('@validateRequest').its('response.statusCode').should('equal', 302);
    
        cy.url().should('include', 'login');
    
        LoginPage.getLoginError().should('exist');
        LoginPage.getAlertContent().should('have.text', 'Invalid credentials');
    
        LoginPage.getDropdown().should('not.exist');
    })

    it('User try to login using invalid username and random password', () => {
        LoginPage.waitForLoginForm();
        cy.intercept('POST', '**/auth/validate').as('validateRequest');
        
        LoginPage.getUsernameField().type(loginData.validUsername);
        LoginPage.getPasswordInput().type(loginData.invalidPassword);
    
        LoginPage.getLoginButton().click();
    
        cy.wait('@validateRequest').its('response.statusCode').should('equal', 302);
    
        cy.url().should('include', 'login');
    
        LoginPage.getLoginError().should('exist');
        LoginPage.getAlertContent().should('have.text', 'Invalid credentials');
    
        LoginPage.getDropdown().should('not.exist');
    })

    it('User try to login using valid username and empty password', () => {
        LoginPage.waitForLoginForm();
        // nothing to intercept
        
        LoginPage.getUsernameField().type(loginData.validUsername);
        LoginPage.getPasswordInput().clear();
    
        LoginPage.getLoginButton().click();
    
    
        cy.url().should('include', 'login');
    
        LoginPage.getLoginError().should('exist');
        LoginPage.hasInputErrorClass(LoginPage.getPasswordInput());
        LoginPage.getInputErrorMessage().should('have.text', 'Required');
    
        LoginPage.getDropdown().should('not.exist');
    })

    it('User try to login using empty username and random password', () => {
        LoginPage.waitForLoginForm();
        // nothing to intercept
        
        LoginPage.getUsernameField().clear();
        LoginPage.getPasswordInput().type(loginData.invalidPassword);
    
        LoginPage.getLoginButton().click();
    
        cy.url().should('include', 'login');
    
        LoginPage.getLoginError().should('exist');
        LoginPage.hasInputErrorClass(LoginPage.getUsernameField());
        LoginPage.getInputErrorMessage().should('have.text', 'Required');
    
        LoginPage.getDropdown().should('not.exist');
   })

   it('User try to login using empty username and empty password', () => {
        LoginPage.waitForLoginForm();
        // nothing to intercept
    
        LoginPage.getUsernameField().clear
        LoginPage.getPasswordInput().clear

        LoginPage.getLoginButton().click()

        cy.url().should('include', 'login')

        LoginPage.getLoginError().should('exist')
        
        LoginPage.hasInputErrorClass(LoginPage.getUsernameField());
        LoginPage.hasInputErrorClass(LoginPage.getPasswordInput());
    })

    it('User try to login using valid username and valid password while the username is already logged in on other device', () => {
        LoginPage.waitForLoginForm();
        cy.intercept('GET', '**/dashboard/employees/action-summary').as('summaryRequest');
      
        LoginPage.getUsernameField().type(loginData.validUsername);
        LoginPage.getPasswordInput().type(loginData.validPassword);
        LoginPage.getLoginButton().click();
        
        cy.url().should('include', 'dashboard');
    
        cy.wait('@summaryRequest').its('response.statusCode').should('equal', 200);
    
        LoginPage.getDropdown().should('be.visible');
        LoginPage.getBrandBanner().should('be.visible');
        LoginPage.getBreadcrumb().should('exist');
        LoginPage.getAttendanceChart().should('be.visible');
    
        LoginPage.getLoginError().should('not.exist');
    })


})