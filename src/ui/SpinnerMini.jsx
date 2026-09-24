/**
 * External dependencies.
 */
import { BiLoaderAlt } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

/**
 * Internal dependencies.
 */

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
	width: 2.4rem;
	height: 2.4rem;
	animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
