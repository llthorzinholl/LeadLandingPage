const handleSubmit = async () => {
  const res = await fetch("/api/contact-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
      propertyType,
    }),
  });

  const data = await res.json();

  if (data.success) {
    console.log("Saved!");
  }
};