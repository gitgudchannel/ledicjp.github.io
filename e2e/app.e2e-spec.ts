import { JosipPage } from './app.po';

describe('josip App', () => {
  let page: JosipPage;

  beforeEach(() => {
    page = new JosipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
