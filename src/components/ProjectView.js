import React from 'react';
import {
  Button,
  Icon
} from '@material-ui/core';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteFunc: this.props.deleteFunc,
      showImg: false
    };
  }

  helper = (proj, canDelete) => {
    if (proj) {
      let id = proj.id;
      let name = proj.data.name;
      return (
        <div key={id} id={id} title={name}
          className="col-xs-12 col-md-6 col-lg-4 pt-2 pl-0">
          <a href={`/${id}`} >
            <span className="project-span">{name}</span>
            <img id={id} alt={id} src={proj.url}
              className={"img-thumbnail " + (this.state.showImg && "d-none")} />
          </a>
          {canDelete ?
            <Button
              label="delete Project"
              color="secondary"
              className="delete-btn"
              fullWidth={!this.state.showImg}
              onClick={() => this.props.deleteFunc(id, proj.data.name)}>
              <Icon className="material-icons">delete</Icon>
            </Button>
            : null
          }
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let previewToggle = {
      position: 'fixed',
      top: 5
    };
    const userProjs = [].concat(this.props.userProjs);
    const examplProjs = [].concat(this.props.examplProjs);
    return (
      <div id="project-list" >
        <Button
          style={previewToggle}
          onClick={() => this.setState({ showImg: !this.state.showImg })}>
          { // If we are showing the img, show the proper icon
            this.state.showImg
              ?
              <Icon className="material-icons">visibility_off</Icon>
              :
              <Icon className="material-icons">visibility</Icon>
          }
          <div>&nbsp;</div>Preview
        </Button>
        <div className="row" id="user-proj" style={{ width: "100%" }}>
          <h3 className="col-12 p-0 mb-3 border-bottom"> Your Projects
          </h3>
          <hr />
          { // Sort the users projects in alphabetical order
            userProjs.sort(function (a, b) {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }).map(proj => {
              return this.helper(proj, true);
            })
          }
        </div>
        <div className="row" id="sample-proj" style={{ width: "100%" }}>
          <h3 className="col-12 p-2 mb-3 border-bottom">Sample Projects</h3>
          <hr />
          { // Sort the examples projects in alphabetical order
            examplProjs.sort(function (a, b) {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }).map(proj => {
              return this.helper(proj, false);
            })
          }
        </div>
      </div>
    );
  }
}

export default ProjectView;
