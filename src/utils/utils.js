import React, { Component } from "react";

import * as Survey from "survey-react";

import "survey-react/survey.css";

Survey.StylesManager.applyTheme("default");

class SurveyComponent extends Component {
    constructor() {
        super();
        
    }
    render() {
        const json = {
            completedHtml: "<h4>Report Sent.</h4>",
            questions: [
                {
                    type: "checkbox",
                    title: "test",
                    choices: [
                        "yes",
                        "no"
                    ],
                    
                }
            ],
        }
        const survey = new Survey.Model(json);
        
        return (
            <Survey.Survey model={survey}/>
        );
    }
    ;
    
}

export default SurveyComponent;