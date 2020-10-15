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
                <a className="nav-link" onClick={this.itemClicked} href="#">{this.props.itemLabel}</a>
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
        const rating = Math.random() * 100;
        return (
            <div className="card" style={{ width: '20em' }}>
                <InteractiveIcon iconURL={this.props.state.iconURL} />
                <div className="card-body" >
                    <TextComponent text={this.props.state.text} />
                </div>
                <RatingWithStars rating={rating} />
                {this.props.children}
            </div>
        );
    }
}

class RatingWithStars extends React.Component {
    render() {
        const stars = [1, 2, 3, 4, 5];
        const size = { width: "2rem" };
        const colorRGB = '255,255,0';
        const rating = this.props.rating ? this.props.rating : '0';
        const background = {
            backgroundImage: `linear-gradient(90deg, rgba(${colorRGB},1) ${rating}%, rgba(${colorRGB},0) 0, rgba(${colorRGB},0) 100%)`,
            display: 'inline-block'
        };
        return (
            <div>
                <span style={background}>{
                    stars.map(() => <img style={size} src="./images/star_transparent.png"></img>)
                }
                </span>
            </div>
        )
    }
}

class ServicesForm extends React.Component {

    render() {
        const state = [{
            key: 1,
            iconURL: 'images/uidesign.png',
            text: 'User Interface Design'
        },
        {
            key: 2,
            iconURL: 'images/conceptideas.png',
            text: 'Concept and Ideas'
        },
        {
            key: 3,
            iconURL: 'images/designbranding.png',
            text: 'Design and Branding'
        }];
        return (
            <div className="container">
                <NavigationBar />
                <section className="row">{
                    state.map(item => (<InteractiveComponent className="col-sm" state={item} ></InteractiveComponent>))
                }
                </section>
            </div>
        );
    }
}

ReactDOM.render(
    <ServicesForm />,
    document.getElementById('app')
);
