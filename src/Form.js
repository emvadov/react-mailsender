import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './Form.css';


class Form extends Component {

  state = {

    firstname: '',
    lastname: '',
    phone: '',
    recipient: ''

    
  }

  
  handleSubmit = () => { // Sending Email through submint button
      
    let sender = 'emilavadov@jonesexrcise.com';
    let body = {
        sender,
        subject: 'New Lead',
        text:  `
        First Name: ${this.state.firstname}
        Last Name: ${this.state.lastname}
        Mail Address: ${sender}
        Phone Number: ${this.state.phone}`,
        recipient: this.state.recipient       
    }

    fetch('/send-email', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(body), // body data type must match "Content-Type" header
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        this.setState({
            firstname: '',
            lastname: '',
            phone: '',
            recipient: ''
            });
    }) // parses response to JSON
    .catch(error => {
        console.error(`Fetch Error =\n`, error);
        this.setState({
            firstname: '',
            lastname: '',
            phone: '',
            recipient: ''
            });
    });
       
  }

  render() {
    const { recipient } = this.state;
    const { firstname } = this.state;
    const { lastname } = this.state;
    const { phone } = this.state;

    return (    

        <div className="jonesForm">
            <ValidatorForm
                    name="jones form"
                    ref="form"
                    className="formContainer"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
            >

            <br/><br/>

            <TextValidator
                label="First Name:"
                onChange={e => this.setState({ firstname: e.target.value  })}
                name="firstname"
                value={firstname}
                validators={['required', 'matchRegexp:^[a-zA-Z]{2,}$']}
                errorMessages={['this field is required', 'First name should contain minimum characters']}
            />
            <br/><br/>

            <TextValidator
                label="Last Name:"
                onChange={e => this.setState({ lastname: e.target.value  })}
                name="lastname"
                value={lastname}
                validators={['required', 'matchRegexp:^[a-zA-Z]{2,}$']}
                errorMessages={['this field is required', 'Last name should contain 2 minimum characters']}
            />
            <br/><br/>

            <TextValidator
                label="Email"
                onChange={e => this.setState({ recipient: e.target.value  })}
                name="email"
                value={recipient}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />

            <br/><br/>

            <TextValidator
                label="Phone number:"
                onChange={e => this.setState({ phone: e.target.value  })}
                name="phone"
                value={phone}
                validators={['required', 'matchRegexp:^[0-9]{10,10}$']}
                errorMessages={['this field is required', 'Phone number should contain exact 10 digits']}
            />

            
            <br/><br/>
            <Button type="submit">Submit</Button>
            </ValidatorForm>

            <div className="subResult">
                <h3>  </h3>
            </div>
          </div>

    );
  }
}

export default Form;