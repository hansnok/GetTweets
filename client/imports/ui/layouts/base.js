import React from 'react'
import {Meteor} from 'meteor/meteor'
import {FlowRouter} from 'meteor/kadira:flow-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import theme from './styles/theme'
import muiTheme from './styles/mui-theme'
// import Logo from '../components/logo'
import autobind from 'autobind-decorator'
import _ from 'underscore'

const propTypes = {
}

const childContextTypes = {
  muiTheme: React.PropTypes.object
}

const MenuItemStyle = {
  fontFamily: "'Source Sans Pro', sans-serif",
  fontWeight: '300'
}

export default class Layout extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
      muiTheme: _.extend(getMuiTheme(theme), muiTheme),
      open: !this.isSmallDevice()
    }
  }

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme
    }
  }

  getStyles () {
    return {
      content: {
        marginLeft: this.isSmallDevice() ? 0 : 256
      }
    }
  }

  isSmallDevice () {
    return window.innerWidth < 900
  }

  @autobind
  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  @autobind
  handleSignIn () {
    FlowRouter.go('panel')
  }

  @autobind
  onRequestChange (open, type) {
    this.setState({ open })
  }

  renderAppBar () {
    if (this.isSmallDevice()) {
      return (
        <AppBar
          // title={<Logo type='appbar' />}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderAppBar()}
        <Drawer
          open={this.state.open}
          onRequestChange={this.onRequestChange}
          docked={!this.isSmallDevice()}
          overlayStyle={{ zIndex: 900 }}
          containerStyle={{display: 'flex', justifyContent: 'center'}}
        >
          {/* <Logo type='drawer' onTouchTap={() => { FlowRouter.go('index') }} /> */}
          <div style={{display: 'inline-block', width: '100%', margin: 'auto 0'}}>
            <MenuItem innerDivStyle={MenuItemStyle} onTouchTap={() => { FlowRouter.go('index') }}>Home</MenuItem>
            <MenuItem innerDivStyle={MenuItemStyle} onTouchTap={() => { FlowRouter.go('pricing') }}>Planes y servicios</MenuItem>
            <MenuItem innerDivStyle={MenuItemStyle} onTouchTap={() => { FlowRouter.go('faq') }}>FAQ</MenuItem>
            <MenuItem innerDivStyle={MenuItemStyle} onTouchTap={() => { FlowRouter.go('trust-us') }}>Confían en nosotros</MenuItem>
            <MenuItem innerDivStyle={MenuItemStyle} onTouchTap={() => { FlowRouter.go('contact') }}>Contacto</MenuItem>
          </div>
          <RaisedButton
            // label={Meteor.userId() ? 'Panel' : 'Iniciar Sesión'}
            primary
            style={{bottom: '15px', position: 'absolute', left: '50%', transform: 'translate(-50%, 0)'}}
            onTouchTap={() => { FlowRouter.go('login') }}
          />
        </Drawer>
        <div style={this.getStyles().content}>
          {this.props.content()}
        </div>
      </div>
    )
  }
}

Layout.propTypes = propTypes
Layout.childContextTypes = childContextTypes
