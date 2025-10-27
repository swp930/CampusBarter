import React from 'react'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Barterfeed from './Barterfeed'
import Inbox from './Inbox'
import Barterlist from './Barterlist'
import Services from './Services'

class Main extends React.Component {
  //<Route exact path ="/" component={Barterlist}/>
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Barterfeed} />
        <Route path="/barterlist" render={() => {
          return (<Barterlist currentUser={this.props.currentUser} />)
        }
        } />
        <Route path="/barterfeed" component={Barterfeed} />
        <Route path="/services" render={() => {
          return (<Services currentUser={this.props.currentUser} />)
        }
        } />
        <Route path="/inbox" render={() => {
          return (<Inbox currentUser={this.props.currentUser} />)
        }
        } />
      </Switch>
    )
  }
}

export default withRouter(Main)
