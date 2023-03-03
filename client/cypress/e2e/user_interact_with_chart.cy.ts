import { Data } from '@/models/RecordResponse';
import { ChartData } from 'chart.js';

const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:3000';

describe('chart', () => {
  const defaultState = 'Malaysia';
  const defaultAttribute = 'daily';
  const stateToSelect = 'Johor';
  const attributeToSelect = 'blood_a';

  let expectedData: Data[];
  before(() => {
    cy.visit('/');
    cy.waitForReact(1000, `#__next`);
  });

  it('a user can interact with the chart setting and get data wanted', () => {
    //click on states selection and check if checked added and badge number
    cy.wait(3000) //study how to optimize to wait for query completed
      .get('section#donation-chart')
      .react('ForwardedLineChart', { options: { timeout: 10000 } })
      .should('be.visible');

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/yearly/${defaultAttribute}?State=${defaultState}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(prop.datasets[0].data[0].y).to.eq(expectedData[0].value); //to check entire array
      });

    cy.get('section#donation-chart')
      .findByRole('button', {
        name: /listbox-button/i,
      })
      .click();

    cy.findByRole('listbox').contains(/Johor/i).click();

    cy.get('section#donation-chart')
      .findByRole('badge', { name: /selected-quantity/i })
      .should('have.text', '2');

    cy.wait(3000) //study how to optimize to wait for query completed
      .get('section#donation-chart')
      .react('ForwardedLineChart', { options: { timeout: 10000 } })
      .should('be.visible');

    cy.get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(prop.datasets.length).to.eq(2);
      });

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/yearly/${defaultAttribute}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(
          prop.datasets.find((dataset) => dataset.label === stateToSelect)
            .data[0].y
        ).to.eq(expectedData[0].value);
      });
    //check on chart canvas
    //change interval and check if checked and style
    cy.get('section#donation-chart')
      .findByRole('radiogroup')
      .contains('Monthly')
      .click();

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/monthly/${defaultAttribute}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(
          prop.datasets.find((dataset) => dataset.label === stateToSelect)
            .data[0].y
        ).to.eq(expectedData[0].value);
      });
    //check on chart canvas
    //change the attribute, check if checked and text displayed

    cy.get('section#donation-chart')
      .findByRole('button', { name: /dropdown-button/i })
      .click();

    cy.get('section#donation-chart')
      .findByRole('menu')
      .contains('Blood A')
      .click();

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/monthly/${attributeToSelect}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(
          prop.datasets.find((dataset) => dataset.label === stateToSelect)
            .data[0].y
        ).to.eq(expectedData[0].value);
      });
  });
});

export {};
