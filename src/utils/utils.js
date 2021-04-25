import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";
import API from './API';
import axios from "axios";

Survey.StylesManager.applyTheme("default");

var surveyValueChanged = function (sender, options) {
    var el = document.getElementById(options.name);
    if (el) {
        el.value = options.value;
    }
};
function sendDataToServer(survey) {
    axios({
        method: 'post',
        url: '',
        data: JSON.stringify({
          item1: survey
        }),
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      })
      .then(function (response) {
        console.log(response);
      })
  }


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
                    type: "checkbox",
                    name: "Zone Type",
                    title: "Safe/Not Safe",
                    choices: [
                        "Safe Zone",
                        "Hazard Zone"
                    ],
                }, {
                    type: "comment",
                    name: "Description",
                    title: "Description of Zone",
                    placeHolder: "Describe the zone in detail..."
                }
            ],
        }
        const survey = new Survey.Model(json);
        return (
            <Survey.Survey 
            model={survey}
            />
            
        );
    }
    ;
    
}

export default SurveyComponent;