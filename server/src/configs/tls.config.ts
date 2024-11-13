import { file } from "bun";

let _tls = {};
export const mode = Bun.env.MODE || `production`;

if (mode !== `production`) {
    const key = file('../ssl/localhost-key.pem');
    const cert = file('../ssl/localhost.pem');
    _tls = { key, cert };
}

export const tlsConfig = { ..._tls };
