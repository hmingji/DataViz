import { ChartData } from 'chart.js';

const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:3000';

describe('chart', () => {
  it('a user can interact with the chart setting and get data wanted', () => {
    cy.visit('/');
    //click on states selection and check if checked added and badge number
    cy.get('section#donation-chart')
      .findByRole('button', {
        name: /listbox-button/i,
      })
      .click()
      .findByRole('listbox')
      .findByDisplayValue(/Johor/i)
      .click()
      .findByRole('badge', { name: /selected-quantity/i })
      .should('have.value', 2)
      .getReact('LineChart')
      .getProps('chartData')
      .then((chartData: ChartData<'line'>) => {
        expect(chartData.datasets.length).to.equal(2);
      });

    //check on chart canvas
    //change interval and check if checked and style
    //check on chart canvas
    //change the attribute, check if checked and text displayed
  });
});

export {};
