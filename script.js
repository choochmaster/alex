const imgUrls = ['https://i.gyazo.com/4096b73cf99d5cdfd4a3245aa0927232.png', 'https://i.gyazo.com/08891cbfddebcae492c7a3cde3abe038.png', 'https://i.gyazo.com/0eab66b4c4a21eab4c35739ce598474c.png', 'https://i.gyazo.com/30f3dcd7a8499fdb46582139fdd39f85.png', 'https://i.gyazo.com/b9a58c318e7c1a3001cf9d556732037b.png', 'https://i.gyazo.com/8dd5ba8837417f7322362639b1706d14.png'];


class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  renderImageContent(src, index) {
    return (
      React.createElement("div", { onClick: e => this.openModal(e, index) },
      React.createElement("img", { src: src, key: src })));


  }
  openModal(e, index) {
    this.setState({ currentIndex: index });
  }
  closeModal(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  }
  findPrev(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1 }));

  }
  findNext(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1 }));

  }
  render() {
    return (
      React.createElement("div", { className: "gallery-container" },
      React.createElement("h1", null, "Alex Miller's tantrum \uD83D\uDE2D"),
      React.createElement("div", { className: "gallery-grid" },
      imgUrls.map(this.renderImageContent)),

      React.createElement(GalleryModal, {
        closeModal: this.closeModal,
        findPrev: this.findPrev,
        findNext: this.findNext,
        hasPrev: this.state.currentIndex > 0,
        hasNext: this.state.currentIndex + 1 < imgUrls.length,
        src: imgUrls[this.state.currentIndex] })));



  }}


class GalleryModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnMount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27)
    this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev)
    this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext)
    this.props.findNext();
  }
  render() {
    const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = this.props;
    if (!src) {
      console.log('whut');
      return null;
    }
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "modal-overlay", onClick: closeModal }),
      React.createElement("div", { isOpen: !!src, className: "modal" },
      React.createElement("div", { className: "modal-body" },
      React.createElement("a", { href: "#", className: "modal-close", onClick: closeModal, onKeyDown: this.handleKeyDown }, "\xD7"),
      hasPrev && React.createElement("a", { href: "#", className: "modal-prev", onClick: findPrev, onKeyDown: this.handleKeyDown }, "\u2039"),
      hasNext && React.createElement("a", { href: "#", className: "modal-next", onClick: findNext, onKeyDown: this.handleKeyDown }, "\u203A"),
      React.createElement("img", { src: src })))));




  }}


ReactDOM.render(React.createElement(Gallery, null), document.querySelector('.gallery-container'));