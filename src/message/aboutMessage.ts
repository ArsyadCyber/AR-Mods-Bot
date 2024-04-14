import * as fs from "fs";
import * as path from "path";

// Mendefinisikan tipe untuk struktur data package.json yang relevan
interface PackageInfo {
  version: string;
  author: string;
  github: string;
}

// Fungsi untuk membaca dan mengurai package.json
function getPackageInfo(): PackageInfo {
  // Menentukan path ke file package.json
  const packageJsonPath = path.resolve(__dirname, "..", "..", "package.json");
  // Baca file package.json secara sinkron
  const packageJson = fs.readFileSync(packageJsonPath, "utf8");
  // Mengurai string JSON menjadi objek JavaScript
  const parsedPackageJson: PackageInfo = JSON.parse(packageJson);
  return parsedPackageJson;
}

// Mendefinisikan tipe untuk konteks bot
interface BotContext {
  from?: {
    first_name?: string;
    last_name?: string;
  };
  me?: {
    first_name?: string;
  };
}

// Fungsi aboutMessage yang dimodifikasi untuk TypeScript
const aboutMessage = (ctx: BotContext): string => {
  // Mengambil informasi dari package.json
  const packageInfo = getPackageInfo();

  return `Selamat datang *${ctx.from?.first_name ?? ""} ${ctx.from?.last_name ?? ""}*!\nNama Bot: *${ctx.me?.first_name ?? ""}*\nVersi Bot: *${packageInfo.version}*\nDeveloper: *${packageInfo.author}*\nGithub: *${packageInfo.github}*\nLib: *grammy*`;
};

export default aboutMessage;
