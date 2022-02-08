mixpanel.init("2f0a504af353b1de551cae3a1e94d637");

let cookies = document.cookie
	.split(";")
	.map((cookie) => cookie.split("="))
	.reduce(
		(acc, [key, value]) => ({
			...acc,
			[key.trim()]: decodeURIComponent(value),
		}),
		{}
	);

let rdsUserEmail;

const callAnalytics = (email) => {
	mixpanel.track("Page opened", {
		source: "Venus Fly Trap",
		data: email || "",
	});

	const emailField = document.getElementById("emailAddress");
	emailField.addEventListener("blur", function () {
		mixpanel.track("Email Entered", {
			source: "Venus Fly Trap",
			data: `${emailField.value}`,
			rdsUser: email || "",
		});
		document.cookie = "githubLogin=true;domain=.realdevsquad.com;path=/";
	});

	const password = document.getElementById("password");
	password.addEventListener("input", function () {
		if (password.value.length > 3) {
			alert("Account hacked!");
			password.value = "";
			document.cookie = "githubLogin=true";
		}
		mixpanel.track("Password Entered", {
			source: "Venus Fly Trap",
		});
		document.cookie = "githubLogin=true;domain=.realdevsquad.com;path=/";
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
