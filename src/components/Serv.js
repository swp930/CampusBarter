import React from 'react'

class Serv extends React.Component {
  constructor(props){
    super(props)
    this.reg = this.reg.bind(this)
  }
/*
<div className="col-lg-4 col-md-6 mb-4">
  <div className="box">
    <div className="card-header">
      <div>
      <div className="float-right"><span className="badge badge-pill badge-success">For Sale</span></div>
        <h4 style={{color:"0000ff"}}>Service One</h4>
      </div>
      <div className="card-body">

        <h5>$24.99</h5>
        <i><h6>Seller</h6></i>
        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
        <center><button type="button" className="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#myModal">Purchase</button></center>
      </div>
    </div>
  </div>
</div>
*/
  reg(){
    this.props.onRegister(this.props.owner)
  }

  render(){
    var soldVal = this.props.sold
    var str = this.props.desc
    var n = (130 - str.length)/18
    var arr = []
    var i = 0
    for(i = 0; i < n; i++)
      arr.push(i)
    var list = arr.map((x, index)=>{
      return(<br />)
    })
    console.log(str.length)
    console.log(this.props.sold)
    return(
      //col-lg-4 col-md-6 mb-4
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
              <p className="card-text">{str}</p>
              {soldVal && <center><button type="button" className="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#myModal" onClick={this.reg}>Purchase</button></center>}
            </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Serv
