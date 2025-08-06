// responsive-iframe-container
// http://themeloom.com/2013/02/tips-embed-google-maps-and-calendars-in-a-responsive-wordpress-theme/

function Calendar() {
	const src =
		"https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=dGFtdWN5YmVyc2VjQGdtYWlsLmNvbQ&src=dm9qcDFyYzlvcGdxbTdyYmpqM2toYXVoaG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=OWVlZGxyZGZtdGhyNWY3MnBqMWJianV1cjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dGFtdXdpY3lzQGdtYWlsLmNvbQ&color=%233F51B5&color=%2333B679&color=%23AD1457&color=%23B39DDB&showTitle=0&showPrint=0";

	return (
		<div className="flex justify-center items-center">
			<div className="bg-white p-4 rounded">
				{/* Mobile view */}
				<div className="block md:hidden">
					<iframe
						src={`${src}&mode=AGENDA`}
						title="club calendar mobile"
						className="w-[calc(100dvw-2rem)] h-[600px]"
					></iframe>
				</div>

				{/* Desktop view */}
				<div className="hidden md:block">
					<iframe
						src={src}
						title="club calendar"
						className="w-[calc(768px-2rem)] h-[600px]"
					></iframe>
				</div>
			</div>
		</div>
	);
}

export default Calendar;
