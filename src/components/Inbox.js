import React from 'react'
import Message from './Message'
import axios from 'axios'
import PAYMENT_SERVER_URL from './constants';

class Inbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      usersData:[],
      usersUrl:PAYMENT_SERVER_URL+"/users",
      nounted: false,
      currentSender: "",
      message: "",
      deleteMessage: ""
    }
    this.load = this.load.bind(this)
    this.loadUsersData = this.loadUsersData.bind(this)
    this.normal = this.normal.bind(this)
    this.send = this.send.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.delete = this.delete.bind(this)
  }

  updateUsers(id, user){
    axios.put(`${this.state.usersUrl}/${id}`, user)
    .catch(err => {
      console.log(err)
    })
  }

  load(){
    if(!this.state.mounted){
      this.setState({
        mounted:true
      })
      this.loadUsersData()
      setInterval(this.loadUsersData, 800)
    }
  }

  loadUsersData(){
    axios.get(this.state.usersUrl)
      .then(res => {
        this.setState({ usersData: res.data })
      })
    //console.log(this.state.usersData)
  }

  normal(name, sender){
    this.setState({
      deleteMessage: name,
      currentSender: sender
    })
    console.log(name)
  }

  handleMessageChange(event){
    this.setState({
      message: event.target.value
    })
  }

  send(){
    this.loadUsersData()

    var arr = this.state.usersData
    var i = 0
    for(i = 0; i < arr.length; i++){
      if(arr[i].name==this.state.currentSender){
        var user = arr[i]
        //console.log(arr[i]['_id'])
        var mail = {sender:this.props.currentUser, message: this.state.message}
        user.messages.push(mail)
        //console.log(user)
        this.updateUsers(arr[i]['_id'], user)
      }
    }
    this.delete()
  }

  delete(){
    var arr = this.state.usersData
    var i = 0
    for(i = 0; i < arr.length; i++){
      if(arr[i].name==this.props.currentUser){
        console.log(arr[i].name)
        var user = arr[i]
        var mail = {sender: this.state.currentSender, message: this.state.deleteMessage}
        console.log(mail)
        var messages = user.messages
        console.log(messages)
        var a = 0
        for(a = 0; a < messages.length; a++){
          if(messages[a].sender == mail.sender && messages[a].message == mail.message){
            console.log(a)
            messages.splice(a,1)
          }
        }
        user.messages = messages
        this.updateUsers(arr[i]['_id'],user)
      }
    }
  }

  render(){
    this.load()
    var rra = this.state.usersData
    var a = 0
    var arr = rra[0]
    for(a = 0; a < rra.length; a++)
    {
       if(rra[a].name == this.props.currentUser)
          arr =rra[a]
    }
    var arr2 = []
    var count = 0
    var i = 0
    var list = null
    if(arr!=null){
      //console.log(arr.messages)
      arr = arr.messages
      count = Math.ceil(arr.length/3)
      for(i = 0; i < count; i++)
        arr2.push([])
      var index = 0
      for(i=0; i<arr.length; i++){
        if(arr[i]!=null && arr2[index]!=null)
          arr2[index].push(arr[i])
        if((i+1)%3==0)
          index++
      }

      list = arr2.map((x,index) => {
        return(
          <div className="row">
          {x.map((x,index) => {
            return(
              <Message
                sender = {x.sender}
                message = {x.message}
                onNormal = {this.normal}
                />
            )
          })}
          </div>
        )
      })
    }

    return(
      <div>
        <center>
          <div style={{background:"transparent"}} className="jumbotron">
            <h1 className="jumbotron-heading"><b>Inbox</b></h1>
            <p className="lead text-muted">Communicate. Buy. Sell. Trade.</p>
          </div>
        </center>

        <div className="container-fluid">
          {list}
        </div>

        <div className="modal fade" id="declineModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
			           <h4 className="modal-title" id="myModalLabel">Successfully Declined</h4>
                 <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <p>Transaction with buyer was declined.</p>
              </div>
              <div className="modal-footer">
				          <div className="col-12 text-center">
                    <button type="button" className="btn btn-default btn-block" data-dismiss="modal" onClick={this.delete}>Confirm</button>
				          </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="acceptModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Accept Offer</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="recipient-name" className="form-label"><b>Recipient:</b></label>
                    <p>{this.state.currentSender}</p>
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label"><b>Message:</b></label>
                    <textarea className="form-control" id="message-text" onChange={this.handleMessageChange}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.send}>Confirm</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Inbox
