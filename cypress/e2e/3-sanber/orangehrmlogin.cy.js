describe('orangehrm login', () => {
  const validUsername = 'Admin'
  const validPassword = 'admin123'
  const invalidUsername = 'RandomAdmin'
  const invalidPassword = 'RandomPassword'
  
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('User is on the login page', () => {
    cy.get('.orangehrm-login-branding').should('be.visible')
    cy.get('.orangehrm-login-logo').should('be.visible')
    cy.get('.orangehrm-login-title').should('have.text', 'Login')
    cy.get('input[name="username"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })

  it('User try to login using valid username and valid password', () => {
    cy.intercept('GET', '**/dashboard/employees/action-summary').as('summaryRequest')
  
    cy.get('input[name="username"]').type(`${validUsername}`)
    cy.get('input[name="password"]').type(`${validPassword}`)

    cy.get('.orangehrm-login-button').click()

    cy.url().should('include', 'dashboard')

    cy.wait('@summaryRequest').its('response.statusCode').should('equal', 200)

    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-brand-banner').should('be.visible')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('exist')
    cy.get('.emp-attendance-chart').should('be.visible')

    cy.get('.orangehrm-login-error').should('not.exist')
  })

  it('User try to login using valid username and invalid password', () => {
    cy.intercept('POST', '**/auth/validate').as('validateRequest')
    
    cy.get('input[name="username"]').type(`$validUsername`)
    cy.get('input[name="password"]').type(`$invalidPassword`)

    cy.get('.orangehrm-login-button').click()

    cy.wait('@validateRequest').its('response.statusCode').should('equal', 302)

    cy.url().should('include', 'login')

    cy.get('.orangehrm-login-error').should('exist')
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')

    cy.get('.oxd-userdropdown-img').should('not.exist')
  })

  it('User try to login using invalid username and random password', () => {
    cy.intercept('POST', '**/auth/validate').as('validateRequest')
    
    cy.get('input[name="username"]').type(`$invalidUsername`)
    cy.get('input[name="password"]').type(`$invalidPassword`)

    cy.get('.orangehrm-login-button').click()

    cy.wait('@validateRequest').its('response.statusCode').should('equal', 302)

    cy.url().should('include', 'login')

    cy.get('.orangehrm-login-error').should('exist')
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')

    cy.get('.oxd-userdropdown-img').should('not.exist')
  })

  it('User try to login using valid username and empty password', () => {
    // nothing to intercept
    
    cy.get('input[name="username"]').type(`$validUsername`)
    cy.get('input[name="password"]').clear()

    cy.get('.orangehrm-login-button').click()


    cy.url().should('include', 'login')

    cy.get('.orangehrm-login-error').should('exist')
    cy.get('input[name="password"]').should('have.class', "oxd-input--error")
    cy.get('.oxd-input-field-error-message').should('have.text', 'Required')

    cy.get('.oxd-userdropdown-img').should('not.exist')
  })

  it('User try to login using empty username and random password', () => {
    // nothing to intercept
    
    cy.get('input[name="username"]').clear()
    cy.get('input[name="password"]').type(`$invalidPassword`)

    cy.get('.orangehrm-login-button').click()

    cy.url().should('include', 'login')

    cy.get('.orangehrm-login-error').should('exist')
    cy.get('input[name="username"]').should('have.class', "oxd-input--error")
    cy.get('.oxd-input-field-error-message').should('have.text', 'Required')

    cy.get('.oxd-userdropdown-img').should('not.exist')
  })

  it('User try to login using empty username and empty password', () => {
    // nothing to intercept
    
    cy.get('input[name="username"]').clear
    cy.get('input[name="password"]').clear

    cy.get('.orangehrm-login-button').click()

    cy.url().should('include', 'login')

    cy.get('.orangehrm-login-error').should('exist')
    
    cy.get('input[name="username"]').should('have.class', "oxd-input--error")
    cy.get('input[name="password"]').should('have.class', "oxd-input--error")
  })

  it('User try to login using valid username and valid password while the username is already logged in on other device', () => {
    cy.intercept('GET', '**/dashboard/employees/action-summary').as('summaryRequest')
    
    cy.get('input[name="username"]').type(`${validUsername}`)
    cy.get('input[name="password"]').type(`${validPassword}`)

    cy.get('.orangehrm-login-button').click()

    cy.url().should('include', 'dashboard')

    cy.wait('@summaryRequest').its('response.statusCode').should('equal', 200)

    cy.get('.oxd-userdropdown-img').should('be.visible')
    cy.get('.oxd-brand-banner').should('be.visible')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('exist')
    cy.get('.emp-attendance-chart').should('be.visible')

    cy.get('.orangehrm-login-error').should('not.exist')
  })

})
