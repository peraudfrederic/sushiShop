import { SushishopPage } from './app.po';

describe('sushishop App', () => {
  let page: SushishopPage;

  beforeEach(() => {
    page = new SushishopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
