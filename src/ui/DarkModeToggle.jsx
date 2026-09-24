/**
 * External dependencies.
 */
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

/**
 * Internal dependencies.
 */

import { useDarkMode } from "@/context/DarkModeContext";
import ButtonIcon from "@/ui/ButtonIcon";

export default function DarkModeToggle() {
	const { darkModeToggle, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon onClick={toggleDarkMode}>
			{darkModeToggle ? <HiOutlineSun /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
}
