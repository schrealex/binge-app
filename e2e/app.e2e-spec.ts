import { BingeAppPage } from './app.po';

describe('binge-app App', function() {
  let page: BingeAppPage;

  beforeEach(() => {
    page = new BingeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
