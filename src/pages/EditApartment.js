import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { editApartment, getApartment,  destroyApartment } from '../api';


const group = {
  display: "flex",
  flexDirection: 'column',
  margin: 'auto'
}

const input = {
  width: "300px",
  marginBottom: "10px"
}

const label = {
  textAlign: 'left'
}

class EditApartment extends Component {
  constructor(props){
    super(props)
    this.state = {
      editSuccess: false,
      apartment: undefined
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id
    console.log(id)
    getApartment(id)
    .then((apartment) => {
      console.log(`componentdidmount ${apartment}`);
      this.setState({apartment})
    })
  }

  onChange = (e) => {
    let { apartment } = this.state
    apartment[e.target.name] = e.target.value
    this.setState ({
      apartment
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log("got to onSubmit");
    editApartment(this.state.apartment)
    .then(resp => {
      console.log("Edited");
      this.setState({editSuccess: true})
    })
  }

  deleteApt = (e) => {
    console.log("got to onSubmit");
    editApartment(this.state.apartment)
    .then(resp => {
      console.log("Edited");
      destroyApartment(this.props.match.params.id)
      .then(resp => {
        console.log("Deleted");
        this.setState({editSuccess: true});
        this.props.refresh()
      })
    })
  }




  render () {
    let { apartment } = this.state

    console.log(this.state);

  if (this.state.apartment !== undefined) {
    return(
      <div>
        <h3>Edit Apartment</h3><br/>
        <form onSubmit={this.onSubmit}>
        <fieldset>
          <div style={group} className="form-group" >
            <label style={label}>Street 1</label>
            <input style={input} className="form-control" onChange={this.onChange} name="street1" value={apartment.street1}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Street 2</label>
            <input style={input} className="form-control" onChange={this.onChange} name="street2" value={apartment.street2}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>City</label>
            <input style={input} className="form-control" onChange={this.onChange} name="city" value={apartment.city}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Postal Code</label>
            <input style={input} className="form-control" onChange={this.onChange} name="postal_code" value={apartment.postal_code}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>State</label>
            <input style={input} className="form-control" onChange={this.onChange} name="state" value={apartment.state}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Country</label>
            <input style={input} className="form-control" onChange={this.onChange} name="country" value={apartment.country}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Building Manager</label>
            <input style={input} className="form-control" onChange={this.onChange} name="building_manager" value={apartment.building_manager}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Manager Phone</label>
            <input style={input} className="form-control" onChange={this.onChange} name="manager_phone" value={apartment.manager_phone}/>
          </div>

          <div style={group} className="form-group" >
            <label style={label}>Manager Hours</label>
            <input style={input} className="form-control" onChange={this.onChange} name="manager_hours" value={apartment.manager_hours}/>
          </div>

          <button style={{margin: '20px'}} type="submit" className="btn btn-primary">Save</button>
          <button style={{margin: '20px'}} onClick={this.deleteApt} className="btn btn-primary">Delete Apartment</button>
          
          </fieldset>
        </form>
      {this.state.editSuccess && <Redirect to={`/users/${this.state.apartment.user_id}/apartments`}/>}
      </div>
    )
  } else {
    return (
      <div>
        <center>Loading...</center>
      </div>
    )
  }
}

  
}

export default EditApartment;
