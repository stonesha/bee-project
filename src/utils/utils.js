import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";
import API from './API';
import axios from "axios";

Survey.StylesManager.applyTheme("default");

// var surveyValueChanged = function (sender, options) {
//     var el = document.getElementById(options.name);
//     if (el) {
//         el.value = options.value;
//     }
// };
// function sendDataToServer(survey) {
//     axios({
//         method: 'post',
//         url: '',
//         data: JSON.stringify({
//           item1: survey
//         }),
//         headers: {
//           'content-type': 'application/json; charset=utf-8'
//         }
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//   }


class SurveyComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        } 
        this.onCompleteComponent = this.onCompleteComponent.bind(this)
    }
    onCompleteComponent = () => {
        this.setState ({
            isCompleted: true
        })
    }
    render() {
        var json = {
            completedHtml: "Report Sent.",
            questions: [
                {
                    type: "text",
                    name: "severity",
                    title: "Severity",
                    placeHolder: "Explain severity..."
                },
                {
                    type: "comment",
                    name: "instructions",
                    title: "Evacuation Instructions",
                    placeHolder: "Describe the instructions..."
                },
                {
                    type: "text",
                    name: "type",
                    title: "Evacuation Type",
                    placeHolder: "Ex: flood, fire, etc..."
                }, 
            ],
        }
        const survey = new Survey.Model(json);
        survey.onComplete.add(function (sender, options) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://bee-cors-proxy.herokuapp.com/https://bee-webserver.herokuapp.com/Input_Instructions");
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.send(JSON.stringify(sender.data));
        });
        return (
            <Survey.Survey 
            model={survey}
            />
            
        );
    }
    ;
    
}

export default SurveyComponent;