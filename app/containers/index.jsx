import React from 'react'
import Header  from '../components/Header'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {CITYNAME} from '../config/localStoreKey'
import LocalStore from '../util/localStore'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {initDone : false}
    }
    render() {
        return (
            <div>
                {/*<Hello />*/}
                <Header title="This is Title"/>
                {this.state.initDone ? this.props.children : <div>loading...</div>}
            </div>
        )
    }

    componentDidMount(){
        let cityName = LocalStore.getItem(CITYNAME)
        //从localstorage获取
        if(cityName == null){
            cityName = '北京'
        }
        //console.log(cityName)

        this.props.userInfoActions.update({
            cityName: cityName
        })




        this.setState({
            initDone:true
        })

        // //var that = this,作用域问题，解决方案1 用一个var存下来，方案2 用箭头函数
        // setTimeout(() =>{
        //     this.setState({initDone:true})
        // }, 1000)
    }
}


function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
