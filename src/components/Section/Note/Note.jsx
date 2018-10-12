import React from "react";
import "./Note.css"
import { Formik } from 'formik';
import * as request from "superagent";

class Note extends React.Component {
    text = '';
    callback = undefined;

    constructor({text, textEdit = false, callback}) {
        super();
        this.state = {
            textEdit: textEdit
        };

        this.text = text;

        if (callback) {
            this.callback = callback;
        }
    };


    render() {
        return <div className="note">
            <div className="radio-box-wrapper">
                <input type="radio" className="radioBox"/>
            </div>
            <div className="text-wrapper">
                {!this.state.textEdit ?
                    <div className="text" onClick={this.edit}>
                        {this.text}
                    </div> :
                    <Formik
                        initialValues={{name: this.text}}
                        onSubmit={(values, actions) => {
                            if (this.callback !== undefined) {
                                this.callback();
                            }
                            actions.setSubmitting(false);

                            request.post('http://localhost:3001/note').send({
                                author: 'Gumunia',
                                text: values.name
                            }).end((error, response) => {
                                this.edit();
                            });
                        }}
                        render={props => (
                            <form onSubmit={props.handleSubmit} className="form">
                                    <textarea className="text-edit"
                                              onChange={props.handleChange}
                                              onBlur={props.handleBlur}
                                              value={props.values.name}
                                              name="name"
                                    />
                                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                                <button type="submit">&#10003;</button>
                                <button type="button">X</button>
                            </form>
                        )}
                    />
                }
            </div>
            <div className="options-wrapper"> Options</div>
        </div>
    }

    edit = () => this.setState({textEdit: !this.state.textEdit});

    validate = value => ({
        error: !value || !/Hello World/.test(value) ? "Input must contain 'Hello World'" : null,
        warning: !value || !/^Hello World$/.test(value) ? "Input should equal just 'Hello World'" : null,
        success: value && /Hello World/.test(value) ? "Thanks for entering 'Hello World'!" : null
    });

}

export default Note;