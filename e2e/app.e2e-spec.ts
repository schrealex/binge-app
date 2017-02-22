import { OvsoftwareAppPage } from './app.po';

describe('ovsoftware-app App', function() {
  let page: OvsoftwareAppPage;

  beforeEach(() => {
    page = new OvsoftwareAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
