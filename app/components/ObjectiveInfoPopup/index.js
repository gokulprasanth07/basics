import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '../Modal';
const Wrapper = styled('div')`
  margin: 2.5rem 0;
  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;
const ParamType1 = styled('p')`
  font-weight: bold;
  width: 12rem;
  font-size: 1.4rem;
  padding: 1rem;
  margin: 1rem 0;
`;
const ParamType = styled('p')`
  font-size: 1.4rem;
  padding: 1rem;
  margin: 1rem 0;
`;
const PramsWrap = styled('div')`
  display: flex;
`;
function ObjectiveInfoPopup({ info, close = () => {} }) {
  const showInfo = () =>
    Object.keys(info).map((obj, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <PramsWrap key={`${obj}-${index}`}>
        <ParamType1>{obj}</ParamType1>
        <ParamType>{info[obj]}</ParamType>
      </PramsWrap>
    ));
  return (
    <Modal close={close}>
      <Wrapper>
        <ContentWrapper>{showInfo()}</ContentWrapper>
      </Wrapper>
    </Modal>
  );
}
ObjectiveInfoPopup.propTypes = {
  info: PropTypes.object,
  close: PropTypes.func,
};
export default ObjectiveInfoPopup;
