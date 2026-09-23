/**
 * External dependencies.
 */
import { HiArrowRightOnRectangle } from "react-icons/hi2";

/**
 * Internal dependencies.
 */
import { useLogout } from "@/services/useLogout";
import ButtonIcon from "@/ui/ButtonIcon";
import SpinnerMini from "@/ui/SpinnerMini";

export default function Logout() {
	const { logout, isLogingOut } = useLogout();

	return (
		<ButtonIcon disabled={isLogingOut} onClick={logout}>
			{!isLogingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
}
