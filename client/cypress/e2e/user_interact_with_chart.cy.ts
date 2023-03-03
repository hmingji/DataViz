import { Data } from '@/models/RecordResponse';
import { ChartData } from 'chart.js';
import { Point } from 'chart.js/dist/helpers/helpers.canvas';

describe('chart', () => {
  const defaultState = 'Malaysia';
  const defaultAttribute = {
    donationSection: 'daily',
    newDonorSection: 'total',
  };
  const stateToSelect = 'Johor';
  const attributeToSelect = {
    donationSection: 'blood_a',
    newDonorSection: 'agegroup17_24',
  };

  let expectedData: Data[];
  before(() => {
    cy.intercept({
      method: 'GET',
      url: '/api/v1/Record/donation/**',
      hostname: 'blood-donation-api.onrender.com',
      https: true,
    }).as('getDonationData');

    cy.intercept({
      method: 'GET',
      url: '/api/v1/Record/newdonor/**',
      hostname: 'blood-donation-api.onrender.com',
      https: true,
    }).as('getNewDonorData');

    cy.visit('/');
    cy.waitForReact(1000, `#__next`);
    cy.wait('@getDonationData').its('response.statusCode').should('equal', 200);
    cy.wait('@getNewDonorData').its('response.statusCode').should('equal', 200);
  });

  it('a user can interact with the chart setting and get data wanted', () => {
    //Donation Section
    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/yearly/${defaultAttribute.donationSection}?State=${defaultState}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets[0].data.forEach((datum, index) => {
          expect((datum as Point).y).to.eq(expectedData[index].value);
        });
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

    cy.wait('@getDonationData').its('response.statusCode').should('equal', 200);

    cy.get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(prop.datasets.length).to.eq(2);
      });

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/yearly/${defaultAttribute.donationSection}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets
          .find((dataset) => dataset.label === stateToSelect)
          ?.data.forEach((datum, index) => {
            expect((datum as Point).y).to.eq(expectedData[index].value);
          });
      });

    cy.get('section#donation-chart')
      .findByRole('radiogroup')
      .contains('Monthly')
      .click();

    cy.wait('@getDonationData').its('response.statusCode').should('equal', 200);

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/monthly/${defaultAttribute.donationSection}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets
          .find((dataset) => dataset.label === stateToSelect)
          ?.data.forEach((datum, index) => {
            expect((datum as Point).y).to.eq(expectedData[index].value);
          });
      });

    cy.get('section#donation-chart')
      .findByRole('button', { name: /dropdown-button/i })
      .click();

    cy.get('section#donation-chart')
      .findByRole('menu')
      .contains('Blood A')
      .click();

    cy.wait('@getDonationData').its('response.statusCode').should('equal', 200);

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/donation/monthly/${attributeToSelect.donationSection}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets
          .find((dataset) => dataset.label === stateToSelect)
          ?.data.forEach((datum, index) => {
            expect((datum as Point).y).to.eq(expectedData[index].value);
          });
      });

    //New Donor Section
    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/newdonor/yearly/${defaultAttribute.newDonorSection}?State=${defaultState}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#newdonor-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets[0].data.forEach((datum, index) => {
          expect((datum as Point).y).to.eq(expectedData[index].value);
        });
      });

    cy.get('section#newdonor-chart')
      .findByRole('button', {
        name: /listbox-button/i,
      })
      .click();

    cy.findByRole('listbox').contains(/Johor/i).click();

    cy.get('section#newdonor-chart')
      .findByRole('badge', { name: /selected-quantity/i })
      .should('have.text', '2');

    cy.wait('@getNewDonorData').its('response.statusCode').should('equal', 200);

    cy.get('section#newdonor-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        expect(prop.datasets.length).to.eq(2);
      });

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/newdonor/yearly/${defaultAttribute.newDonorSection}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#newdonor-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets
          .find((dataset) => dataset.label === stateToSelect)
          ?.data.forEach((datum, index) => {
            expect((datum as Point).y).to.eq(expectedData[index].value);
          });
      });

    cy.get('section#newdonor-chart')
      .findByRole('radiogroup')
      .contains('Monthly')
      .click();

    cy.wait('@getNewDonorData').its('response.statusCode').should('equal', 200);

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/newdonor/monthly/${defaultAttribute.newDonorSection}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#newdonor-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets
          .find((dataset) => dataset.label === stateToSelect)
          ?.data.forEach((datum, index) => {
            expect((datum as Point).y).to.eq(expectedData[index].value);
          });
      });

    cy.get('section#donation-chart')
      .findByRole('button', { name: /dropdown-button/i })
      .click();

    cy.get('section#donation-chart')
      .findByRole('menu')
      .contains('Age Group 17-24')
      .click();

    cy.wait('@getNewDonorData').its('response.statusCode').should('equal', 200);

    cy.request(
      `https://blood-donation-api.onrender.com/api/v1/Record/newdonor/monthly/${attributeToSelect.newDonorSection}?State=${stateToSelect}`
    )
      .then((response) => {
        expectedData = response.body.data;
      })
      .get('section#donation-chart')
      .getReact('ForwardedLineChart')
      .getProps('chartData')
      .should((prop: ChartData<'line'>) => {
        prop.datasets
          .find((dataset) => dataset.label === stateToSelect)
          ?.data.forEach((datum, index) => {
            expect((datum as Point).y).to.eq(expectedData[index].value);
          });
      });
  });
});

export {};
