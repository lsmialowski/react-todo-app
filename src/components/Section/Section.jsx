import React from 'react';
import './Section.css';
import Note from "./Note/Note";
import * as request from "superagent";

class Section extends React.Component {
    constructor() {
        super();
        this.state = {
            addNew: false,
            status: 'pending',
            data: null
        };

    }

    fullDate = () => `${new Date().getUTCDay()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

    day = () => {
        const daysNameList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayIndex = new Date().getDay();

        return daysNameList[currentDayIndex];
    };

    componentDidMount() {
        request.get('http://localhost:3001/note').end((error, response) => {
            if (!error) {
                this.setState({data: response.body})
            }
        });
    }


    changeAddNewNoteState = () => this.setState({addNew: !this.state.addNew});

    render() {
        return <section>
            <div className="section-header-wrapper">
                <div className="day">{this.day}</div>
                <div className="date">{this.fullDate}</div>
            </div>
            <div className="list-wrapper">

                {this.state.data ? this.state.data.map((element) => <Note text={element.text}/>) : null}

                {!this.state.addNew ?
                    <div onClick={this.changeAddNewNoteState} className="create-new-note">Create new note</div>
                    : <Note textEdit={true} callback={this.changeAddNewNoteState}/>
                }
            </div>
        </section>
    }
    ;
}

export default Section;