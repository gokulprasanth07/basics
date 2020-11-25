import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import downarrow from '../../images/downarrow.png';
const Wrapper = styled('div')`
  position: relative;
`;
const SelectedItem = styled('div')`
  border-bottom-left-radius: ${props =>
    props.expand ? '0rem !important' : ' '};
  border-bottom-right-radius: ${props =>
    props.expand ? '0rem !important' : ' '};
  border-radius: 1rem;
  border: 1px solid #e9e9e9;
  border: 1.5px solid maroon;
  padding: 1rem;
  display: flex;
  align-items: center;
  @media (min-width: 992px) {
    width: 22.5rem;
  }
  font-weight: bold;
  height: 3.4rem;
  @media (max-width: 992px) {
    height: 3.1rem;
    width: 20rem;
  }
  background: #f0f8ff;
`;
const Item = styled('p')`
  font-size: 1.4rem;
  flex: 1;
`;
const ArrowWrap = styled('div')`
  border: inset 3px solid maroon;
  width: 1rem;
  margin: 0 0.5rem;
  @media (max-width: 992px) {
    width: 2rem;
    height: 2rem;
  }
`;
const Arrow = styled('img')`
  width: 100%;
  height: 100%;
  @media (max-width: 992px) {
    width: 70%;
    height: 90%;
  }
  cursor: pointer;
  transform: ${props => (props.expand ? 'rotate(180deg)' : '')};
`;
const OptionsWrap = styled('ul')`
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: 1px solid #e9e9e9;
  position: absolute;
  border: 1.5px solid maroon;
  top: 3.2rem;
  width: 20rem;
  @media (min-width: 992px) {
    width: 22.5rem;
  }
  z-index: 11;
  background: #f0f8ff;
`;
const ItemWrapper = styled('li')`
  background: ${props => (props.active ? 'background: #f0f8ff' : ' ')};
  color: ${props => (props.active ? 'color: #17202a' : ' ')};
  font-size: 1.4rem;
  padding: 1rem;
  list-style: none;
  :hover {
    background: #eaeded;
    color: #641e16;
    cursor: pointer;
    font-weight: bold;
  }
`;

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  onExpand = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      expand: !this.state.expand,
    });
  };

  onClose = () => {
    this.setState({
      expand: false,
    });
  };

  showOptions = () => {
    const { activeItem, onSelect, listItems } = this.props;
    return listItems.map((item, index) => (
      <ItemWrapper
        active={activeItem === index}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        onFocus={this.onExpand}
        onBlur={this.onClose}
        onClick={() => {
          this.setState({
            expand: false,
          });
          onSelect(index);
        }}
      >
        {item}
      </ItemWrapper>
    ));
  };

  render() {
    const { activeItem, listItems } = this.props;
    const { expand } = this.state;
    return (
      <Wrapper
        onFocus={this.onExpand}
        onBlur={this.onClose}
        onClick={this.onExpand}
      >
        <SelectedItem expand={expand}>
          <Item>{listItems[activeItem]}</Item>
          <ArrowWrap>
            <Arrow
              expand={this.state.expand}
              src={downarrow}
              onClick={this.onExpand}
            />
          </ArrowWrap>
        </SelectedItem>
        {expand && <OptionsWrap>{this.showOptions()}</OptionsWrap>}
      </Wrapper>
    );
  }
}
DropDown.propTypes = {
  listItems: PropTypes.array,
  activeItem: PropTypes.number,
  onSelect: PropTypes.func,
};
