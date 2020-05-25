import React from 'react';

const ViewContacts = (contact) => {
  debugger;

  return (
    <div class="col-sm-4">
      {contact.selectedContacts.FullName != undefined ? <div class="well">
        <h4>View Contact Informtion</h4>
        <div class="container">
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Full Name :</label>
            <div class="col-sm-4 col-form-label">
              <label class="float-left">{contact.selectedContacts.FullName}</label>
            </div>
          </div>


          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Email :</label>
            <div class="col-sm-4 col-form-label">
              <label class="float-left">{contact.selectedContacts.Email}</label>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Phone :</label>
            <div class="col-sm-4 col-form-label">
              <label class="float-left">{contact.selectedContacts.Phone}</label>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Company :</label>
            <div class="col-sm-4 col-form-label">
              <label class="float-left">{contact.selectedContacts.Company}</label>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Address :</label>
            <div class="col-sm-4 col-form-label">
              <label class="float-left">{contact.selectedContacts.Address}</label>
            </div>
          </div>

        </div>
      </div> : <div></div>}


    </div>
  )

}

export default ViewContacts