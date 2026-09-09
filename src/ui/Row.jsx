/**
 * External dependencies.
 */
import styled, { css } from "styled-components";

/**
 * Internal dependencies.
 */

const Row = styled.div`
	display: flex;
	${(props) =>
		props.type === "horizontal" &&
		css`
			align-items: center;
		`}
	${(props) =>
		props.type === "vertical" &&
		css`
			flex-direction: column;
			gap: 1.6rem;
		`}
`;

Row.defaultProps = {
	type: "vertical",
};

export default Row;
