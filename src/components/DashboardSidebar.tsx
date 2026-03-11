"use client";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChartPie, ChevronRight, Database, Variable } from "lucide-react";
import { Fragment, useContext, type ReactElement } from "react";
import { Permissions } from "../lib/types";
import { DashboardContext } from "@/lib/context";
import { sufficientPermissions } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Link = { to: string };

interface Group {
	group: string;
	requiredPermissionLevel: Permissions;
	buttons?: Button[];
	collapsible?: Collapse[];
}

interface Button {
	button: string;
	icon: ReactElement;
	link: Link;
}

interface Collapse {
	collapse: string;
	icon: ReactElement;
	pages: Page[];
}

interface Page {
	page: string;
	link: Link;
}

const groups: Group[] = [
	{
		group: "Sponsors",
		requiredPermissionLevel: Permissions.SPONSOR,
		buttons: [
			{
				button: "Dashboard",
				icon: <ChartPie />,
				link: { to: "/dashboard" },
			},
		],
	},
	{
		group: "Admin",
		requiredPermissionLevel: Permissions.COMMITTEE,
		collapsible: [
			{
				collapse: "Tables",
				icon: <Database />,
				pages: [
					{
						page: "Members",
						link: { to: "/dashboard/members" },
					},
					{
						page: "Points",
						link: { to: "/dashboard/points" },
					},
					{
						page: "Events",
						link: { to: "/dashboard/events" },
					},
					{
						page: "Attendance",
						link: { to: "/dashboard/attendance" },
					},
					{
						page: "Flagged",
						link: { to: "/dashboard/flagged" },
					},
				],
			},
		],
	},
	{
		group: "Super Admin",
		requiredPermissionLevel: Permissions.SUPER_ADMIN,
		collapsible: [
			{
				collapse: "Tables",
				icon: <Database />,
				pages: [
					{
						page: "Tokens",
						link: { to: "/dashboard/tokens" },
					},
				],
			},
			{
				collapse: "Query",
				icon: <Variable />,
				pages: [
					{
						page: "Readonly",
						link: { to: "/dashboard/readonly" },
					},
				],
			},
		],
	},
];

export function DashboardSidebar() {
	const { permission: permissionLevel } = useContext(DashboardContext);
	const pathname = usePathname();

	function AppSidebarGroup({
		group,
		requiredPermissionLevel,
		buttons,
		collapsible,
	}: Group) {
		if (!sufficientPermissions(permissionLevel, requiredPermissionLevel)) {
			return undefined;
		}

		return (
			<SidebarGroup key={group}>
				<SidebarGroupLabel>{group}</SidebarGroupLabel>
				{buttons && (
					<SidebarMenu>{buttons.map(AppSidebarButton)}</SidebarMenu>
				)}
				{collapsible && (
					<SidebarMenu>
						{collapsible.map(AppSidebarCollapsible)}
					</SidebarMenu>
				)}
			</SidebarGroup>
		);
	}

	function AppSidebarButton({ button, icon, link }: Button) {
		return (
			<SidebarMenuItem key={button}>
				<SidebarMenuButton
					asChild
					isActive={pathname === link.to}
				>
					<Link href={link.to}>
						{icon}
						<span>{button}</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	function AppSidebarCollapsible({ collapse, icon, pages }: Collapse) {
		return (
			<Collapsible
				key={collapse}
				asChild
				defaultOpen={pages.some(({ link }) => link.to == pathname)}
				className="group/collapsible"
			>
				<SidebarMenuItem>
					<CollapsibleTrigger asChild>
						<SidebarMenuButton tooltip={collapse}>
							{icon}
							<span>{collapse}</span>
							<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
						</SidebarMenuButton>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<SidebarMenuSub>
							{pages.map(AppSidebarPage)}
						</SidebarMenuSub>
					</CollapsibleContent>
				</SidebarMenuItem>
			</Collapsible>
		);
	}

	function AppSidebarPage({ page, link }: Page) {
		return (
			<SidebarMenuSubItem key={page}>
				<SidebarMenuSubButton
					asChild
					isActive={pathname == link.to}
				>
					<Link href={link.to}>{page}</Link>
				</SidebarMenuSubButton>
			</SidebarMenuSubItem>
		);
	}

	return <>{groups.map(AppSidebarGroup)}</>;
}

export function DashboardBreadcrumbs() {
	const pathname = usePathname();

	function getBreadcrumbs(): string[] {
		for (const group of groups) {
			if (group.buttons) {
				for (const button of group.buttons) {
					if (button.link.to == pathname) {
						return [group.group, button.button];
					}
				}
			}
			if (group.collapsible) {
				for (const collapse of group.collapsible) {
					for (const page of collapse.pages) {
						if (page.link.to == pathname) {
							return [group.group, collapse.collapse, page.page];
						}
					}
				}
			}
		}

		return [];
	}

	const breadcrumbs = getBreadcrumbs();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((str, index) => (
					<Fragment key={`${str}-${index}`}>
						{index !== 0 && (
							<BreadcrumbSeparator className="hidden md:block" />
						)}
						<BreadcrumbItem className="hidden md:block">
							{index === breadcrumbs.length - 1 ? (
								<BreadcrumbPage>{str}</BreadcrumbPage>
							) : (
								str
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default DashboardSidebar;
