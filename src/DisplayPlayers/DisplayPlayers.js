import React, {useContext} from 'react'
import ReactDOM from 'react-dom';
import AutoResponsive from 'autoresponsive-react'
import PlayerResourceContext from "../ApiPlayerResourceProvider/ApiPlayerResourceProvider";
import axios from "axios";
import Popup from "reactjs-popup";
import ChoosePlayer from "../ChoosePlayer/choosePlayerModal";
import "../index.css";



let style = {
    height: 150,
    width: 150,
    cursor: 'default',
    color: '#514713',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#808080',
    borderColor: '#796b1d',
    fontSize: '30px',
    lineHeight: '100px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #ab9a3c',
    userSelect: 'RED',
    margin: '10px'
};

let buttonStyle = {
    height: 50,
    width: 150,
    cursor: 'default',
    color: '#FFFFFF',
    borderRadius: 5,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#1a1300',
    borderColor: '#796b1d',
    fontSize: '10px',
    lineHeight: '10px',
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
    backgroundColor: '#808000',
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
            playerList: new Array(), // not really need to initialise it here , just for the demo purposes .
            itemMargin: 10,
            horizontalDirection: 'left',
            verticalDirection: 'top',
            selectedPlayers: new Set(),
            teams: new Array()

        };
        this.frame = 30;
    }


    componentDidMount() {

        window.addEventListener('resize', () => {

            this.setState({
                containerWidth: (ReactDOM.findDOMNode(this.refs.container).clientWidth - ReactDOM.findDOMNode(this.refs.container).clientWidth) * 0.4
            });
        }, false);
        this.setState({
            containerWidth: (ReactDOM.findDOMNode(this.refs.container).clientWidth - ReactDOM.findDOMNode(this.refs.container).clientWidth) * 0.2
        });
        this.loadPlayers();
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
            marginLeft: '10px'

        };
    }

    async loadPlayers() {
        const promise = await axios.get("http://localhost:3000/api/players");
        const status = promise.status;
        if (status === 200) {
            const data = promise.data;
            this.setState({playerList: data});
        }
    }

    verifyPlayers(event){
      if(this.state.selectedPlayers.size==0){
          this.setState({
              errorMsg:"Please select attaending "
          })
      }
    }
    render() {

        return (
            <div>
                <div>
                    <Popup contentStyle={{ width: 90 + '%', height: 80 + '%' }} modal trigger={<button type="button" key="5" className="modal" style={buttonStyle} >Team Distribution</button>}>
                        {close => <ChoosePlayer close={close} attendingPlayers={this.state.selectedPlayers} />}
                    </Popup>
                </div>
                <div>{this.state.errorMsg ? <span
                    style={{ fontSize: 14, fontWeight: 'bold', color: 'RED' }}>{this.state.errorMsg}</span> : null}
                </div>
                <div className="displayPlayers">
                    <AutoResponsive ref="container" {...this.getAutoResponsiveProps()} >
                        {this.renderItems(this.state.playerList)}
                    </AutoResponsive>
                </div>
            </div>
        );
    }

    renderItems(pp) {
        console.log(pp);
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