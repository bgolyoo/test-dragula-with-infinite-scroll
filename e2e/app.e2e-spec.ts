import { TestDragulaWithInfiniteScrollPage } from './app.po';

describe('test-dragula-with-infinite-scroll App', () => {
  let page: TestDragulaWithInfiniteScrollPage;

  beforeEach(() => {
    page = new TestDragulaWithInfiniteScrollPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
