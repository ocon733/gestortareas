import { GestortareasPage } from './app.po';

describe('gestortareas App', () => {
  let page: GestortareasPage;

  beforeEach(() => {
    page = new GestortareasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
