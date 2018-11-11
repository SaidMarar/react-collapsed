import React from 'react';
import Collapse from '../src/Collapse';

export default class ControlledDemo extends React.Component {
  state = {
    isOpen: false
  };

  toggleIsOpen = () => this.setState(({isOpen}) => ({isOpen: !isOpen}));

  render() {
    console.log(this.state.isOpen);
    return (
      <Collapse isOpen={this.state.isOpen}>
        {({getCollapsibleProps, getTogglerProps}) => (
          <React.Fragment>
            <button {...getTogglerProps({onClick: this.toggleIsOpen})}>
              Open
            </button>
            <div
              {...getCollapsibleProps({
                style: {
                  borderRadius: 3,
                  border: '1px solid paleviolet',
                  background: 'lightblue'
                }
              })}
            >
              <div
                style={{
                  borderRadius: '50%',
                  background: 'blue',
                  height: '300px',
                  width: '100%'
                }}
              />
            </div>
          </React.Fragment>
        )}
      </Collapse>
    );
  }
}