/**
 * External dependencies.
 */
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

/**
 * Internal dependencies.
 */

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
	const [darkModeToggle, setDarkModeToggle] = useLocalStorageState(
		window.matchMedia("(prefers-color-scheme: dark)").matches,
		"isDarkMode",
	);

	useEffect(() => {
		if (darkModeToggle) {
			document.documentElement.classList.add("dark-mode");
			document.documentElement.classList.remove("light-mode");
		} else {
			document.documentElement.classList.remove("dark-mode");
			document.documentElement.classList.add("light-mode");
		}
	}, [darkModeToggle]);

	function toggleDarkMode() {
		setDarkModeToggle((isDark) => !isDark);
	}

	return (
		<DarkModeContext.Provider value={{ darkModeToggle, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

function useDarkMode() {
	const context = useContext(DarkModeContext);

	if (context === undefined)
		throw new Error("DarkModeContext was used outside of DarkModeProvider");

	return context;
}

export { DarkModeProvider, useDarkMode };
