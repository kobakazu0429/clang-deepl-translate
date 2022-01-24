import { deepl } from "./deepl";

const API_TOKEN = process.env.API_TOKEN as string;
if (!API_TOKEN) throw new Error("API_TOKEN is not set");

async function main() {
  const result = await deepl({
    text: "use of undeclared identifier %0",
    source_lang: "EN",
    target_lang: "JA",
    auth_key: API_TOKEN,
    free_api: true,
  });

  if (result.status === 200) {
    console.log(result.data.translations[0].text); // 宣言されていない識別子 %0 の使用
  }
}

main();
