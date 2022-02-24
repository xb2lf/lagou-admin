class Page {
  constructor() {
    this.currPage = 1;
    this.pageSize = 10;
    this.currRoute = '#/index/users';
  }
  setCurrpage(currPage) {
    this.currPage = currPage;
  }
  reset() {
    this.currPage = 1;
    this.pageSize = 10;
  }
  setCurrRoute(currRoute) {
    this.currRoute = currRoute
  }
}

export default new Page()