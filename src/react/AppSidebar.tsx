import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChartPie, ChevronRight, Pencil } from "lucide-react";
import { Fragment, useState, type JSX, type ReactElement } from "react";
import WhiteShield from "@/images/club-logos/white-shield.png";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Report from "./Report";
import EditMembers from "./EditMembers";
import EditEvents from "./EditEvents";
import EditFlagged from "./EditFlagged";

type Link = { to: string; component: JSX.Element };

interface Group {
	group: string;
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
		buttons: [
			{
				button: "Dashboard",
				icon: <ChartPie />,
				link: { to: "/dashboard", component: <Report /> },
			},
		],
	},
	{
		group: "Admin",
		collapsible: [
			{
				collapse: "Edit",
				icon: <Pencil />,
				pages: [
					{
						page: "Members",
						link: { to: "/members", component: <EditMembers /> },
					},
					{
						page: "Events",
						link: { to: "/events", component: <EditEvents /> },
					},
					{
						page: "Flagged",
						link: { to: "/flagged", component: <EditFlagged /> },
					},
				],
			},
		],
	},
];

function AppSidebar() {
	const [path, setPath] = useState("/dashboard");
	const [component, setComponent] = useState(<Report />);

	function Header() {
		return (
			<div className="flex gap-4 items-center">
				<img
					src={WhiteShield.src}
					className="rounded"
					height={36}
					width={36}
				/>
				<h1>TAMU Cybersecurity Club</h1>
			</div>
		);
	}

	function Breadcrumbs() {
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

	function getBreadcrumbs(): string[] {
		for (const group of groups) {
			if (group.buttons) {
				for (const button of group.buttons) {
					if (button.link.to == path) {
						return [group.group, button.button];
					}
				}
			}
			if (group.collapsible) {
				for (const collapse of group.collapsible) {
					for (const page of collapse.pages) {
						if (page.link.to == path) {
							return [group.group, collapse.collapse, page.page];
						}
					}
				}
			}
		}

		return [];
	}

	function AppSidebarGroup({ group, buttons, collapsible }: Group) {
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
					onClick={() => {
						setPath(link.to);
						setComponent(link.component);
					}}
					isActive={path == link.to}
				>
					{icon}
					<span>{button}</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	function AppSidebarCollapsible({ collapse, icon, pages }: Collapse) {
		return (
			<Collapsible
				key={collapse}
				asChild
				defaultOpen={pages.some(({ link }) => link.to == path)}
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
					onClick={() => {
						setPath(link.to);
						setComponent(link.component);
					}}
					isActive={path == link.to}
				>
					{page}
				</SidebarMenuSubButton>
			</SidebarMenuSubItem>
		);
	}

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>{Header()}</SidebarHeader>
				<SidebarContent>{groups.map(AppSidebarGroup)}</SidebarContent>
			</Sidebar>
			<SidebarInset className="overflow-hidden">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						{Breadcrumbs()}
					</div>
				</header>
				<div className="px-4 pb-4 flex flex-col gap-4">{component}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

export default AppSidebar;
