/**
 * External dependencies.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

/**
 * Internal dependencies.
 */
import Account from "@/pages/Account";
import Booking from "@/pages/Booking";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import Checkin from "@/pages/Checkin";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import PageNotFound from "@/pages/PageNotFound";
import Settings from "@/pages/Settings";
import Users from "@/pages/Users";
import GlobalStyles from "@/styles/GlobalStyles";
import AppLayout from "@/ui/AppLayout";
import ProtectedRoute from "@/ui/ProtectedRoute";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />

			<GlobalStyles />

			<BrowserRouter>
				<Routes>
					<Route
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route
							index
							element={<Navigate replace to="dashboard" />}
						/>

						<Route path="dashboard" element={<Dashboard />} />

						<Route path="account" element={<Account />} />

						<Route path="bookings" element={<Bookings />} />

						<Route
							path="bookings/:bookingId"
							element={<Booking />}
						/>

						<Route
							path="checkin/:bookingId"
							element={<Checkin />}
						/>

						<Route path="cabins" element={<Cabins />} />

						<Route path="settings" element={<Settings />} />

						<Route path="users" element={<Users />} />
					</Route>

					<Route path="login" element={<Login />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>

			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "16px 24px",
						backgroundColor: "var(--color-grey-0)",
						color: "var(--color-grey-700)",
					},
				}}
			/>
		</QueryClientProvider>
	);
}
