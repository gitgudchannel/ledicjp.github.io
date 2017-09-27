import { JosipmePage } from './app.po';

describe('josipme App', () => {
  let page: JosipmePage;

  beforeEach(() => {
    page = new JosipmePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
