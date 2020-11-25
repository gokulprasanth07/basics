import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const Wrapper = styled('div')``;
const ErrorText = styled('span')``;
function Error({ errorText }) {
  return (
    <Wrapper>
      <ErrorText>{errorText}</ErrorText>
    </Wrapper>
  );
}
Error.propTypes = {
  errorText: PropTypes.string,
};
export default Error;
