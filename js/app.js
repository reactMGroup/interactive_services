class InteractiveIcon extends React.Component {

    constructor() {
        super();
        this.setMouseOverBackground = this.setMouseOverBackground.bind(this);
        this.setMouseLeaveBackground = this.setMouseLeaveBackground.bind(this);
    }

    setMouseOverBackground() {
        ReactDOM.findDOMNode(this).classList.add('iconMoseOver');
    }

    setMouseLeaveBackground() {
        ReactDOM.findDOMNode(this).classList.remove('iconMoseOver');
    }

    render() {
        return (
            <img className="card-img-top" style={{ height: '18em', width: '18em' }}
                onMouseLeave={this.setMouseLeaveBackground}
                onMouseEnter={this.setMouseOverBackground}
                src={this.props.iconURL} />
        );
    }
}

class NavigationBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <MenuItem itemLabel="Services" />
                    <MenuItem itemLabel="Work" />
                    <MenuItem itemLabel="The team" />
                </ul>
            </nav>
        );
    }
}

class MenuItem extends React.Component {
    constructor() {
        super();
        this.itemClicked = this.itemClicked.bind(this);
    }

    itemClicked() {
        let clickedItem = ReactDOM.findDOMNode(this);
        Array.from(clickedItem.parentElement.childNodes)
            .forEach(menuItem => menuItem.classList.remove('withBold'));
        clickedItem.classList.add('withBold');
    }

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link"  onClick={this.itemClicked} href="#">{this.props.itemLabel}</a>
            </li>
        );
    }
}

class TextComponent extends React.Component {

    constructor() {
        super();
        this.addBorder = this.addBorder.bind(this);
    }

    addBorder() {
        const element = ReactDOM.findDOMNode(this);
        element.classList.add('withBorder');
        setTimeout(
            function () {
                element.classList.remove('withBorder');
            }
            , 3000);

    }

    render() {
        return (
            <div className="card-title" onMouseEnter={this.addBorder} >{this.props.text}</div>
        )
    }
}

class InteractiveComponent extends React.Component {

    render() {
        return (
            <div className="card" style={{ width: '20em' }}>
                <InteractiveIcon iconURL={this.props.iconURL} />
                <div className="card-body" >
                    <TextComponent text={this.props.text} />
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <div className="container">
        <NavigationBar />
        <section className="row">
            <InteractiveComponent className="col-sm" iconURL='images/uidesign.png' text='User Interface Design' />
            <InteractiveComponent className="col-sm" iconURL='images/conceptideas.png' text='Concept and Ideas' />
            <InteractiveComponent className="col-sm" iconURL='images/designbranding.png' text='Design and Branding' />
        </section>
    </div>,
    document.getElementById('app')
);
