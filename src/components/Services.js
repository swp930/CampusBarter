import React from 'react'
import axios from 'axios'
import Serv from './Serv'
import BACKEND_SERVER_URL from './constants/server';

class Services extends React.Component {
  constructor(props){
    super(props)
    this.state  = {
      servicesUrl: BACKEND_SERVER_URL+"/services",
      usersUrl: BACKEND_SERVER_URL+"/users",
      servicesData:[],
      usersData:[],
      mounted:false,
      name: "",
      owner: "",
      sold: "",
      desc: "",
      currentOwner: "",
      message: ""
    }
    this.load = this.load.bind(this)
    this.loadServicesData = this.loadServicesData.bind(this)
    this.loadUsersData = this.loadUsersData.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOwnerChange = this.handleOwnerChange.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.register = this.register.bind(this)
    this.postService = this.postService.bind(this)
    this.send = this.send.bind(this)
  }

  load(){
    if(!this.state.mounted){
      this.setState({
        mounted:true
      })
      this.loadServicesData()
      this.loadUsersData()
      setInterval(this.loadServicesData, 800)
    }
  }

  loadServicesData(){
    axios.get(this.state.servicesUrl)
      .then(res => {
        this.setState({ servicesData: res.data })
      })
      console.log(this.state.servicesData)
  }

  updateUsers(id, user){
    axios.put(`${this.state.usersUrl}/${id}`, user)
    .catch(err => {
      console.log(err)
    })
  }

  loadUsersData(){
    axios.get(this.state.usersUrl)
      .then(res => {
        this.setState({ usersData: res.data })
        console.log("Loading user data")
      })
  }

  handleNameChange(event){
    this.setState({
      name: event.target.value
    })
  }

  handleOwnerChange(event){
    this.setState({
      owner: event.target.value
    })
  }

  handleCostChange(event){
    var soldVal = event.target.value != "true"
    this.setState({
      sold: event.target.value
    })
  }

  handleDescChange(event){
    this.setState({
      desc: event.target.value
    })
  }

  register(name){
    this.setState({
      currentOwner: name
    })
    //console.log(this.state.currentOwner)
  }

  postService(){
    let services = this.state.servicesData
    var service = {name:this.state.name, owner:this.state.owner, sold:this.state.sold, desc:this.state.desc}
    let newServices = services.concat([service])
    axios.post(this.state.servicesUrl, service)
      .catch(err => {
        console.log(err)
        this.setState({ servicesData: services})
      })
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
      if(arr[i].name==this.state.currentOwner){
        var user = arr[i]
        console.log(arr[i]['_id'])
        var mail = {sender:this.props.currentUser, message: this.state.message}
        user.messages.push(mail)
        console.log(user)
        this.updateUsers(arr[i]['_id'], user)
      }
    }
  }

  render() {
    this.load()
    var arr = this.state.servicesData
    var arr2 = []
    var count = Math.ceil(arr.length/3)
    var i = 0
    for(i =0; i < count; i++)
      arr2.push([])
    var index = 0
    for(i=0; i < arr.length; i++){
      arr2[index].push(arr[i])
      if((i+1)%3==0)
        index++
    }
    var list = arr2.map((x, index) => {
      return(
        <div className="row">
        {x.map((x, index) => {
          return(
            <Serv
              name = {x.name}
              owner = {x.owner}
              sold = {x.sold}
              desc = {x.desc}
              onRegister={this.register}
              />
          )
        })}
        </div>
      )
    })
    return(

      <div>
        <center>
          <div style={{background:"transparent"}} className="jumbotron">
            <h1 className="jumbotron-heading"><b>Services</b></h1>
            <p className="lead text-muted">Any task. This second.</p>
            <br / >
		 <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#postModal">Post a Service</button>
          </div>
        </center>

        <div className="modal fade" id="postModal" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Post a Service</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
				<label for="user-name"><b>Name:</b></label>
                <input type="text" className="form-control" id="name" onChange={this.handleNameChange}></input>
                <label for="service-name" className="col-form-label"><b>Who is the owner of this item?</b></label>
                <input type="text" className="form-control" id="owner" onChange={this.handleOwnerChange}></input>
				<label for="service-name" className="col-form-label"><b>Is this service for sale? (true or false value)?</b></label>
                <input type="text" className="form-control" id="sold" onChange={this.handleCostChange}></input>
                <label for="description-text" className="col-form-label"><b>Give a short description of the service:</b></label>
                <textarea className="form-control" id="desc-text" onChange={this.handleDescChange}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.postService}>Post</button>
            </div>
            </div>
          </div>
        </div>

        <div className="container-fluid content-row">
          <div className="col-lg-12">
            {list}
          </div>
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Send Message</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label for="recipient-name" className="form-label"><b>Recipient:</b></label>
                      <p>{this.state.currentOwner}</p>
                    </div>
                    <div className="form-group">
                      <label for="message-text" className="col-form-label"><b>Message:</b></label>
                      <textarea className="form-control" id="message-text" onChange={this.handleMessageChange}></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.send}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    )
  }
}

export default Services
