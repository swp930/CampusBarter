import React from 'react'
import GoogleLogin from 'react-google-login'
import Auth from './../Auth'
import axios from 'axios'
import BACKEND_SERVER_URL from './constants/server';

class Login extends React.Component {
  constructor(props){
    super(props)
    this.responseGoogle = this.responseGoogle.bind(this)
  }
  responseGoogle(response) {
    Auth.authenticateUser(response.w3.ig)
    console.log(response)
    axios.get(BACKEND_SERVER_URL+"/users/acc/"+response.w3.ig).then(res => {
      console.log(res)
    })
    //window.location.reload();
  }
  render(){
    return(
      <div>
        <link href="https://www.w3schools.com/w3css/4/w3.css" rel="stylesheet" />
        <div className="w3-content" style={{maxWidth:"1500px"}}>
        <div className="w3-opacity">
          <br></br><br></br>
          <div className="w3-clear"></div>
            <header className="w3-center w3-margin-bottom">
              <h1 className="w3-wide w3-jumbo" style={{textShadow:"1px 1px 0 #444"}}><b>CampusBarter</b></h1>
              <p><b>An e-commerce service made <i>by</i> college students <i>for</i> college students.</b></p>
            </header>
          </div>
        </div>
        <p className="w3-padding-16 w3-center">
          <GoogleLogin
            clientId="280288549581-ck2ju1cmobc3t6mpd8fo11cjhnsjqtt9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            />
        </p>
      </div>
    )
  }
}

export default Login
