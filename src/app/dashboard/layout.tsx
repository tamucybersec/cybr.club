"use client";

import { DashboardContext } from "@/lib/context";
import { useState, useMemo, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Permissions, type Options, type Term } from "@/lib/types";
import { authenticated, useLogin } from "@/lib/auth";
import { fetchPath } from "@/lib/fetchUtils";
import { defaultTerms } from "@/lib/helpers";

import Login from "@/components/Login";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	DashboardSidebar,
	DashboardBreadcrumbs,
} from "@/components/DashboardSidebar";
import Image from "next/image";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [token, setToken] = useState<string>("");
	const [permission, setPermission] = useState<Permissions | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState(true); // for automatic login w local storage token (if applicable)
	const [terms, setTerms] = useState<[Term, Term]>(defaultTerms());
	const fetchPathAbstraction = useCallback(
		async (path: string, options?: Options) => {
			return await fetchPath(token, path, options);
		},
		[token]
	);
	const contextValue = useMemo(
		() => ({
			fetchPath: fetchPathAbstraction,
			permission: permission!,
			terms,
			setTerms,
		}),
		[fetchPathAbstraction, permission, terms]
	);

	const login = useLogin((tok, perm) => {
		setToken(tok);
		setPermission(perm);
	}, setIsLoading);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 5,
			},
		},
	});

	function Header() {
		return (
			<div className="flex gap-4 items-center">
				<Image
					src={"/images/club-logos/white-shield.svg"}
					alt="Club Logo"
					className="rounded"
					height={36}
					width={36}
					unoptimized
				/>
				<h1>TAMU CYBR CLUB</h1>
			</div>
		);
	}

	function logout() {
		localStorage.removeItem("token");
		window.location.reload();
	}

	if (!authenticated(permission)) {
		// ternary was too messy with that much html
		return (
			<QueryClientProvider client={queryClient}>
				<DashboardContext.Provider value={contextValue}>
					<Toaster
						richColors
						position="top-center"
					/>
					<Login // show login page if theyre not authorized
						token={token}
						setToken={setToken}
						permission={permission}
						isLoading={isLoading}
						login={() => login(token)}
					/>
				</DashboardContext.Provider>
			</QueryClientProvider>
		);
	}
	// otherwise, authenticated:
	return (
		<QueryClientProvider client={queryClient}>
			<DashboardContext.Provider value={contextValue}>
				<Toaster
					richColors
					position="top-center"
				/>

				<SidebarProvider>
					<Sidebar>
						<SidebarHeader>{Header()}</SidebarHeader>
						<SidebarContent>
							<DashboardSidebar />
						</SidebarContent>
						<SidebarFooter>
							<Button onClick={logout}>Logout</Button>
						</SidebarFooter>
					</Sidebar>

					<SidebarInset className="overflow-hidden">
						<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
							<div className="flex items-center gap-2 px-4">
								<SidebarTrigger className="-ml-1" />
								<Separator
									orientation="vertical"
									className="mr-2 h-4"
								/>
								<DashboardBreadcrumbs />
							</div>
						</header>
						<div className="px-4 pb-4 flex flex-col gap-4">
							{children}
						</div>
					</SidebarInset>
				</SidebarProvider>
			</DashboardContext.Provider>
		</QueryClientProvider>
	);
}
