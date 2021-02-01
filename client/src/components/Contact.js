import React from 'react';
import './Contact.css';

export default function Contact() {

  return (<div className="contact">
    <h1>Contact Us</h1>
    <form id="contact-form" method="POST" >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control"  />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" rows="5" />
          </div>
          <button type="submit" className="btn btn-dark btn-submit">Submit</button>
        </form>
  </div>);
}
