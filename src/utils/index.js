const API_HOST = "https://fine-prisca-syedgaian-cf78e15e.koyeb.app";
// const API_HOST = "http://localhost:8080";

export async function getSessionId() {
	try {
		const res = await fetch(`${API_HOST}/serverTimeStamp`);
		if (res.ok) {
			const sessionId = await res.json();

			return sessionId;
		}
		return null;
	} catch (error) {
		console.error("getSessionId", error);
		return null;
	}
}

export async function convertOntologyFileData(sessionId, file) {
	const formData = new FormData();
	formData.append("sessionId", sessionId);
	formData.append("ontology", file);

	try {
		const response = await fetch(`${API_HOST}/convert`, {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const responseBody = await response.json();
			return responseBody;
		} else {
			console.error("Failed to upload file:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Error uploading file:", error);
		return null;
	}
}
