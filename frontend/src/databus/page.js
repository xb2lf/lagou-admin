class Page {
  constructor() {
    this.currPage = 1;
    this.pageSize = 10;
  }
  setCurrpage(currPage) {
    this.currPage = currPage;
  }
}

export default new Page()