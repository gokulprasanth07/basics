/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';
import { getOkrsData } from './actions';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Header';
import DropDown from '../../components/DropDown';
import ObjectiveInfoPopup from '../../components/ObjectiveInfoPopup';
import Obj from '../../components/Obj';
import Error from '../../components/Error';
import {
  selectOkrData,
  selectCategories,
  selectDataLoading,
  selectErrorDataLoading,
  selectformattedOkrData,
} from './selectors';
import { selectFilteredOkrs, get } from '../../utils/helpers';

const Container = styled('div')`
  width: 100%;
`;

const LoaderImage = styled('span')`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 40px;
    height: 40px;
    border-style: solid;
    border-color: black;
    border-top-color: transparent;
    border-width: 4px;
    border-radius: 50%;
    display: block;
    margin: auto;
    text-align: center;
    top: 50%;
    right: 50%;
    -webkit-animation: spin 0.8s linear infinite;
    animation: spin 0.8s linear infinite;
  }
`;
const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    margin-top: 108px;
  }
  @media (max-width: 992px) {
    margin-top: 58px;
  }
`;
const DropDownWrapper = styled('div')`
  justify-content: center;
  width: 100%;
  display: flex;
  margin: 1rem 0;
`;
const ObjWrapper = styled('div')`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveIndex: 0,
      hasError: false,
      objectives: {
        opened: false,
        info: {
          category: 'Company',
          title: 'Research and improve customer satisfaction',
          metricName: '%',
          metricStart: '',
          metricTarget: '',
        },
      },
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error('Error in HomePage component', error);
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(getOkrsData());
  }

  onSelectItem = index => {
    this.setState({
      currentActiveIndex: index,
    });
  };

  showObjInfo = info => {
    this.setState({
      objectives: {
        opened: true,
        info,
      },
    });
  };

  closeObjInfo = () => {
    this.setState({
      objectives: {
        // eslint-disable-next-line react/no-access-state-in-setstate
        ...this.state.objectives,
        opened: false,
      },
    });
  };

  displayObj = () => {
    const { categories = [], formattedOkrData = [] } = this.props;
    const activeCategory = categories[this.state.currentActiveIndex] || '';
    const filteredData = selectFilteredOkrs(activeCategory, formattedOkrData);
    return filteredData;
  };

  render() {
    const {
      // formattedOkrData = [],
      categories = [],
      isDataLoaded = false,
      errorInLoadingData = false,
    } = this.props;
    const { objectives } = this.state;
    const filteredData = this.displayObj();
    return (
      <Container>
        <Helmet
          title="Ally-Assignment"
          meta={[
            {
              name: 'Ally-Assignment',
              content: 'Ally OKRS Assignment ',
            },
          ]}
        />
        <Header />
        {/*  To Render Fallback UI */}
        {/* eslint-disable-next-line no-nested-ternary  */}
        {this.state.hasError || errorInLoadingData ? (
          <Error errorText="Sorry...Something went wrong" />
        ) : isDataLoaded ? (
          <Wrapper>
            {/*  Dropdown Section */}
            <DropDownWrapper>
              <DropDown
                listItems={categories}
                activeItem={this.state.currentActiveIndex}
                onSelect={this.onSelectItem}
              />
            </DropDownWrapper>
            {/*  objectives displayed  */}
            <ObjWrapper>
              {filteredData.map((item, index) => {
                const title = get(item, 'parent.title', '');
                const childObj = get(item, 'child', []);
                return (
                  <Obj
                    key={`${title}-parent`}
                    title={title}
                    childObjectives={childObj}
                    id={index + 1}
                    showObjInfoPopupDetails={this.showObjInfo}
                  />
                );
              })}
            </ObjWrapper>
          </Wrapper>
        ) : (
          <LoaderImage />
        )}
        {/* objectives popup  */}
        {objectives.opened && (
          <ObjectiveInfoPopup
            info={objectives.info}
            close={this.closeObjInfo}
          />
        )}
      </Container>
    );
  }
}

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });
const mapStateToProps = state => ({
  okrData: selectOkrData(state),
  formattedOkrData: selectformattedOkrData(state),
  categories: selectCategories(state),
  // eslint-disable-next-line no-undef
  selectFilteredData: category => selectFilteredData(category, state),
  isDataLoaded: selectDataLoading(state),
  errorInLoadingData: selectErrorDataLoading(state),
});
const mapDispatchToProps = dispatch => ({ dispatch });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
HomePage.propTypes = {
  formattedOkrData: PropTypes.array,
  categories: PropTypes.array,
  errorInLoadingData: PropTypes.bool,
  isDataLoaded: PropTypes.bool,
};
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
