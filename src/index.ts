import fs from "node:fs"; //ファイルを読み込むため
import JSONStream from "JSONStream"; //本体
import { deepl } from "./deepl";

const API_TOKEN = process.env.API_TOKEN as string;
if (!API_TOKEN) throw new Error("API_TOKEN is not set");

const readJson = async () => {
  return new Promise<string>((resolve) => {
    const stream = fs.createReadStream("dump.json").pipe(JSONStream.parse("*"));
    let t = "";
    let count = 0;

    stream.on("data", (data) => {
      // "AST"
      // "Comment"
      // "Common"
      // "CrossTU"
      // "Driver"
      // "Frontend"
      // "Lex"
      // "Parse"
      // "Refactoring"
      // "Sema"
      // "Serialization"
      if (data.Component && data.Component === "Sema") {
        if (data.Text && data.Text.includes("%")) t += data.Text + "\n";
        if (data.Substitution && data.Substitution.includes("%"))
          t += data.Substitution + "\n";

        // if (data.Text.includes("%select")) console.log(data);

        // t += data.Text + "\n";
      }
      // if (t.length > 10000) {
      // resolve(t);
      // }
    });

    stream.on("end", () => {
      resolve(t);
    });
  });
};

async function main() {
  // const result = await deepl({
  //   text: "use of undeclared identifier %0",
  //   source_lang: "EN",
  //   target_lang: "JA",
  //   auth_key: API_TOKEN,
  //   free_api: true,
  // });
  // if (result.status === 200) {
  //   console.log(result.data.translations[0].text); // 宣言されていない識別子 %0 の使用
  // }
  const v = await readJson();
  console.log(v);
  await fs.promises.writeFile("text.txt", v);
}

main();
