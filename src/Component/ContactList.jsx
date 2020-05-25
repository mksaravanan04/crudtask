import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ViewContacts from './ViewContacts';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

let localstrgData = [];

class ContactList extends Component {
  constructor() {
    super();

    this.state = {
      arrContactsInfo: [],
      isModalOpen: false,
      txtAddress: "",
      txtFullName: "",
      txtEmail: "",
      txtPhone: "",
      txtCompany: "",
      txtSrchValue: "",
      EditID: "",
      fullnameValid: "",
      emailValid: "",
      phoneValid: "",
      companyValid: "",
      addressValid: "",
      selectedItems: "",
    }
    this.handleChange = this.handleChange.bind(this);

  }


  //to get the source data from the local storage
  componentDidMount() {
    localstrgData = JSON.parse(localStorage.getItem('ContactInfo'))
    if (localstrgData) {
      this.setState({ arrContactsInfo: localstrgData })
    }
  }

  //bindContacts used to bind the contact information in the table
  bindContacts() {
    return this.state.arrContactsInfo.map(element => {
      return (
        <tr>
          <td class="cursor-pointer" onClick={this.handleViewContacts.bind(this, element)} id="viewcontact">{element.FullName}
          </td>
          <td>{element.Company}</td>
          <td>
            <span class="fa fa-edit cursor-pointer" style={{ padding: "5%", color: "blue" }} onClick={this.handleEditItem.bind(this, element)} id="edit" />
            <span class="fa fa-trash-o cursor-pointer" style={{ color: "red" }} onClick={this.handleEditItem.bind(this, element)} id="delete" />
          </td>
        </tr>
      )
    })
  }

  handleViewContacts(selectedItems) {
    this.setState({ selectedItems: selectedItems });
  }

  //handling the onchange and onclick event of this component
  handleChange(event) {
    let fieldID = event.target.id
    switch (fieldID) {
      case "searchbox":
        if (event.key != "Enter") {
          this.setState({ txtSrchValue: event.target.value });
        }
        else {
          let filteredValue = localstrgData.filter(element => {
            return element.FullName.toLowerCase().indexOf(this.state.txtSrchValue.toLowerCase()) > -1
          })
          this.setState({ arrContactsInfo: filteredValue });
        }
        break;
      case "addcontact":
        this.setState({ isModalOpen: true });
        break;

      case "fullname":
        let fnValidationmsg = event.target.value != "" ? (this.checkValidation("fullname", event.target.value)) : "Please Enter Full Name";
        this.setState({ txtFullName: event.target.value, fullnameValid: fnValidationmsg });
        break;

      case "email":
        let emailValidationmsg = event.target.value != "" ? (this.checkValidation("email", event.target.value)) : "Please Enter Email";
        this.setState({ txtEmail: event.target.value, emailValid: emailValidationmsg });
        break;

      case "phone":
        let phoneValidationmsg = event.target.value != "" ? (this.checkValidation("phone", event.target.value)) : "Please Enter Phone Number";
        this.setState({ txtPhone: event.target.value, phoneValid: phoneValidationmsg });
        break;

      case "company":
        let companyValidationmsg = event.target.value == "" ? "Please Enter Company Name" : "";
        this.setState({ txtCompany: event.target.value, companyValid: companyValidationmsg });
        break;
      case "address":
        let addressValidationmsg = event.target.value == "" ? "Please Enter Address" : "";
        this.setState({ txtAddress: event.target.value, addressValid: addressValidationmsg });
        break;
      case "searchicon":
        let filteredValue = localstrgData.filter(element => {
          return element.FullName.toLowerCase().indexOf(this.state.txtSrchValue.toLowerCase()) > -1
        })
        this.setState({ arrContactsInfo: filteredValue });
        break;

      case "save":
        let fnErrmsg = this.state.txtFullName != "" ? (this.checkValidation("fullname", this.state.txtFullName)) : "Please Enter Full Name";
        let emailErrmsg = this.state.txtEmail != "" ? (this.checkValidation("email", this.state.txtEmail)) : "Please Enter Email";
        let phoneErrmsg = this.state.txtPhone != "" ? (this.checkValidation("phone", this.state.txtPhone)) : "Please Enter Phone Number";
        let companyErrmsg = this.state.txtCompany == "" ? "Please Enter Company Name" : "";
        let addressErrmsg = this.state.txtAddress == "" ? "Please Enter Address" : "";

        if (fnErrmsg == "" && emailErrmsg == "" && phoneErrmsg == "" && companyErrmsg == "" && addressErrmsg == "") {
          let uniqueID = Math.floor(Math.random() * 100)
          let newValue = { ID: uniqueID, FullName: this.state.txtFullName, Email: this.state.txtEmail, Phone: this.state.txtPhone, Company: this.state.txtCompany, Address: this.state.txtAddress };
          let existingData = JSON.parse(localStorage.getItem('ContactInfo') || "[]")
          existingData != null ? existingData.splice(0, 0, newValue) : existingData.push(newValue);
          localStorage.setItem('ContactInfo', JSON.stringify(existingData))
          localstrgData = JSON.parse(localStorage.getItem('ContactInfo'));
          this.setState({ isModalOpen: false, arrContactsInfo: localstrgData, EditID: "", txtAddress: "", txtCompany: "", txtEmail: "", txtFullName: "", txtPhone: "" });
        }
        else {
          this.setState({ companyValid: companyErrmsg, addressValid: addressErrmsg, emailValid: emailErrmsg, phoneValid: phoneErrmsg, fullnameValid: fnErrmsg })
        }
        break;
      case "cancel":
        this.setState({ isModalOpen: false, EditID: "", txtFullName: "", txtEmail: "", txtCompany: "", txtAddress: "", txtPhone: "", companyValid: "", addressValid: "", emailValid: "", phoneValid: "", fullnameValid: "" });
        break;
      case "update":

        if (this.state.fullnameValid == "" && this.state.emailValid == "" && this.state.phoneValid == "" && this.state.companyValid == "" && this.state.addressValid == "") {

          let modifiedValue = { ID: this.state.EditID, FullName: this.state.txtFullName, Email: this.state.txtEmail, Phone: this.state.txtPhone, Company: this.state.txtCompany, Address: this.state.txtAddress };
          let existingData = JSON.parse(localStorage.getItem('ContactInfo') || "[]")

          let itemIndex = existingData.filter((element, index) => {
            if (element.ID == this.state.EditID)
              return index
          })
          existingData.splice(itemIndex, 1)
          existingData.splice(0, 0, modifiedValue);
          localStorage.setItem('ContactInfo', JSON.stringify(existingData))
          localstrgData = JSON.parse(localStorage.getItem('ContactInfo'));
          this.setState({ isModalOpen: false, arrContactsInfo: localstrgData, EditID: "", txtAddress: "", txtCompany: "", txtEmail: "", txtFullName: "", txtPhone: "" });
        }
        else {
          this.setState({ companyValid: companyErrmsg, addressValid: addressErrmsg, emailValid: emailErrmsg, phoneValid: phoneErrmsg, fullnameValid: fnErrmsg })
        }
        break;


    }

  }

  handleEditItem(selectedItems, event) {
    if (event.target.id == "edit") {
      this.setState({ isModalOpen: true, EditID: selectedItems.ID, txtAddress: selectedItems.Address, txtCompany: selectedItems.Company, txtEmail: selectedItems.Email, txtFullName: selectedItems.FullName, txtPhone: selectedItems.Phone });
    }
    //handling the delete scenario
    else {
      let existingData = JSON.parse(localStorage.getItem('ContactInfo') || "[]")
      let selectedItemIndex = existingData.filter((element, index) => {
        if (element.ID == selectedItems.ID) {
          return index
        }
      })
      existingData.splice(selectedItemIndex, 1);
      localStorage.setItem('ContactInfo', JSON.stringify(existingData))
      localstrgData = JSON.parse(localStorage.getItem('ContactInfo'));
      this.setState({ arrContactsInfo: localstrgData })
    }

  }


  //check the validation for the below fields
  checkValidation(fieldName, fieldValue) {
    switch (fieldName) {
      case 'fullname':
        return /^[A-Za-z_ ]+$/.test(fieldValue) == false ? "Please Enter Valid FullName" : "";
      case 'email':
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue) == false ? "Please Enter Valid Email" : "";
      case 'phone':
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(fieldValue) == false ? "Please Enter Valid Number" : "";
    }
  }


  //render method to bind the html source code 
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-8">
            <div class="list-header-container">
              <div class="contact-header col-sm-4">
                <h2>Contacts</h2>
              </div>
              <div class="add-contact col-sm-12">

                <input type='text' class='searchbox col-sm-4' placeholder="Search Contact" value={this.state.txtSrchValue} onChange={this.handleChange} onKeyPress={this.handleChange} id="searchbox" />
                <span class="input-group-addon">
                  <i class="fa fa-search search-icon" onClick={this.handleChange} id="searchicon"></i>
                </span>
                <a onClick={this.handleChange} id="addcontact" class="btn btn-info btn-add-contact col-sm-3">
                  <span class="fa fa-plus"></span> Add Contact
        </a>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.bindContacts()}
              </tbody>
            </table>
          </div>

          <ViewContacts selectedContacts={this.state.selectedItems} />

          {/* to get the contact details form inside the below path, In this CRUD we are having only one page, so thats y i haven't created the seperate component file for this modal */}
          <Modal open={this.state.isModalOpen} closeOnOverlayClick={false} closeOnEsc={false}>
            <div id="myModal">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Contact Details</h4>
                  <button type="button" class="close" data-dismiss="modal" id="cancel" onClick={this.handleChange}>&times;</button>
                </div>

                <div class="container">
                  <div class="modal-body">
                    <div class="form-group row">
                      <label class="control-label col-sm-2">Full Name<span class="required">*</span></label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="fullname" value={this.state.txtFullName} onChange={this.handleChange} placeholder="Enter FullName" />
                      </div>
                      <div class="col-sm-4">
                        <span class="text-danger">{this.state.fullnameValid}</span>
                      </div>
                    </div>



                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Email <span class="required">*</span> </label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="email" value={this.state.txtEmail} onChange={this.handleChange} placeholder="Enter Email" />
                      </div>
                      <div class="col-sm-4">
                        <span class="text-danger">{this.state.emailValid}</span>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Phone <span class="required">*</span> </label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" maxLength={10} id="phone" value={this.state.txtPhone} onChange={this.handleChange} placeholder="Enter Phone" />
                      </div>
                      <div class="col-sm-4">
                        <span class="text-danger">{this.state.phoneValid}</span>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Company <span class="required">*</span> </label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="company" value={this.state.txtCompany} onChange={this.handleChange} placeholder="Enter Company" />
                      </div>
                      <div class="col-sm-4">
                        <span class="text-danger">{this.state.companyValid}</span>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Address <span class="required">*</span></label>
                      <div class="col-sm-6">
                        <textarea class="form-control" id="address" value={this.state.txtAddress} onChange={this.handleChange} placeholder="Enter Contact Address" />
                      </div>
                      <div class="col-sm-4">
                        <span class="text-danger">{this.state.addressValid}</span>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id={this.state.EditID != "" ? "update" : "save"} onClick={this.handleChange}>{this.state.EditID != "" ? "Update" : "Save"}</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancel" onClick={this.handleChange}>Cancel</button>
                  </div>
                </div>

              </div>
            </div>
          </Modal>
        </div>
      </div>
    )
  }

}


export default ContactList
