import React from 'react';
import {
  Button,
  Icon
} from '@material-ui/core';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteFunc: this.props.deleteFunc
    };
  }

  helper = (proj, canDelete) => {
    if (proj) {
      let id = proj.id;
      return (
        <div
          key={id}
          id={id}
          className="grid-project p-3 mb-3"
          title={proj.data.name}>
          <a href={`/${id}`} >
            <h4>{proj.data.name}</h4>
            <img
              id={id}
              alt={id}
              className="img-thumbnail mb-1"
              src={proj.url} />
          </a>
          {canDelete ?
            <Button
              label="delete Project"
              fullWidth={true}
              color="secondary"
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
    const userProjs = [].concat(this.props.userProjs);
    const examplProjs = [].concat(this.props.examplProjs);
    return (
      <div id="project-list" >
        <div className="row" id="user-proj" style={{ width: "100%" }}>
          <h3 className="col-12 p-2 mb-3 border-bottom"> Your Projects</h3>
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
