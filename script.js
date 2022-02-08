mixpanel.init("2f0a504af353b1de551cae3a1e94d637");

let rdsUserEmail;

const callAnalytics = (email) => {
	mixpanel.track("Page opened", {
		source: "Venus Fly Trap",
		data: email || "",
	});
	document.cookie = "githubLogin=true;domain=.realdevsquad.com;path=/";

	const emailField = document.getElementById("emailAddress");
	emailField.addEventListener("blur", function () {
		mixpanel.track("Email Entered", {
			source: "Venus Fly Trap",
			data: `${emailField.value}`,
			rdsUser: email || "",
		});
	});

	const password = document.getElementById("password");
	password.addEventListener("input", function () {
		if (password.value.length > 3) {
			mixpanel.track("Password Entered", {
				source: "Venus Fly Trap",
				data: `${emailField.value}`,
				rdsUser: email || "",
			});
			alert(
				"Account Hacked!\nDon't worry, we didn't take your data. Be careful of the URLs you visit.\nPlease go back to the main page and try again.\nIt will work this time correctly"
			);
			password.value = "";
		}
	});
};

const getRDSEmail = async () => {
	const email = await axios
		.get(
			"https://api.realdevsquad.com/users/self?private=true",
			{ withCredentials: true },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then((response) => {
			return response.data.email;
		})
		.catch(() => {
			return;
		});
	return email;
};

getRDSEmail()
	.then((email) => {
		rdsUserEmail = email;
	})
	.finally(() => {
		callAnalytics(rdsUserEmail);
	});
