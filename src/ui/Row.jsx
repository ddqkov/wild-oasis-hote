/**
 * External dependencies.
 */
import styled, { css } from "styled-components";

/**
 * Internal dependencies.
 */

const Row = styled.div`
	display: flex;
	margin-bottom: 1.5rem;
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

	${(props) =>
		props.space === "space-between" &&
		css`
			justify-content: space-between;
		`}
`;

Row.defaultProps = {
	type: "vertical",
};

export default Row;
