import React, { Component, Fragment } from 'react'
import TopNavigation2 from '../component/topContent/TopNavigation2'
import TopCardContent from '../component/topContent/TopCardContent'

export default class HomePage extends Component {
    constructor(props){
        super();
        this.state={
            name: "",
            dp:"",
            uid:""
        }
    }

    componentDidMount(props){
        // this.setState({name:this.props.location.state.name,
        //     dp:this.props.location.state.dp,
        //     uid:this.props.location.state.uid
        // })
        // console.log("property_id",this.state.uid);
    }

    render() {
        // console.log(this.state.name)
        return (
            <Fragment>
                <TopNavigation2/>
                <br/><br/><br/><br/>
                <TopCardContent name={this.state.name} dp={this.state.uid} uid={this.state.uid} firebase={this.state.firebase}/>
            </Fragment>
        )
    }
}
