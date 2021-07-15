describe('Tests URL shortening and redirect', () => {
    it('Visits root url', () => {
       cy.visit('http://localhost:3000')
       cy.url().should('eq', 'http://localhost:3000/')
    })
    it('Inputs https://www.google.com and clicks submit', () => {
        cy.get('.url-input').type('https://www.google.com').should('have.value', 'https://www.google.com')
        cy.get('.button').click()
        cy.get('.url-output').should('contain', 'http://localhost:8080/')
    })
    it('Clicks the output URL and redirects to https://www.google.com', () => {
        cy.get('.output-link').click()
        cy.url().should('eq', 'https://www.google.com/')
    })
})

describe('Tests non valid URL input', () => {
    it('Visits root url', () => {
        cy.visit('http://localhost:3000')
        cy.url().should('eq', 'http://localhost:3000/')
    })
    it('Inputs non-valid URL and clicks submit', () => {
        cy.get('.url-input').type('www.google.com').should('have.value', 'www.google.com')
        cy.get('.button').click()
    })
    it('Checks error message', () => {
        cy.get('.error-message').should('have.text', 'Input must be a valid URL (http:// or https://)')
    })
})

describe('Test Backend', () => {
    it('POST URL and recieve slug', () => {
        cy.request('POST', 'http://localhost:8080/shorten-url', {urlInput: 'https://www.google.com'}).then(
            (response) => {
                expect(response.body.slug).to.have.lengthOf(7)
            }
        )
    })
})
