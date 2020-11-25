import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import downarrow from '../../images/downarrow.png';

const Wrapper = styled('div')`
  background: #f0f8ff;
  margin: 2rem;
  padding: 1rem 2rem;
  box-shadow: 0px 2px 4px maroon;
  border: 0px solid maroon;
  border-radius: 8px;
  @media (min-width: 760px) {
    width: 60rem;
    border-radius: 8px;
  }
`;
const ElementWrap = styled('div')`
  display: flex;
`;
const ArrowWrap = styled('div')`
  width: 1rem;
  margin: 0 0.5rem;
  @media (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
`;
const Arrow = styled('img')`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: inline;
  transform: ${props => (props.expand ? 'rotate(180deg)' : '')};
`;
const ObjValue = styled('p')`
  font-size: 1.4rem;
  margin-left: 2rem;
  list-style-type: decimal;
  font-weight: bold;
  & @media (max-width: 992px) {
    font-size: 1.2rem;
  }
  @media (max-width: 420px) {
    margin-left: 0rem;
  }
`;
const ObjectivesWrap = styled('div')`
  margin-left: 4.8rem;
`;
const ObjectiveWrapper = styled('li')`
  font-size: 1.4rem;
  text-align: left;
  margin: 2rem 0;
  padding: 0 1rem;
  list-style-type: lower-alpha;
  cursor: pointer;
  @media (max-width: 992px) {
    font-size: 1.2rem;
    cursor: default;
  }
`;
const NoData = styled('span')`
  font-size: 1.4rem;
  text-align: center;
  color: red;
  margin: 2rem;
  display: inline-block;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;

class Obj extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true,
    };
  }

  onExpand = () => {
    this.setState(state => ({ expand: !state.expand }));
  };

  displayObjectives = () => {
    const {
      title,
      childObjectives = [],
      showObjInfoPopupDetails = () => {},
    } = this.props;
    if (childObjectives.length <= 0) return <NoData>No objectives</NoData>;
    return childObjectives.map((childItem, index) => (
      <ObjectiveWrapper
        key={`${title}-child-${index.toString()}`}
        onClick={() => {
          // eslint-disable-next-line camelcase
          const { id, category, metric_name, metric_start, metric_target } =
            childItem || {};
          const objInfo = {
            parent: title,
            id,
            category,
            title,
            metric_name,
            metric_start,
            metric_target,
          };
          showObjInfoPopupDetails(objInfo);
        }}
      >
        {childItem.title}
      </ObjectiveWrapper>
    ));
  };

  render() {
    const { id, title } = this.props;
    return (
      <Wrapper>
        <ElementWrap>
          <ArrowWrap>
            <Arrow
              expand={this.state.expand}
              src={downarrow}
              onClick={() => this.onExpand()}
            />
          </ArrowWrap>
          <ObjValue>{`${id}. ${title}`}</ObjValue>
        </ElementWrap>
        {this.state.expand && (
          <ObjectivesWrap>{this.displayObjectives()}</ObjectivesWrap>
        )}
      </Wrapper>
    );
  }
}

Obj.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  childObjectives: PropTypes.array,
  showObjInfoPopupDetails: PropTypes.func,
};

export default Obj;
