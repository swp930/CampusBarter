import React from 'react'

class Item extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.reg = this.reg.bind(this)
  }

  handleClick(event){
    var num = parseInt(event.currentTarget.dataset.id)
    alert(num)
  }

  reg(){
    this.props.onRegister(this.props.owner)
  }

  render() {
    var soldVal = this.props.sold
    //console.log(this.props.sold)
    return(
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="box">
          <div className="card-header">
            <div>
            {soldVal && <div className="float-right"><span className="badge badge-pill badge-success">For Sale</span></div>}
            {!soldVal && <div className="float-right"><span className="badge badge-pill badge-danger">Sold</span></div>}
              <h4 style={{color:"0000ff"}}>{this.props.name}</h4>
            </div>
            <div className="card-body">
              <i><h6>{this.props.owner}</h6></i>
              <p className="card-text">{this.props.desc}</p>
              {soldVal && <center><button type="button" className="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#myModal" data-id="1" onClick={this.reg}>Purchase</button></center>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Item
