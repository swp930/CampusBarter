import React from 'react'
import Item from './Item'
import axios from 'axios'
import BACKEND_SERVER_URL from './constants/server';

class Barterlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsUrl: BACKEND_SERVER_URL + "/items",
      usersUrl: BACKEND_SERVER_URL + "/users",
      itemsData: [],
      usersData: [],
      mounted: false,
      name: "",
      owner: "",
      sold: "",
      desc: "",
      currentOwner: "",
      message: ""
    }
    this.loadItemsData = this.loadItemsData.bind(this)
    this.load = this.load.bind(this)
    this.loadUsersData = this.loadUsersData.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOwnerChange = this.handleOwnerChange.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.postItem = this.postItem.bind(this)
    this.register = this.register.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.send = this.send.bind(this)
  }

  load() {
    if (!this.state.mounted) {
      this.setState({
        mounted: true
      })
      this.loadItemsData()
      this.loadUsersData()
      setInterval(this.loadItemsData, 800)
    }
  }

  updateUsers(id, user) {
    axios.put(`${this.state.usersUrl}/${id}`, user)
      .catch(err => {
        console.log(err)
      })
  }

  loadItemsData() {
    axios.get(this.state.itemsUrl)
      .then(res => {
        this.setState({ itemsData: res.data })
      })
  }

  loadUsersData() {
    axios.get(this.state.usersUrl)
      .then(res => {
        this.setState({ usersData: res.data })
      })
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleOwnerChange(event) {
    this.setState({
      owner: event.target.value
    })
  }

  handleMessageChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleCostChange(event) {
    this.setState({
      sold: event.target.value
    })
  }

  handleDescChange(event) {
    this.setState({
      desc: event.target.value
    })
  }

  postItem() {
    let items = this.state.itemsData
    var item = { name: this.state.name, owner: this.state.owner, sold: this.state.sold, desc: this.state.desc }
    axios.post(this.state.itemsUrl, item)
      .catch(err => {
        console.log(err)
        this.setState({ itemsData: items })
      })
  }

  register(name) {
    this.setState({
      currentOwner: name
    })
    //console.log(this.state.currentOwner)
  }

  send() {
    this.loadUsersData()
    var arr = this.state.usersData
    var i = 0
    for (i = 0; i < arr.length; i++) {
      if (arr[i].name === this.state.currentOwner) {
        var user = arr[i]
        console.log(arr[i]['_id'])
        var mail = { sender: this.props.currentUser, message: this.state.message }
        user.messages.push(mail)
        console.log(user)
        this.updateUsers(arr[i]['_id'], user)
      }
    }
  }

  render() {
    this.load()
    var arr = this.state.itemsData
    var arr2 = []
    var i = 0
    var count = Math.ceil(arr.length / 3)
    for (i = 0; i < count; i++)
      arr2.push([])
    var index = 0
    for (i = 0; i < arr.length; i++) {
      arr2[index].push(arr[i])
      if ((i + 1) % 3 === 0)
        index++
    }
    //console.log(arr2)

    var list = arr2.map((x, index) => {
      return (
        <div className="row">
          {x.map((x, index) => {
            return (
              <Item
                name={x.name}
                sold={x.sold}
                owner={x.owner}
                desc={x.desc}
                id={x['_id']}
                onRegister={this.register} />
            )
          })}
        </div>
      )
    })
    return (
      <div>
        <center>
          <div style={{ background: "transparent" }} className="jumbotron">
            <h1 className="jumbotron-heading"><b>Items for Sale</b></h1>
            <p className="lead text-muted">Treat yourself.</p>
            <br />
            <button type="button" className="btn btn-danger btn-lg" data-toggle="modal" data-target="#postModal">Post an item</button>
          </div>
        </center>

        <div className="modal fade" id="postModal" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Post an item</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <label htmlFor="user-name"><b>Name:</b></label>
                <input type="text" className="form-control" id="name" onChange={this.handleNameChange}></input>
                <label htmlFor="service-name" className="col-form-label"><b>Who is the owner of this item?</b></label>
                <input type="text" className="form-control" id="owner" onChange={this.handleOwnerChange}></input>
                <label htmlFor="service-name" className="col-form-label"><b>Is this item for sale? (true or false value)?</b></label>
                <input type="text" className="form-control" id="sold" onChange={this.handleCostChange}></input>
                <label htmlFor="description-text" className="col-form-label"><b>Give a short description of the service:</b></label>
                <textarea className="form-control" id="desc-text" onChange={this.handleDescChange}></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.postItem}>Post</button>
              </div>
            </div>
          </div>
        </div>
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
                    <label htmlFor="recipient-name" className="form-label"><b>Recipient:</b></label>
                    <p>{this.state.currentOwner}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label"><b>Message:</b></label>
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
    )
  }
}

export default Barterlist
