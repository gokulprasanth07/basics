import React from 'react';
import styled from 'styled-components';

const OverlayBackground = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

class Overlay extends React.PureComponent {
  render() {
    return <OverlayBackground {...this.props} />;
  }
}
Overlay.defaultProps = {
  stopScroll: true,
};

export default Overlay;
