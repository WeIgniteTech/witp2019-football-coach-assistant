import React,{useContext} from 'react'
import ReactDOM from 'react-dom';
import AutoResponsive from 'autoresponsive-react'
import {PlayerResourceContext} from '../ApiPlayerResourceProvider/ApiPlayerResourceProvider'
import Players from '../Players.json'

let style = {
    height: 200,
    width: 200,
    cursor: 'default',
    color: '#514713',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#a28f27',
    borderColor: '#796b1d',
    fontSize: '30px',
    lineHeight: '100px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #ab9a3c',
    userSelect: 'RED',
    margin: '10px'
};

let selectedStyle = {
    height: 150,
    width: 150,
    cursor: 'default',
    color: 'black',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#808080',
    borderColor: '#796b1d',
    fontSize: '30px',
    lineHeight: '100px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #ab9a3c',
    userSelect: 'BLUE',
    margin: '10px'
};


class DisplayPlayers extends React.Component {

   static PlayersContext = PlayerResourceContext;
   static playerResource=PlayerResourceContext
    selectPlayer(e, key) {
        var selectedPlayers = this.state.selectedPlayers;
        if (selectedPlayers.has(key)) {
            selectedPlayers.delete(key)
        } else {
            this.state.selectedPlayers.add(key);
        }
        this.setState(this.state);
        // this.state.selectedPlayers will contain all the players that are selected .
        console.log(selectedPlayers);
    };


    constructor(props) {
        
      super(props);
        this.state = {
           playerList:Players,
            itemMargin: 10,
            horizontalDirection: 'left',
            verticalDirection: 'top',
            containerWidth: 800,
            selectedPlayers: new Set()
        };
        this.frame = 30;
    }

    componentDidMount() {
        
        window.addEventListener('resize', () => {
            this.setState({
                containerWidth: ReactDOM.findDOMNode(this.refs.container).clientWidth-ReactDOM.findDOMNode(this.refs.container).clientWidth*0.4
            });
        }, false);
    }

    getAutoResponsiveProps() {
        return {
            horizontalDirection: this.state.horizontalDirection,
            verticalDirection: this.state.verticalDirection,
            itemMargin: this.state.itemMargin,
            containerWidth: this.state.containerWidth || this.props.containerWidth,
            itemClassName: 'item',
            containerHeight: this.state.containerHeight,
            transitionDuration: '.8',
            transitionTimingFunction: 'easeIn',
            position: 'relative',
            marginLeft: '50px'

        };
    }

    render() {
          
        return (
            <div>
               
                
                <PlayerResourceContext.Consumer ref="container">  
                {value=>
                (<AutoResponsive  {...this.getAutoResponsiveProps()}>
                { this.renderItems(value)}
                </AutoResponsive>)
                }
                </PlayerResourceContext.Consumer>
                              
            </div>
        );
    }


    renderItems(pp) {
         return pp.map(i => this.renderItem(i, this.state.selectedPlayers.has(i.name) ? selectedStyle : style));
    }

    renderItem(i, styleToUse) {
        return (
            <div className="item" key={i.name} onClick={(e) => this.selectPlayer(e, i.name)} style={styleToUse}>
                {i.name}
            </div>
        )
    }
}

export default DisplayPlayers