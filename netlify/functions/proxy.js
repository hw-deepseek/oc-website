export async function handler(event) {
  const path = event.path.replace("/api/proxy", "");
  const target = "https://chatboxai.top" + path + (event.rawQuery ? "?" + event.rawQuery : "");

  let body = event.body;
  if (event.isBase64Encoded && body) body = Buffer.from(body, "base64").toString("utf-8");

  const res = await fetch(target, {
    method: event.httpMethod,
    headers: {
      "Content-Type": "application/json",
      "Authorization": event.headers.authorization || ""
    },
    body
  });

  const text = await res.text();
  return {
    statusCode: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },
    body: text
  };
}
