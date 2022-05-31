///<reference types="Cypress"/>

describe('intercept with cypress examples',()=>{

    it('test api with sample intercept',()=>{


        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept({
            path: '/posts'
        }).as('posts')



        //cy.get("body.px-2:nth-child(2) main.container.mx-auto.max-w-4xl:nth-child(4)").click()
        //cy.get("body > div > main > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a").click()
        cy.get("table:nth-of-type(1) a[href='posts']").click()

        cy.wait('@posts').then(inter =>{

            cy.log(JSON.stringify(inter))
            consol.log(JSON.stringify(inter))

            expect(inter.response.body).to.have.length(100)
        })


    })



    it.only('mocking with intercept test with static response',()=>{

        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept('GET','/posts',{totalpost:5,name:'TestAutomation'}).as('posts')
        

        cy.get("table:nth-of-type(1) a[href='posts']").click()
        cy.wait('@posts')
    })

    
    it.only('mocking with intercept test with dynamic fixture',()=>{

        cy.visit('https://jsonplaceholder.typicode.com/')
        
        cy.intercept('GET','/posts',{fixture: 'createuser.json'}).as('posts')

        cy.get("table:nth-of-type(1) a[href='posts']").click()
        cy.wait('@posts')
    })


})