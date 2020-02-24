import {TodoPage} from './todo-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    page.typeInput('todo-owner-input', 'Blanche');

    // All of the todo cards should have the name we are filtering by
    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-owner')).getText()).toEqual('Blanche');
    });
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    page.typeInput('todo-category-input', 'software design');

    // All of the user cards should have the company we are filtering by
    page.getTodoCards().each(e => {
      expect(e.element(by.className('todo-card-category')).getText()).toEqual('software design');
    });
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    page.typeInput('todo-company-input', 'vi');

    // Go through each of the cards that are being shown and get the companies
    let companies = page.getTodoCards().map(e => e.element(by.className('todo-card-category')).getText());

    // We should see these companies
    expect(companies).toContain('video games');

    // We shouldn't see these companies
    expect(companies).not.toContain('software design');
    expect(companies).not.toContain('groceries');
  });

  it('Should type something in the status filter and check that it returned correct elements', () => {
    page.typeInput('todo-status-input', 'true');

    // Go through each of the cards that are being shown and get the owners
    let owners = page.getTodoCards().map(e => e.element(by.className('todo-card-owner')).getText());

    // We should see these users whose age is 27
    expect(owners).toContain('Blanche');
    expect(owners).toContain('Fry');
    expect(owners).toContain('Barry');

    // We shouldn't see these users
    expect(owners).not.toContain('Connie Stewart');
    expect(owners).not.toContain('Lynn Ferguson');
  });

  it('Should change the view', () => {
    page.changeView('list');

    expect(page.getTodoCards().count()).toEqual(0); // There should be no cards
    expect(page.getTodoListItems().count()).toBeGreaterThan(0); // There should be list items
  });


  it('Should click view profile on a todo and go to the right URL', () => {
    page.clickViewProfile(page.getTodoCards().first());

    // When the view profile button on the first todo card is clicked, we should be sent to the right URL
    page.getUrl().then(url => {
      expect(url.endsWith('/todos/588935f57546a2daea44de7c')).toBe(true);
    });

    // On this profile page we were sent to, the owner should be correct
    expect(element(by.className('todo-card-owner')).getText()).toEqual('Blanche');
  });

});
